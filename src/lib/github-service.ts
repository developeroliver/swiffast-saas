import { Octokit } from "@octokit/rest";

// Utiliser les types officiels d'Octokit
type GitHubInvitation = Awaited<
  ReturnType<Octokit["repos"]["listInvitations"]>
>["data"][0];
type GitHubCollaborator = Awaited<
  ReturnType<Octokit["repos"]["listCollaborators"]>
>["data"][0];
type GitHubRepo = Awaited<ReturnType<Octokit["repos"]["get"]>>["data"];

export class GitHubService {
  private static octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  // Inviter un utilisateur au repository privé
  static async inviteUserToRepo(githubUsername: string): Promise<{
    success: boolean;
    message: string;
    invitationId?: number;
  }> {
    try {
      console.log("🐙 Tentative d'invitation GitHub:", githubUsername);

      if (
        !process.env.GITHUB_TOKEN ||
        !process.env.GITHUB_REPO_OWNER ||
        !process.env.GITHUB_REPO_NAME
      ) {
        return {
          success: false,
          message: "Configuration GitHub manquante",
        };
      }

      // Vérifier si l'utilisateur GitHub existe
      try {
        await this.octokit.users.getByUsername({
          username: githubUsername,
        });
        console.log("✅ Utilisateur GitHub trouvé:", githubUsername);
      } catch {
        return {
          success: false,
          message: `Utilisateur GitHub "${githubUsername}" introuvable`,
        };
      }

      // VRAIMENT inviter l'utilisateur maintenant
      console.log("🔄 Envoi invitation GitHub...");
      const response = await this.octokit.repos.addCollaborator({
        owner: process.env.GITHUB_REPO_OWNER,
        repo: process.env.GITHUB_REPO_NAME,
        username: githubUsername,
        permission: "pull", // Accès lecture seule
      });

      console.log("✅ Invitation envoyée! Réponse:", response.status);

      return {
        success: true,
        message: "Invitation GitHub envoyée avec succès !",
        invitationId: response.data.id,
      };
    } catch (error: unknown) {
      console.error("❌ Erreur invitation GitHub:", error);

      // Type guard pour les erreurs GitHub
      if (error && typeof error === "object" && "status" in error) {
        const githubError = error as { status: number; message: string };

        if (githubError.status === 422) {
          return {
            success: false,
            message:
              "Invitation déjà envoyée ou utilisateur déjà collaborateur",
          };
        }

        return {
          success: false,
          message: `Erreur GitHub: ${githubError.message}`,
        };
      }

      return {
        success: false,
        message: "Erreur inconnue lors de l'invitation GitHub",
      };
    }
  }

  // Lister les invitations en attente
  static async listPendingInvitations(): Promise<GitHubInvitation[]> {
    try {
      const response = await this.octokit.repos.listInvitations({
        owner: process.env.GITHUB_REPO_OWNER!,
        repo: process.env.GITHUB_REPO_NAME!,
      });

      return response.data;
    } catch (error) {
      console.error("Error listing invitations:", error);
      return [];
    }
  }

  // Lister les collaborateurs
  static async listCollaborators(): Promise<GitHubCollaborator[]> {
    try {
      const response = await this.octokit.repos.listCollaborators({
        owner: process.env.GITHUB_REPO_OWNER!,
        repo: process.env.GITHUB_REPO_NAME!,
      });

      return response.data;
    } catch (error) {
      console.error("Error listing collaborators:", error);
      return [];
    }
  }

  // Révoquer l'accès d'un utilisateur
  static async removeCollaborator(githubUsername: string): Promise<boolean> {
    try {
      await this.octokit.repos.removeCollaborator({
        owner: process.env.GITHUB_REPO_OWNER!,
        repo: process.env.GITHUB_REPO_NAME!,
        username: githubUsername,
      });

      return true;
    } catch (error) {
      console.error("Error removing collaborator:", error);
      return false;
    }
  }

  // Vérifier les informations du repository
  static async getRepoInfo(): Promise<GitHubRepo | null> {
    try {
      const response = await this.octokit.repos.get({
        owner: process.env.GITHUB_REPO_OWNER!,
        repo: process.env.GITHUB_REPO_NAME!,
      });

      return response.data;
    } catch (error) {
      console.error("Error getting repo info:", error);
      return null;
    }
  }
}
