import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { GitHubService } from "@/lib/github-service";

enum GitHubRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export async function POST(request: NextRequest) {
  console.log("🔍 POST /api/github-request appelé");

  try {
    const { userId } = await auth();
    console.log("👤 Auth result - userId:", userId);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { githubUsername } = await request.json();
    console.log("📝 GitHub username reçu:", githubUsername);

    if (!githubUsername || githubUsername.trim() === "") {
      return NextResponse.json(
        { error: "GitHub username is required" },
        { status: 400 }
      );
    }

    // Vérifier les achats
    const purchases = await prisma.purchase.findMany({
      where: {
        userId: userId,
        status: "COMPLETED",
      },
    });

    console.log("💰 Achats trouvés:", purchases.length);

    if (!purchases || purchases.length === 0) {
      return NextResponse.json(
        { error: "No valid purchase found" },
        { status: 403 }
      );
    }

    // Vérifier s'il n'y a pas déjà une demande approuvée
    const existingRequests = await prisma.$queryRaw<
      {
        id: string;
        userId: string;
        githubUsername: string;
        status: GitHubRequestStatus;
        createdAt: Date;
        updatedAt: Date;
      }[]
    >`
      SELECT * FROM github_requests 
      WHERE "userId" = ${userId} AND (status = 'PENDING' OR status = 'APPROVED')
    `;

    console.log("📋 Demandes existantes:", existingRequests.length);

    if (existingRequests.length > 0) {
      return NextResponse.json(
        { error: "A request is already pending or approved" },
        { status: 400 }
      );
    }

    // ✨ NOUVELLE LOGIQUE : Invitation GitHub automatique
    console.log("🐙 Tentative d'invitation GitHub automatique...");

    const githubResult = await GitHubService.inviteUserToRepo(
      githubUsername.trim()
    );

    let requestStatus: GitHubRequestStatus = GitHubRequestStatus.PENDING;
    let responseMessage = "GitHub request submitted successfully";

    if (githubResult.success) {
      // Invitation réussie → Status APPROVED directement
      requestStatus = GitHubRequestStatus.APPROVED;
      responseMessage =
        "GitHub invitation sent successfully! Check your email.";
      console.log("✅ Invitation GitHub réussie");
    } else {
      // Invitation échouée → Rester en PENDING pour review manuelle
      console.log("❌ Invitation GitHub échouée:", githubResult.message);
      responseMessage = `Request submitted for manual review. Error: ${githubResult.message}`;
    }

    // Enregistrer la demande avec le statut approprié
    const requestId = "req_" + Math.random().toString(36).substr(2, 9);

    // Utilisation de SQL brut avec cast explicite pour l'enum
    await prisma.$executeRaw`
      INSERT INTO github_requests (id, "userId", "githubUsername", status, "createdAt", "updatedAt")
      VALUES (${requestId}, ${userId}, ${githubUsername.trim()}, ${requestStatus}::"GitHubRequestStatus", NOW(), NOW())
    `;

    console.log("✅ Demande créée:", requestId, "Status:", requestStatus);

    return NextResponse.json({
      success: true,
      message: responseMessage,
      autoApproved: githubResult.success,
      githubMessage: githubResult.message,
    });
  } catch (error) {
    console.error("❌ GitHub request API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Le GET reste identique
export async function GET() {
  console.log("🔍 GET /api/github-request appelé");

  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requests = await prisma.$queryRaw<
      {
        id: string;
        userId: string;
        githubUsername: string;
        status: GitHubRequestStatus;
        createdAt: Date;
        updatedAt: Date;
      }[]
    >`
      SELECT * FROM github_requests 
      WHERE "userId" = ${userId} 
      ORDER BY "createdAt" DESC
    `;

    console.log("📋 Demandes trouvées:", requests.length);

    return NextResponse.json({ requests });
  } catch (error) {
    console.error("❌ GitHub request GET API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch requests" },
      { status: 500 }
    );
  }
}
