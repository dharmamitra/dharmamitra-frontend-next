import { useLocale, useTranslations } from "next-intl"
import { Typography } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"

import { supportedLocales } from "@/config"

import LocaleSelectionSwitcher from "./LocaleSelectionSwitcher"

export default function LocaleSelector() {
  const t = useTranslations("localeSwitcher")
  const locale = useLocale()

  return (
    <LocaleSelectionSwitcher defaultValue={locale} label={t("label")}>
      {supportedLocales.map((currentLocale) => (
        <MenuItem key={currentLocale + "locale-switcher"} value={currentLocale}>
          <Typography
            variant="body2"
            sx={{ textTransform: "uppercase" }}
            lineHeight={1.5}
          >
            {t("locale", { locale: currentLocale })}
          </Typography>
        </MenuItem>
      ))}
    </LocaleSelectionSwitcher>
  )
}
