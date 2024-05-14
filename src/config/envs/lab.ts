import defineConfig from "../defineConfig"

export default function createLabConfig() {
  return defineConfig({
    env: "lab",
    siteUrl: "https://dharmamitra.org/lab",
    streamPaths: {
      translation: "/lab/api/translation-stream",
      search: "/lab/api/search-stream",
    },
    featureFlags: {
      translateExtendedOptions: true,
    },
  })
}
