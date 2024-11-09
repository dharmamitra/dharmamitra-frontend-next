import { z } from "zod"

import {
  allTargetLanguages,
  TargetLanguage,
} from "@/utils/api/translation/params"

export const SUPPORTED_ENVS = [
  "pub",
  "lab",
  "rnd",
  "local",
  "kumarajiva",
] as const

type Page = keyof Messages["pages"]
export const allPages = ["home", "about", "team", "guide"] as const
export const defaultSubPages: Page[] = ["about", "team"]

export const appConfigSchema = z.object({
  env: z.enum(SUPPORTED_ENVS),
  storageVersionId: z.string().default("2"),
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
  customParamOptions: z
    .object({
      targetLanguages: z
        .array(
          z.string().refine(
            // validates at build & runtime
            (val): val is TargetLanguage =>
              allTargetLanguages.includes(val as TargetLanguage),
            {
              message:
                "Invalid `customParamOptions.targetLanguage` value given to app config.",
            },
          ),
        )
        .default(allTargetLanguages),
    })
    .default({}),
  featureFlags: z
    .object({
      hasSearch: z.boolean().default(false),
      hasTranslateExtendedOptions: z.boolean().default(false),
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
  basePath: string
}

export type EnhancedAppConfig = RequiredConfigKeys &
  DeepPartial<Omit<AppConfig, keyof RequiredConfigKeys>>

function defineConfig(config: EnhancedAppConfig) {
  return appConfigSchema.parse(config)
}

export default defineConfig
