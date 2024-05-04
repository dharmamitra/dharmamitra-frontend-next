import defineConfig from "../defineConfig"

export default function createLabProductionConfig() {
  return defineConfig({
    env: "lab",
    featureFlags: {
      search: true,
    },
  })
}
