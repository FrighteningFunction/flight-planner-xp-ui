// src/utils/logger.ts
const isProd = (globalThis as any).process?.env?.NODE_ENV === "production";

export const logger = {
  info: (...args: any[]) => {
    if (!isProd) console.info("[INFO]", ...args);
    // Optionally send to backend or external log service
  },
  warn: (...args: any[]) => {
    if (!isProd) console.warn("[WARN]", ...args);
  },
  error: (...args: any[]) => {
    console.error("[ERROR]", ...args);
    // Optionally send error to backend or Sentry
  },
  debug: (...args: any[]) => {
    if (!isProd) console.debug("[DEBUG]", ...args);
  },
};