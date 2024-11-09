import { TargetLanguage } from "@/utils/api/translation/params"

import defineConfig from "../defineConfig"

export const targetLanguages: TargetLanguage[] = [
  "modern-chinese",
  "buddhist-chinese",
  "tibetan",
  "english",
  "sanskrit",
  "sanskrit-dev",
  "korean",
  "hindi",
  "japanese",
  "pali",
  "sanskrit-knn",
]

export default function createKumarajivaConfig() {
  return defineConfig({
    env: "kumarajiva",
    isClient: true,
    siteName: "Kumarajiva's Dharmamitra",
    siteUrl: "https://dharmamitra.org/kumarajiva",
    basePath: "/kumarajiva",
    assetPaths: {
      logo: {
        src: "/tenent/kumarajiva/kp-logo.png",
        width: 120,
        height: 66,
      },
      logoLarge: {
        src: "/tenent/kumarajiva/kp-logo.png",
        width: 330,
        height: 182,
      },
    },
    subPages: ["guide"],
    customParamOptions: {
      targetLanguages,
    },
    featureFlags: {
      hasTranslateExtendedOptions: true,
      hasSearch: true,
    },
  })
}
