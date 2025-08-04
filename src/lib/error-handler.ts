import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function handleApiError(error: unknown): NextResponse {
  console.error("API Error:", error);

  // Erreur de validation Zod
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Données invalides",
        details: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  // Erreur Prisma
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return NextResponse.json(
          { error: "Cette ressource existe déjà" },
          { status: 409 }
        );
      case "P2025":
        return NextResponse.json(
          { error: "Ressource non trouvée" },
          { status: 404 }
        );
      default:
        return NextResponse.json(
          { error: "Erreur de base de données" },
          { status: 500 }
        );
    }
  }

  // Erreur personnalisée
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.statusCode }
    );
  }

  // Erreur standard JavaScript
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Erreur inconnue
  return NextResponse.json(
    { error: "Erreur interne du serveur" },
    { status: 500 }
  );
}

// Fonction utilitaire pour créer des erreurs d'API
export function createApiError(
  message: string,
  statusCode: number = 500,
  code?: string
) {
  return new AppError(message, statusCode, code);
}

export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new AppError(
        `Validation failed: ${error.issues.map((i) => i.message).join(", ")}`,
        400,
        "VALIDATION_ERROR"
      );
    }
    throw error;
  }
}
