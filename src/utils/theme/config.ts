import { Noto_Sans } from "next/font/google"
import { CustomTheming, ThemeOptions } from "@mui/material/styles"

const notoSans = Noto_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
})

const rgbCodes = {
  primary: "6, 49, 95", // #06315f
  secondary: "151, 46, 58", // #972e3a
  light: "251, 238, 235", // #FBEEEB
}

const colours = {
  primary: `rgb(${rgbCodes.primary}, 1)`,
  secondary: `rgb(${rgbCodes.secondary}, 1)`,
  soft: `rgb(${rgbCodes.light}, 0.5)`,
}

const customTheming: CustomTheming = {
  palette: {
    soft: colours.soft,
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
  },
  typography: {
    fontFamily: notoSans.style.fontFamily,
    // Sets the base font size to 16px
    fontSize: 16,
    // Adjusts the root HTML font size for rem calculations
    // htmlFontSize: 14,
    h1: {
      color: colours.primary,
      marginTop: "2rem",
    },
    h2: {
      color: colours.primary,
      marginTop: "2rem",
    },
    reader: {
      marginBlock: "1rem",
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colours.primary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          "&:hover": {
            // replicates MUI's `darken` function for SSR
            backgroundColor: `rgba(${rgbCodes.primary}, 0.9)`,
          },
        },
      },
    },
  },
  custom: customTheming,
}

export default customTheming
