import defineConfig from "../defineConfig"

export default function createDMStagingConfig() {
  return defineConfig({
    env: "dm-staging",
  })
}
