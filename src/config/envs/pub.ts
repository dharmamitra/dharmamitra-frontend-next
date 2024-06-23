import { TargetLanguage } from "@/utils/api/params"

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
    env: "pub",
    basePath: "",
    customParamOptions: {
      targetLanguages,
    },
  })
}
