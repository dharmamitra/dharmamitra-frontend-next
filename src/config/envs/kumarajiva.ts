import defineConfig from "../defineConfig"

export default function createKumarajivaConfig() {
  return defineConfig({
    env: "kumarajiva",
    basePath: "/kumarajiva",
    siteUrl: "https://dharmamitra.org/kumarajiva",
    featureFlags: {
      translateExtendedOptions: true,
    },
  })
}
