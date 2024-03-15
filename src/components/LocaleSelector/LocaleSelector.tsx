import { useLocale, useTranslations } from "next-intl"
import { supportedLocales } from "@/config"
import LocaleSelectionSwitcher from "./LocaleSelectionSwitcher"

const styles = {
  display: "flex",
  justifyContent: "flex-end",
  padding: "1rem",
}

export default function LocaleSelector() {
  const t = useTranslations("localeSwitcher")
  const locale = useLocale()

  return (
    <div style={styles}>
      <LocaleSelectionSwitcher defaultValue={locale} label={t("label")}>
        {supportedLocales.map((currentLocale) => (
          <option key={currentLocale} value={currentLocale}>
            {t("locale", { locale: currentLocale })}
          </option>
        ))}
      </LocaleSelectionSwitcher>
    </div>
  )
}
