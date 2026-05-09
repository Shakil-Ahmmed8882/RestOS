export enum ErrorCode {
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  VALIDATION = "VALIDATION",
  UNKNOWN = "UNKNOWN",
}

export class AppError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public cause?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}
