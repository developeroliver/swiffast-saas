import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Ajout d'await ici !
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with ID of ${id} and type of ${eventType}`);

  try {
    switch (eventType) {
      case "user.created":
        await prisma.user.create({
          data: {
            id: evt.data.id,
            email: evt.data.email_addresses[0]?.email_address || "",
            firstName: evt.data.first_name,
            lastName: evt.data.last_name,
            imageUrl: evt.data.image_url,
          },
        });
        console.log("User created in database:", evt.data.id);
        break;

      case "user.updated":
        await prisma.user.update({
          where: { id: evt.data.id },
          data: {
            email: evt.data.email_addresses[0]?.email_address || "",
            firstName: evt.data.first_name,
            lastName: evt.data.last_name,
            imageUrl: evt.data.image_url,
          },
        });
        console.log("User updated in database:", evt.data.id);
        break;

      case "user.deleted":
        await prisma.user.delete({
          where: { id: evt.data.id as string },
        });
        console.log("User deleted from database:", evt.data.id);
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }
  } catch (error) {
    console.error("Database error:", error);
    return new Response("Database error", { status: 500 });
  }

  return new Response("", { status: 200 });
}
