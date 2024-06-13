import defineConfig from "../defineConfig"

export default function createKumarajivaConfig() {
  return defineConfig({
    env: "kumarajiva",
    isClient: true,
    siteName: "Kumarajiva's Dharmamitra",
    siteUrl: "https://dharmamitra.org/kumarajiva",
    basePath: "/kumarajiva",
    assetPaths: {
      logo: {
        src: "/tenent/kumarajiva/kp-logo.png",
        width: 120,
        height: 66,
      },
      logoLarge: {
        src: "/tenent/kumarajiva/kp-logo.png",
        width: 330,
        height: 182,
      },
    },
    subPages: ["guide"],
    featureFlags: {
      translateExtendedOptions: true,
    },
  })
}
