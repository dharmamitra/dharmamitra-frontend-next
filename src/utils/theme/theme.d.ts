import "@mui/material/styles"

declare module "@mui/material/styles" {
  interface CustomTheming {
    shape: {
      inputRadius?: string
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
