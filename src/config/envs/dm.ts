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

export default function createDMProductionConfig() {
  return defineConfig({
    env: "dm",
    paramOptions: {
      targetLanguages,
    },
  })
}
