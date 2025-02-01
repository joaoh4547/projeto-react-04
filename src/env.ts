import { z } from "zod";

const envSchema = z.object({
    MODE: z.enum(["test", "production", "development"]).default("development"),
    VITE_API_URL: z.string().url(),
    VITE_ENABLED_API_DELAY: z.coerce.boolean(),
});

export const env = envSchema.parse(import.meta.env);
