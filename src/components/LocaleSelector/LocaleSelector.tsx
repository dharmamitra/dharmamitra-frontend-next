import { useLocale, useTranslations } from "next-intl"
import { supportedLocales } from "@/config"
import LocaleSelectionSwitcher from "./LocaleSelectionSwitcher"



export default function LocaleSelector() {
  const t = useTranslations("localeSwitcher")
  const locale = useLocale()

  return (
    <div>
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
