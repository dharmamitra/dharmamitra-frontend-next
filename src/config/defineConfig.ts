import { z } from "zod"

import { DMApi } from "@/api"
import { allTargetLanguages, translationModels } from "@/utils/api/params"

export const SUPPORTED_ENVS = [
  "pub",
  "lab",
  "rnd",
  "local",
  "kumarajiva",
] as const

type Page = keyof Messages["pages"]
export const allPages = ["home", "about", "team"] as const
export const defaultSubPages: Page[] = ["about", "team"]

export const appConfigSchema = z.object({
  env: z.enum(SUPPORTED_ENVS),
  isClient: z.boolean().default(false),
  siteName: z.string().default("Dharmamitra"),
  orgEmail: z.string().email().default("dharmamitra.project@gmail.com"),
  siteUrl: z.string().default("https://dharmamitra.org"),
  basePath: z.string(),
  assetPaths: z
    // relative to `/public`, dimentions for aspect ratio
    .object({
      // used in app bar
      logo: z.object({
        src: z.string(),
        width: z.number(),
        height: z.number(),
      }),
      // used in footer
      logoLarge: z.object({
        src: z.string(),
        width: z.number(),
        height: z.number(),
      }),
    })
    .default({
      logo: {
        src: "/assets/dm-logo-flat.png",
        width: 240,
        height: 66,
      },
      logoLarge: {
        src: "/assets/dm-logo-full.png",
        width: 334,
        height: 182,
      },
    }),
  subPages: z.array(z.enum(allPages)).default(defaultSubPages),
  paramOptions: z
    .object({
      targetLanguages: z
        .array(
          z.string().refine(
            // validates at build & runtime
            (val) =>
              allTargetLanguages.includes(
                val as DMApi.Schema["TargetLanguageExperimental"],
              ),
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
        .refine(
          (val) =>
            translationModels.includes(val as DMApi.Schema["TranslationModel"]),
          {
            message: "Invalid `paramOptions.model` value given to app config.",
          },
        )
        .default("NO" as DMApi.Schema["TranslationModel"]),
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
  // basePath has src/hooks/useParams.tsx as dependent
  basePath: string
}

export type EnhancedAppConfig = RequiredConfigKeys &
  DeepPartial<Omit<AppConfig, keyof RequiredConfigKeys>>

function defineConfig(config: EnhancedAppConfig) {
  return appConfigSchema.parse(config)
}

export default defineConfig
