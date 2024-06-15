import { useLocale, useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Box, Typography } from "@mui/material"

import Error from "@/components/Error"
import PageShell from "@/components/layout/PageShell"
import LocalLink from "@/components/LocalLink"
import { I18nMetadataHandlerProps, Metadata } from "@/i18n"

export async function generateMetadata({
  params: { locale },
}: I18nMetadataHandlerProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "NotFound" })

  return {
    title: t("title"),
  }
}

export default function NotFoundPage() {
  const t = useTranslations("NotFound")
  const locale = useLocale()

  return (
    <html lang={locale}>
      <body>
        <PageShell sx={{ my: 12 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              align="center"
              color="error"
              sx={{
                mb: { xs: 4, lg: 10 },
              }}
            >
              {t("h1")}
            </Typography>
            <Error
              message={
                <Box
                  sx={{
                    maxWidth: "450px",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  {t.rich("message", {
                    cite: (chunks) => (
                      <cite>
                        <small>{chunks}</small>
                      </cite>
                    ),
                  })}
                </Box>
              }
              imgWdiths={{ xs: "140px", sm: "200px" }}
            />
            <LocalLink
              sx={{ display: "flex", alignItems: "center", mt: 8 }}
              variant="button"
              href="/"
            >
              <ArrowBackIcon /> {t("home")}
            </LocalLink>
          </Box>
        </PageShell>
      </body>
    </html>
  )
}
