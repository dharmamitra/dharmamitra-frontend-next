// Enables type safety for message keys with `next-intl`
type Messages = typeof import("./messages/en.json")
declare interface IntlMessages extends Messages {}
