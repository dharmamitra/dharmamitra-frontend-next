import appConfig from "@/config"

const getDefaultColors = () => ({
  primary: "0, 0, 0", // #000
  secondary: "151, 46, 58", // #972e3a
  light: "251, 238, 235", // #FBEEEB
  "grey-100": "247, 247, 247", // #F7F7F7
  text: {
    primary: "0, 0, 0", // #000
  },
  link: {
    primary: "151, 46, 58", // #972e3a
  },
})

type ThemeRGBCodes = ReturnType<typeof getDefaultColors>

type VariantRGBCodes = {
  default: ThemeRGBCodes
} & Partial<Record<BuildVariant, ThemeRGBCodes>>

const variantRgbCodes: VariantRGBCodes = {
  default: getDefaultColors(),
  kumarajiva: {
    // primary: "246, 220, 31", // #f6dc1f
    primary: "4, 60, 133", // #043c85
    secondary: "4, 60, 133", // #043c85
    light: "255, 252, 231", //  #fffce7
    "grey-100": "247, 247, 247", // #F7F7F7
    text: {
      primary: "53, 52, 50", // #353432
    },
    link: {
      primary: "4, 60, 133", // #043c85
    },
  },
}

export const rgbCodes =
  appConfig.variant in variantRgbCodes
    ? variantRgbCodes[appConfig.variant]!
    : variantRgbCodes.default

export const colours = {
  primary: `rgb(${rgbCodes.primary}, 1)`,
  secondary: `rgb(${rgbCodes.secondary}, 1)`,
  light: `rgb(${rgbCodes.light}, 1)`,
  soft: `rgb(${rgbCodes.light}, 0.5)`,
  panel: `rgb(${rgbCodes["grey-100"]}, 1)`,
  text: {
    primary: `rgb(${rgbCodes.text.primary}, 1)`,
  },
  link: {
    primary: `rgb(${rgbCodes.link.primary}, 1)`,
  },
}
