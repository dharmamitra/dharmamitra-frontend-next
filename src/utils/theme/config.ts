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
      fontSize: "1.35rem",
    },
  },
}

const colours = {
  primary: "#06315f",
  secondary: "#972e3a",
}

export const theme: ThemeOptions = {
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
      // fontSize: "2.5rem",
      fontWeight: 500,
      marginTop: "2rem",
    },
    h2: {
      color: colours.primary,
      marginTop: "2rem",
    },
  },
  components: {
    MuiButton: {},
  },
  custom: customTheming,
}

export default customTheming
