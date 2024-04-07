import Image from "next/image"
import { useTranslations } from "next-intl"
import { Typography } from "@mui/material"
import Link from "@mui/material/Link"

import logoFull from "@/assets/dm-logo-full.png"
import { PageShell } from "@/components/layout"
import customTheming from "@/utils/theme/config"

const linkAttrs = {
  color: "secondary",
  target: "_blank",
  rel: "noopener noreferrer",
}

export default function About() {
  const t = useTranslations("About")

  return (
    <PageShell sx={{ mb: 12 }}>
      <Typography variant="h1" component="h1">
        {t("h1")}
      </Typography>

      <section style={{ marginBlockEnd: "4rem" }}>
        <Typography variant="h2" component="h2">
          {t("intro.h2")}
        </Typography>
        <Image
          src={logoFull}
          alt="Dharmamitra"
          objectFit="contain"
          style={{ width: "100%", height: "auto" }}
        />
        <Typography
          sx={{ mt: 2, fontSize: customTheming.typography.reader?.fontSize }}
        >
          {t.rich("intro.p1", {
            monlam: (chunks) => (
              <Link href="https://monlam.ai" {...linkAttrs}>
                {chunks}
              </Link>
            ),
          })}
        </Typography>
        <Typography
          sx={{ mt: 2, fontSize: customTheming.typography.reader?.fontSize }}
        >
          {t("intro.p2")}
        </Typography>
      </section>

      <section style={{ marginBlockEnd: "4rem" }}>
        <Typography variant="h2" component="h2">
          {t("collaboration.h2")}
        </Typography>
        <Typography
          sx={{ mt: 2, fontSize: customTheming.typography.reader?.fontSize }}
        >
          {t.rich("collaboration.p1", {
            monlam: (chunks) => (
              <Link href="https://monlam.ai" {...linkAttrs}>
                {chunks}
              </Link>
            ),
          })}
        </Typography>
      </section>

      <section style={{ marginBlockEnd: "4rem" }}>
        <Typography variant="h2" component="h2">
          {t("history.h2")}
        </Typography>
        <Typography
          sx={{ mt: 2, fontSize: customTheming.typography.reader?.fontSize }}
        >
          {t.rich("history.p1", {
            monlam: (chunks) => (
              <Link href="https://monlam.ai" {...linkAttrs}>
                {chunks}
              </Link>
            ),
          })}
        </Typography>
        <Typography
          sx={{ mt: 2, fontSize: customTheming.typography.reader?.fontSize }}
        >
          {t("history.p2")}
        </Typography>
      </section>
    </PageShell>
  )
}
