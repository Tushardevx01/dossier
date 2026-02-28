const REQUIRED_SERVER_ENV_KEYS = [
  "QEV_API_KEY",
  "email_from",
  "email_password",
] as const;

type RequiredServerEnvKey = (typeof REQUIRED_SERVER_ENV_KEYS)[number];

type ServerEnv = {
  QEV_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_PASSWORD: string;
};

function getRequiredEnv(key: RequiredServerEnvKey): string {
  if (typeof window !== "undefined") {
    throw new Error("Server environment variables cannot be accessed in the browser.");
  }

  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required server environment variable: ${key}`);
  }

  return value;
}

export function getServerEnv(): ServerEnv {
  return {
    QEV_API_KEY: getRequiredEnv("QEV_API_KEY"),
    EMAIL_FROM: getRequiredEnv("email_from"),
    EMAIL_PASSWORD: getRequiredEnv("email_password"),
  };
}
