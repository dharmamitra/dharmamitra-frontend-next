"use client"

import { createTheme, responsiveFontSizes } from "@mui/material/styles"

import { baseTheme } from "./config"

let theme = createTheme(baseTheme)

theme = responsiveFontSizes(theme)

// responsive font size values need to be manually set
theme.typography.reader = {
  ...theme.typography.reader,
  fontSize: "1.15rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.15rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.25rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.35rem",
  },
}

export default theme
