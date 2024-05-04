import defineConfig from "../defineConfig"

export default function createKPProductionConfig() {
  return defineConfig({
    env: "kp",
  })
}
