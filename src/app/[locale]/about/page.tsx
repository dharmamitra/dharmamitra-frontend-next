import { useTranslations } from "next-intl"
import { Typography } from "@mui/material"

import { PageShell } from "@/components/layout"

export default function About() {
  const t = useTranslations("About")

  return (
    <PageShell h1={t("h1")}>
      <Typography component="blockquote">
        He insulted me; he struck me;
        <br />
        He defeated me; he robbed me.
        <br />
        For those who dwell on such resentments,
        <br />
        Enmity never ceases.
        <br />
        <br />
        He insulted me; he struck me;
        <br />
        He defeated me; he robbed me.
        <br />
        For those who do not dwell on such resentments,
        <br />
        Enmity subsides;
        <br />
        <br />
        For enmities are never appeased by enmity.
        <br />
        They are appeased by peace.
        <br />
        This is an eternal law.
        <br />
      </Typography>
    </PageShell>
  )
}
