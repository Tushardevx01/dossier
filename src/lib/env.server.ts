import { z } from "zod";

const serverEnvSchema = z.object({
  QEV_API_KEY: z.string().min(1, "QEV_API_KEY is required"),
  EMAIL_FROM: z.string().email("EMAIL_FROM must be a valid email address"),
  EMAIL_PASSWORD: z.string().min(1, "EMAIL_PASSWORD is required"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cachedServerEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (typeof window !== "undefined") {
    throw new Error("Server environment variables cannot be accessed in the browser.");
  }

  if (cachedServerEnv) {
    return cachedServerEnv;
  }

  const result = serverEnvSchema.safeParse(process.env);
  if (!result.success) {
    const invalidKeys = result.error.issues.map((issue) => issue.path.join(".")).join(", ");
    throw new Error(`Missing or invalid required server environment variables: ${invalidKeys}`);
  }

  cachedServerEnv = result.data;
  return cachedServerEnv;
}

export function hasRequiredServerEnv(): boolean {
  return serverEnvSchema.safeParse(process.env).success;
}
