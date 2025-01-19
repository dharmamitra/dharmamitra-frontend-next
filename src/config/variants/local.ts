import defineConfig from "../defineConfig"

export default function createLocalConfig() {
  return defineConfig({
    subPages: ["team"],
    featureFlags: {
      hasSearch: true,
      hasTranslateExtendedOptions: true,
    },
  })
}
