import defineConfig from "../defineConfig"

export default function createDMProductionConfig() {
  return defineConfig({
    env: "dm-production",
  })
}
