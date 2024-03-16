import { useTranslations } from "next-intl"
import { Typography } from "@mui/material"

import { PageShell } from "@/components/layout"

export default function Home() {
  const t = useTranslations("Home")

  return (
    <PageShell title={t("title")}>
      <Typography component="blockquote">
        All phenomena are preceded by the mind,
        <br />
        Created by the mind,
        <br />
        And have the mind as their master.
        <br />
        If one speaks or acts from a corrupted mind,
        <br />
        Suffering follows as the cart-wheel follows the ox’s
        <br />
        foot.
        <br />
        <br />
        All phenomena are preceded by the mind,
        <br />
        Created by the mind,
        <br />
        And have the mind as their master.
        <br />
        If one speaks or acts with a pure mind,
        <br />
        Happiness follows as an ever-present shadow.
        <br />
      </Typography>
    </PageShell>
  )
}
