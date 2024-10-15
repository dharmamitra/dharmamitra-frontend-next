import defineConfig from "../defineConfig"

export default function createLocalConfig() {
  return defineConfig({
    env: "local",
    basePath: "",
    featureFlags: {
      hasSearch: true,
      hasTranslateExtendedOptions: true,
    },
  })
}
