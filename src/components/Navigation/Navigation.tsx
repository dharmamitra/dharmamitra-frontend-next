import { useTranslations } from "next-intl"
import { LocaleSelector } from "@/components/LocaleSelector"
import LocalLink from "./LocalLink"

export default function Navigation() {
  const t = useTranslations("navigation")

  return (
    <div>
      <nav style={container}>
        <div style={items}>
          <LocalLink href="/">{t("home")}</LocalLink>
          <LocalLink href="/about">{t("about")}</LocalLink>
          <LocalLink href="/team">{t("team")}</LocalLink>
        </div>
        <LocaleSelector />
      </nav>
    </div>
  )
}

const items = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "1rem",
}
const container = {
  ...items,
  padding: "1rem",
}
