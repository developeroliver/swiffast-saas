import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Rediriger vers le dashboard avec un message de succès
  const dashboardUrl = new URL("/dashboard", req.url);
  dashboardUrl.searchParams.set("purchase", "success");

  return NextResponse.redirect(dashboardUrl);
}
