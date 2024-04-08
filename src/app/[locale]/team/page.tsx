import { useTranslations } from "next-intl"
import { Typography } from "@mui/material"

import { PageShell } from "@/components/layout"
import Members from "@/components/Members"

import membersData from "./data"

export default function Team() {
  const t = useTranslations("Team")

  return (
    <PageShell>
      <Typography variant="h1">{t("h1")}</Typography>

      <section style={{ marginBlockEnd: "4rem" }}>
        <Typography variant="h2" mt={{ xs: 2, sm: 4 }} mb={4}>
          {t("present.h2")}
        </Typography>

        <Members members={membersData.current} />
      </section>

      <section style={{ marginBlockEnd: "4rem" }}>
        <Typography variant="h2" mb={4}>
          {t("past.h2")}
        </Typography>

        <Members members={membersData.past} />
      </section>
    </PageShell>
  )
}
