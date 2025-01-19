import { TargetLanguage } from "@/utils/api/translation/params"

import defineConfig from "../defineConfig"

export const targetLanguages: TargetLanguage[] = [
  "english",
  "english-explained",
  "tibetan",
  "sanskrit",
  "sanskrit-dev",
  "buddhist-chinese",
  "korean",
  "japanese",
  "german",
  "french",
  "italian",
]

export default function createDMConfig() {
  return defineConfig({
    customParamOptions: {
      targetLanguages,
    },
  })
}
