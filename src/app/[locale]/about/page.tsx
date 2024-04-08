import Image from "next/image"
import { useTranslations } from "next-intl"
import { Box, Typography } from "@mui/material"
import Link from "@mui/material/Link"

import logoFull from "@/assets/dm-logo-full.png"
import { PageShell } from "@/components/layout"

const linkAttrs = {
  color: "secondary",
  target: "_blank",
  rel: "noopener noreferrer",
}

const sectionStyles = {
  sx: { my: { xs: 4, md: 6 } },
}

export default function About() {
  const t = useTranslations("About")

  return (
    <PageShell>
      <Typography variant="h1">{t("h1")}</Typography>

      <Box {...sectionStyles}>
        <Typography variant="h2">{t("intro.h2")}</Typography>
        <Image
          src={logoFull}
          alt="Dharmamitra"
          objectFit="contain"
          style={{ width: "100%", height: "auto" }}
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
      </Box>

      <Box {...sectionStyles}>
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
      </Box>

      <Box {...sectionStyles}>
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
      </Box>
    </PageShell>
  )
}
