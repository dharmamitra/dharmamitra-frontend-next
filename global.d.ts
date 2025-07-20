
import type { 
  SupportedLocale as _SupportedLocale, 
  BuildVariant as _BuildVariant, 
  Messages as _Messages 
} from "./src/app/types"

// Make types globally available
declare global {
  type SupportedLocale = _SupportedLocale
  type BuildVariant = _BuildVariant
  type Messages = _Messages
}

// Enables type safety for message keys with `next-intl`
declare module "next-intl" {
  interface AppConfig {
    Locale: SupportedLocale
    Messages: Messages
  }
}

// Export to make this a module (required for global declarations with imports)
export {}

declare module "*.png" {
  const value: any
  export default value
}

declare module "*.jpg" {
  const value: any
  export default value
}

declare module "*.svg" {
  const value: any
  export default value
}
