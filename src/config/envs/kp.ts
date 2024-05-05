import { TargetLanguage } from "@/utils/api/types"

import defineConfig from "../defineConfig"

export const targetLanguages: TargetLanguage[] = [
  "modern-chinese",
  "tibetan",
  "english",
  "sanskrit",
  "sanskrit-dev",
  "sanskrit-knn",
  "buddhist-chinese",
  "japanese",
  "korean",
  "pali",
]

export default function createKPProductionConfig() {
  return defineConfig({
    env: "kp",
    siteUrl: "https://dharmamitra.org/kp",
    paramOptions: {
      targetLanguages,
    },
  })
}
