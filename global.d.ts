
import type { 
  SupportedLocale as _SupportedLocale, 
  Messages as _Messages 
} from "./src/app/types"

// Enables type safety for message keys with `next-intl`
declare module "next-intl" {
  interface AppConfig {
    Locale: _SupportedLocale
    Messages: _Messages
  }
}

// Export to make this a module (required for global declarations with imports)
export {}
