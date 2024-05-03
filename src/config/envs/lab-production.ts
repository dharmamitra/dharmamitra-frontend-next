import defineConfig from "../defineConfig"

export default function createLabProductionConfig() {
  return defineConfig({
    env: "lab-production",
    featureFlags: {
      search: true,
    },
  })
}
