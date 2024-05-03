import { standardTargetLanguages } from "@/utils/api/params"

import defineConfig from "../defineConfig"

export default function createDMProductionConfig() {
  return defineConfig({
    env: "dm-production",
    paramOptions: {
      targetLanguages: standardTargetLanguages,
    },
  })
}
