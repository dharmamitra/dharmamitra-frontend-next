import { Noto_Sans } from "next/font/google"
import { CustomTheming, ThemeOptions } from "@mui/material/styles"

const notoSans = Noto_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
})

const customTheming: CustomTheming = {
  shape: {
    inputRadius: "24px",
  },
  typography: {
    reader: {
      fontSize: "1.5rem",
    },
  },
}

const colours = {
  primary: "#06315f",
  secondary: "#972e3a",
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
    htmlFontSize: 14,
    h1: {
      color: colours.primary,
      marginTop: "2rem",
    },
    h2: {
      color: colours.primary,
      marginTop: "2rem",
    },
    reader: {
      fontSize: "1.15rem",
      marginBlock: "1rem",
    },
  },
  components: {
    MuiButton: {},
  },
  custom: customTheming,
}

export default customTheming
