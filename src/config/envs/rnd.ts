import defineConfig from "../defineConfig"

export default function createLocalConfig() {
  return defineConfig({
    env: "rnd",
    streamPaths: {
      translation: "/rnd/api/translation-stream",
      search: "/rnd/api/search-stream",
    },
    featureFlags: {
      search: true,
      translateExtendedOptions: true,
    },
  })
}
