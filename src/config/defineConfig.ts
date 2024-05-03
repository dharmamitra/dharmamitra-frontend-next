import { z } from "zod"

export const appConfigSchema = z.object({
  env: z.enum([
    "local",
    "lab-staging",
    "lab-production",
    "dm-staging",
    "dm-production",
    "kp-staging",
    "kp-production",
  ]),
  siteName: z.string().default("Dharmamitra"),
  orgEmail: z.string().email().default("dharmamitra.project@gmail.com"),
  siteUrl: z.string().default("https://dharmamitra.org"),
  apiUrl: z.string().default("https://dharmamitra.org/api"),
  basePath: z.string().default("/dmnext"),
  logoPath: z.string().default("TODO"),
  featureFlags: z
    .object({
      search: z.boolean().default(false),
    })
    .default({}),
})

export type AppConfig = z.infer<typeof appConfigSchema>

type KeysWithFallbackValue =
  | "logoPath"
  | "featureFlags"
  | "siteUrl"
  | "apiUrl"
  | "basePath"
  | "siteName"
  | "orgEmail"

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type DefaultConfig = Pick<AppConfig, KeysWithFallbackValue>
export type RequiredConfig = Optional<AppConfig, KeysWithFallbackValue>

function defineConfig(config: RequiredConfig) {
  return appConfigSchema.parse(config)
}

export default defineConfig
