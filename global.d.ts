type SupportedLocale = (typeof import("./src/i18n/index.ts").SUPPORTED_LOCALES)[number]

type BuildVariant = (typeof import("./src/config/constants.ts").BUILD_VARIANTS)[number]

// Enables type safety for message keys with `next-intl`
type Messages = typeof import("./messages/en.json")
declare interface IntlMessages extends Messages {}

declare module "*.png" {
  const value: any
  export = value
}

declare module "*.jpg" {
  const value: any
  export = value
}

declare module "*.svg" {
  const value: any
  export = value
}
