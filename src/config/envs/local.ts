import defineConfig from "../defineConfig"

export default function createLocalConfig() {
  return defineConfig({
    env: "local",
    basePath: "",
    featureFlags: {
      search: true,
      translateExtendedOptions: true,
    },
  })
}
