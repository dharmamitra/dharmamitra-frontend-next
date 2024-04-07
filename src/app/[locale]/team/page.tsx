import { useTranslations } from "next-intl"
import { Typography } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import { deepOrange, deepPurple } from "@mui/material/colors"
import Stack from "@mui/material/Stack"

import { PageShell } from "@/components/layout"

export default function Home() {
  const t = useTranslations("Team")

  return (
    <PageShell>
      <Typography variant="h1" component="h1">
        {t("h1")}
      </Typography>

      <Stack direction="row" spacing={2}>
        <Avatar>H</Avatar>
        <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        <Avatar sx={{ bgcolor: deepPurple[500] }}>P</Avatar>
      </Stack>
    </PageShell>
  )
}
