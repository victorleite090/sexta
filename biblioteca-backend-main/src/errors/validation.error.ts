import { ZodError, ZodIssue } from "zod";

export class ValidationError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly issues: ZodIssue[];

  constructor(message: string, error: ZodError, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
    this.issues = error.issues;
  }
}
