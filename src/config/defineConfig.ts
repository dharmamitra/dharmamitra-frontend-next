import { z } from "zod"

import {
  allTargetLanguages,
  stableTargetLanguages,
  TargetLanguage,
} from "@/utils/api/translation/params"

import { BUILD_VARIANTS } from "./constants"
import { getBasePath, getBuildVariant } from "./utils"

type Page = keyof Messages["pages"]
export const allPages = [
  "home",
  "about",
  "team",
  "guide",
  "news",
  "test",
] as const
export const defaultSubPages: Page[] = ["about", "team", "news"]

export const appConfigSchema = z.object({
  variant: z.enum(BUILD_VARIANTS).default(getBuildVariant()),
  storageVersionId: z.string().default("4"),
  isClient: z.boolean().default(false),
  siteName: z.string().default("Dharmamitra"),
  orgEmail: z.string().email().default("dharmamitra.project@gmail.com"),
  siteUrl: z.string().default("https://dharmamitra.org" + getBasePath()),
  basePath: z.string().default(getBasePath()),
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
        .default(stableTargetLanguages),
    })
    .default({}),
  featureFlags: z
    .object({
      hasSearch: z.boolean().default(false),
      hasNexus: z.boolean().default(false),
      hasTranslateExtendedOptions: z.boolean().default(false),
      hasFeedbackWidget: z.boolean().default(false),
      hasOCR: z.boolean().default(false),
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

/** 
 * If configuration requires specific keys as set, we can define them in RequiredConfigKeys.

type RequiredConfigKeys = {}

export type BuildVariantConfig = RequiredConfigKeys &
  DeepPartial<Omit<AppConfig, keyof RequiredConfigKeys>>
*/

function defineConfig(config: DeepPartial<AppConfig>) {
  return appConfigSchema.parse(config)
}

export default defineConfig
