import { DMApi } from "@/api"

import defineConfig from "../defineConfig"

export const targetLanguages: DMApi.Schema["TargetLanguageExperimental"][] = [
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
    paramOptions: {
      targetLanguages,
    },
  })
}
