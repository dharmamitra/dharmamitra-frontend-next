import { useTranslations } from "next-intl"
import Avatar from "@mui/material/Avatar"
import { deepOrange, deepPurple } from "@mui/material/colors"
import Stack from "@mui/material/Stack"

import { PageShell } from "@/components/layout"

export default function Home() {
  const t = useTranslations("Team")

  return (
    <PageShell title={t("title")}>
      <Stack direction="row" spacing={2}>
        <Avatar>H</Avatar>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>P</Avatar>
      </Stack>
    </PageShell>
  )
}
