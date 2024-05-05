import { z } from "zod"

import { allTargetLanguages } from "@/utils/api/params"
import { TargetLanguage } from "@/utils/api/types"

export const appConfigSchema = z.object({
  env: z.enum(["local", "lab", "dm", "kp"]),
  siteName: z.string().default("Dharmamitra"),
  orgEmail: z.string().email().default("dharmamitra.project@gmail.com"),
  siteUrl: z.string(),
  logoPath: z.string().default("TODO"),
  endpoints: z
    .object({
      tagging: z.string().default("/tagging/"),
    })
    .default({}),
  streamPaths: z
    .object({
      translation: z.string().default("/api/translation-stream"),
      search: z.string().default("/api/search-stream"),
    })
    .default({}),
  paramOptions: z
    .object({
      targetLanguages: z
        .array(
          z.string().refine(
            // validates at build & runtime
            (val) => allTargetLanguages.includes(val as TargetLanguage),
            {
              message:
                "Invalid target language given to app environment config `paramOptions` prop.",
            },
          ),
        )
        .default(allTargetLanguages),
    })
    .default({}),
  featureFlags: z
    .object({
      search: z.boolean().default(false),
    })
    .default({}),
})

export type AppConfig = z.infer<typeof appConfigSchema>

type KeysWithFallbackValue =
  | "logoPath"
  | "siteName"
  | "featureFlags"
  | "endpoints"
  | "streamPaths"
  | "paramOptions"
  | "orgEmail"

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type DefaultConfig = Pick<AppConfig, KeysWithFallbackValue>
export type RequiredConfig = Optional<AppConfig, KeysWithFallbackValue>

function defineConfig(config: RequiredConfig) {
  return appConfigSchema.parse(config)
}

export default defineConfig
