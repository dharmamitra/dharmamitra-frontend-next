import { TargetLanguage } from "@/utils/api/types"

import defineConfig from "../defineConfig"

export const targetLanguages: TargetLanguage[] = [
  "english",
  "tibetan",
  "sanskrit",
  "sanskrit-dev",
  "buddhist-chinese",
  "korean",
]

export default function createDMConfig() {
  return defineConfig({
    env: "dm",
    siteUrl: "https://dharmamitra.org",
    paramOptions: {
      targetLanguages,
    },
  })
}
