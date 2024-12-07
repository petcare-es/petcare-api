import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";

export default function handleError(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    console.error(error.errors);

    return res.status(400).json({
      message: "Error de validação",
      issues: error.issues,
    });
  }

  if (error instanceof TokenExpiredError) {
    console.error(error);
    return res.status(401).json({ message: "Token expirado" });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    console.error(error);
    return res.status(500).json({ message: "Error interno do servidor" });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }

  if (error instanceof Error) {
    console.error(error);

    if (error.message) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Error interno do servidor" });
  }
}
