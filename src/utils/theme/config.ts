import { Noto_Sans } from "next/font/google"
import { grey } from "@mui/material/colors"
import { CustomTheming, ThemeOptions } from "@mui/material/styles"

import { colours, rgbCodes } from "@/utils/theme/colours"

const notoSans = Noto_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
})

const customTheming: CustomTheming = {
  baseColors: colours,
  palette: {
    soft: colours.soft,
    panel: colours.panel,
    background: {
      selected: grey[200],
    },
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
      fontSize: "3rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "2.2rem",
      fontWeight: 500,
      marginBlockEnd: "1rem",
    },
    h3: {
      fontSize: "1.25rem",
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
