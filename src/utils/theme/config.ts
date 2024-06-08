import { Noto_Sans } from "next/font/google"
import { grey } from "@mui/material/colors"
import { CustomTheming, ThemeOptions } from "@mui/material/styles"

import appConfig from "@/config"

const notoSans = Noto_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
})

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

type EnvRGBCodes = {
  default: ThemeRGBCodes
} & Record<AppEnv, ThemeRGBCodes>

const envRgbCodes: EnvRGBCodes = {
  default: getDefaultColors(),
  kumarajiva: {
    primary: "246, 220, 31", // #f6dc1f
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

const rgbCodes =
  appConfig.env in envRgbCodes
    ? envRgbCodes[appConfig.env]!
    : envRgbCodes.default

const colours = {
  primary: `rgb(${rgbCodes.primary}, 1)`,
  secondary: `rgb(${rgbCodes.secondary}, 1)`,
  soft: `rgb(${rgbCodes.light}, 0.5)`,
  panel: `rgb(${rgbCodes["grey-100"]}, 1)`,
  text: {
    primary: `rgb(${rgbCodes.text.primary}, 1)`,
  },
  link: {
    primary: `rgb(${rgbCodes.link.primary}, 1)`,
  },
}

const customTheming: CustomTheming = {
  palette: {
    soft: colours.soft,
    panel: colours.panel,
  },
  shape: {
    inputRadius: "24px",
  },
  typography: {
    reader: {
      fontSize: "1.5rem",
    },
  },
}

export const baseTheme: ThemeOptions = {
  palette: {
    primary: {
      main: colours.primary,
    },
    secondary: {
      main: colours.secondary,
    },
    text: {
      primary: colours.text.primary,
    },
  },
  typography: {
    fontFamily: notoSans.style.fontFamily,
    // Sets the base font size to 16px
    fontSize: 16,
    // Adjusts the root HTML font size for rem calculations
    // htmlFontSize: 14,
    h1: {
      marginTop: "2rem",
    },
    h2: {
      fontSize: "3rem",
      marginTop: "2rem",
      fontWeight: 500,
    },
    reader: {
      marginBlock: "1rem",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: grey[600],
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.color === "primary" && {
            color: `rgb(${rgbCodes.link.primary}, 1)`,
          }),
        }),
      },
    },
  },
  custom: customTheming,
}

export default customTheming
