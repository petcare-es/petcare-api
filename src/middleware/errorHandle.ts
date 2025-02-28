import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import TokenAuthorizationMissingError from "service/error/TokenAuthorizationMissingError";
import { ZodError } from "zod";

export default function handleError(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof ZodError) {
    console.error(error.errors);

    return response.status(400).json({
      message: "Error de validação",
      issues: error.issues,
    });
  }

  if (error instanceof TokenAuthorizationMissingError) {
    console.error(error);
    return response
      .status(401)
      .json({ message: "É necessário um token de autenticação" })
  }

  if (error instanceof TokenExpiredError) {
    console.error(error);
    return response
      .status(401)
      .json({ message: "Token expirado" });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(error);
    return response
      .status(400)
      .json({ message: error.message });
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "Error interno do servidor" });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    console.error(error);
    return response
      .status(500)
      .json({ message: error.message });
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    console.error(error);
    return response
      .status(400)
      .json({ message: error.message });
  }

  if (error instanceof Error) {
    console.error(error);

    if (error.message) {
      return response
        .status(500)
        .json({ message: error.message });
    }

    return response
      .status(500)
      .json({ message: "Error interno do servidor" });
  }
}
