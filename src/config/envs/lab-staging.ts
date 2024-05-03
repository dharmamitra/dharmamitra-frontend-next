import defineConfig from "../defineConfig"

export default function createLabStagingConfig() {
  return defineConfig({
    env: "lab-staging",
    featureFlags: {
      search: true,
    },
  })
}
