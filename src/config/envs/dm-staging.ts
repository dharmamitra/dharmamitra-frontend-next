import { standardTargetLanguages } from "@/utils/api/params"

import defineConfig from "../defineConfig"

export default function createDMStagingConfig() {
  return defineConfig({
    env: "dm-staging",
    paramOptions: {
      targetLanguages: standardTargetLanguages,
    },
  })
}
