import "@mui/material/styles"

import React from "react"

declare module "@mui/material/styles" {
  // https://medium.com/@swalperen3008/creating-custom-typography-themes-in-material-ui-a-step-by-step-guide-714a3e30619a
  interface TypographyVariants {
    reader: React.CSSProperties
  }
  interface TypographyVariantsOptions {
    reader?: React.CSSProperties
  }

  interface CustomTheming {
    baseColors: {
      primary?: string
      secondary?: {
        main: string
        dark: string
      }
      light?: string
      text?: {
        primary?: string
      }
      link?: {
        primary?: string
      }
    }
    palette: {
      soft?: string
      panel?: string
      background?: {
        selected?: string
      }
    }
    shape: {
      inputRadius?: string
    }
    typography: {
      reader?: {
        fontSize?: string
        lineHeight?: number
      }
    }
  }

  interface Theme {
    custom: CustomTheming
  }
  // Allow configuration using `createTheme`
  interface ThemeOptions {
    custom: CustomTheming
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    reader: true
  }
}
