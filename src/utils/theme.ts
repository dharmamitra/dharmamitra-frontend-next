"use client"

import { Noto_Sans } from "next/font/google"
import { createTheme } from "@mui/material/styles"

const notoSans = Noto_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
})

const theme = createTheme({
  palette: {
    primary: {
      main: "#007baa",
    },
    secondary: {
      main: "#ffc107",
    },
  },
  typography: {
    fontFamily: notoSans.style.fontFamily,
    // Sets the base font size to 16px
    fontSize: 16,
    // Adjusts the root HTML font size for rem calculations
    // htmlFontSize: 14,
    h1: {
      fontSize: "4.5rem",
    },
  },
  components: {
    MuiButton: {},
  },
})

export default theme
