import defineConfig from "../defineConfig"

export default function createLocalConfig() {
  return defineConfig({
    env: "rnd",
    featureFlags: {
      search: true,
      translateExtendedOptions: true,
    },
  })
}
