import { z } from "zod"

import { allTargetLanguages } from "@/utils/api/params"
import { TargetLanguage } from "@/utils/api/types"

export const envs = ["local", "lab", "dm", "kp"] as const

export type AppEnv = (typeof envs)[number]

export const appConfigSchema = z.object({
  env: z.enum(envs),
  siteName: z.string().default("Dharmamitra"),
  orgEmail: z.string().email().default("dharmamitra.project@gmail.com"),
  siteUrl: z.string(),
  basePath: z.string().default(""),
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
      doGrammarExplanation: z.boolean().default(false),
      model: z.string().default("NO"),
    })
    .default({}),
  featureFlags: z
    .object({
      search: z.boolean().default(false),
      translateExtendedOptions: z.boolean().default(false),
    })
    .default({}),
})

export type AppConfig = z.infer<typeof appConfigSchema>

// Recursive Partial type to make all properties optional, including nested objects
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends readonly (infer U)[]
      ? readonly DeepPartial<U>[]
      : T[P] extends object
        ? DeepPartial<T[P]>
        : T[P]
}

type RequiredConfigKeys = {
  env: AppEnv
  siteUrl: string
}

export type EnhancedAppConfig = RequiredConfigKeys &
  DeepPartial<Omit<AppConfig, keyof RequiredConfigKeys>>

function defineConfig(config: EnhancedAppConfig) {
  return appConfigSchema.parse(config)
}

export default defineConfig
