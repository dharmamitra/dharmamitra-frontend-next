import defineConfig from "../defineConfig"

export default function createKPStagingConfig() {
  return defineConfig({
    env: "kp-staging",
  })
}
