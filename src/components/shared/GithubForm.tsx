"use client";

import { useState, useEffect } from "react";
import { Github, CheckCircle, Clock, XCircle } from "lucide-react";
import { GitHubRequest } from "@/lib/types";

export default function GitHubForm() {
  const [githubUsername, setGithubUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState<GitHubRequest[]>([]);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/github-request");
      const data = await response.json();
      if (data.requests) {
        setRequests(data.requests);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!githubUsername.trim()) {
      setMessage({
        type: "error",
        text: "Veuillez entrer votre nom d'utilisateur GitHub",
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/github-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ githubUsername: githubUsername.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Demande envoyée avec succès ! Vous recevrez un email une fois approuvée.",
        });
        setGithubUsername("");
        fetchRequests(); // Refresh the list
      } else {
        setMessage({
          type: "error",
          text: data.error || "Erreur lors de l'envoi de la demande",
        });
      }
    } catch {
      setMessage({ type: "error", text: "Erreur réseau. Veuillez réessayer." });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Approuvée";
      case "rejected":
        return "Rejetée";
      default:
        return "En attente";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-700 bg-green-100";
      case "rejected":
        return "text-red-700 bg-red-100";
      default:
        return "text-yellow-700 bg-yellow-100";
    }
  };

  const hasPendingRequest = requests.some((req) => req.status === "pending");

  return (
    <div className="bg-background rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Github className="h-6 w-6 text-gray-400" />
        <h2 className="text-xl font-semibold text-foreground">
          GitHub Repository Access
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="github-username"
            className="block text-sm font-medium text-gray-400 mb-2"
          >
            GitHub Username
          </label>
          <input
            type="text"
            id="github-username"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            placeholder="Enter your GitHub Username"
            className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            disabled={isLoading || hasPendingRequest}
          />
          <p className="mt-2 text-sm text-gray-600">
            Example: <code className="bg-gray-100 px-1 rounded">john-doe</code>
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading || hasPendingRequest}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
              Envoi en cours...
            </div>
          ) : hasPendingRequest ? (
            "Request already sent"
          ) : (
            "Request access"
          )}
        </button>
      </form>

      {/* Message */}
      {message && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>ℹ️ Information :</strong> Once your request has been approved,
          you will receive an email with a link to the private GitHub repository
          containing the SwiftUI Boilerplate.
        </p>
      </div>
    </div>
  );
}
