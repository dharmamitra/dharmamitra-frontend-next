import { z } from "zod"

import { allTargetLanguages, translationModels } from "@/utils/api/params"
import { TargetLanguage, TranslationModel } from "@/utils/api/types"

export const SUPPORTED_ENVS = ["pub", "lab", "rnd", "local"] as const

export type AppEnv = (typeof SUPPORTED_ENVS)[number]

export const appConfigSchema = z.object({
  env: z.enum(SUPPORTED_ENVS),
  siteName: z.string().default("Dharmamitra"),
  orgEmail: z.string().email().default("dharmamitra.project@gmail.com"),
  siteUrl: z.string().default("https://dharmamitra.org"),
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
                "Invalid `paramOptions.targetLanguage` value given to app config.",
            },
          ),
        )
        .default(allTargetLanguages),
      doGrammarExplanation: z.boolean().default(false),
      model: z
        .string()
        .refine((val) => translationModels.includes(val as TranslationModel), {
          message: "Invalid `paramOptions.model` value given to app config.",
        })
        .default("none" as TranslationModel),
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
}

export type EnhancedAppConfig = RequiredConfigKeys &
  DeepPartial<Omit<AppConfig, keyof RequiredConfigKeys>>

function defineConfig(config: EnhancedAppConfig) {
  return appConfigSchema.parse(config)
}

export default defineConfig
