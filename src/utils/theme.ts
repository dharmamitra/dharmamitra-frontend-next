"use client"

import { Manrope } from "next/font/google"
import { createTheme } from "@mui/material/styles"

const manrope = Manrope({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
})

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#ffc107",
    },
  },
  typography: {
    fontFamily: manrope.style.fontFamily,
    fontSize: 16, // Sets the base font size to 16px
    htmlFontSize: 14, // Adjusts the root HTML font size for rem calculations
  },
})

export default theme
