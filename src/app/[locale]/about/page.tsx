import Image from "next/image"
import { useTranslations } from "next-intl"
import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import { Typography } from "@mui/material"
import Link from "@mui/material/Link"

import logoFull from "@/assets/dm-logo-full.png"
import { PageShell } from "@/components/layout"
import { Section } from "@/components/styled"
import { supportedLocales } from "@/config"
import { I18nMetadataHandlerProps, Metadata } from "@/i18n"
import { linkAttrs } from "@/utils/ui"

export async function generateMetadata({
  params: { locale },
}: I18nMetadataHandlerProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "About" })

  return {
    title: t("title"),
  }
}

export const generateStaticParams = () => {
  return supportedLocales.map((locale) => ({ locale }))
}

export default function About({
  params: { locale },
}: I18nMetadataHandlerProps) {
  unstable_setRequestLocale(locale)
  const t = useTranslations("About")

  return (
    <PageShell>
      <Typography variant="h1">{t("h1")}</Typography>

      <Section component="section">
        <Typography variant="h2">{t("intro.h2")}</Typography>
        <Image
          src={logoFull}
          alt="Dharmamitra"
          style={{ width: "100%", height: "auto" }}
          priority
        />
        <Typography variant="reader" component="p">
          {t.rich("intro.p1", {
            monlam: (chunks) => (
              <Link href="https://monlam.ai" {...linkAttrs}>
                {chunks}
              </Link>
            ),
          })}
        </Typography>
        <Typography variant="reader" component="p">
          {t("intro.p2")}
        </Typography>
      </Section>

      <Section component="section">
        <Typography variant="h2">{t("collaboration.h2")}</Typography>
        <Typography variant="reader" component="p">
          {t.rich("collaboration.p1", {
            monlam: (chunks) => (
              <Link href="https://monlam.ai" {...linkAttrs}>
                {chunks}
              </Link>
            ),
          })}
        </Typography>
      </Section>

      <Section component="section">
        <Typography variant="h2">{t("history.h2")}</Typography>
        <Typography variant="reader" component="p">
          {t.rich("history.p1", {
            monlam: (chunks) => (
              <Link href="https://monlam.ai" {...linkAttrs}>
                {chunks}
              </Link>
            ),
          })}
        </Typography>
        <Typography variant="reader" component="p">
          {t("history.p2")}
        </Typography>
      </Section>
    </PageShell>
  )
}
