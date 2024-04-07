import "@mui/material/styles"

declare module "@mui/material/styles" {
  interface CustomTheming {
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
