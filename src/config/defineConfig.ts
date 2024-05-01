import { z } from "zod"

export const appConfigSchema = z.object({
  env: z.enum([
    "local",
    "playground-staging",
    "playground-production",
    "dm-staging",
    "dm-production",
    "kj-staging",
    "kj-production",
  ]),
  logoPath: z.string(),
  featureFlags: z
    .object({
      search: z.boolean().default(false),
    })
    .default({}),
})

export type AppConfig = z.infer<typeof appConfigSchema>

type KeysWithFallbackValue = "logoPath" | "featureFlags"

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type DefaultConfig = Pick<AppConfig, KeysWithFallbackValue>
export type RequiredConfig = Optional<AppConfig, KeysWithFallbackValue>

function defineConfig(config: RequiredConfig) {
  return appConfigSchema.parse(config)
}

export default defineConfig
