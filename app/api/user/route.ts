import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getUserPurchases } from "@/lib/db";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const purchases = await getUserPurchases(user.id);

    return NextResponse.json({ purchases });
  } catch (error) {
    console.error("Erreur lors de la récupération des achats:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
