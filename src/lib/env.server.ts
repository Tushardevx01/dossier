type RequiredServerEnvKey = "QEV_API_KEY" | "EMAIL_FROM" | "EMAIL_PASSWORD";

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
    EMAIL_FROM: getRequiredEnv("EMAIL_FROM"),
    EMAIL_PASSWORD: getRequiredEnv("EMAIL_PASSWORD"),
  };
}
