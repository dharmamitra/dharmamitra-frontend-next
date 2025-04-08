import { useTranslations } from "next-intl"
import { Typography } from "@mui/material"
import visuallyHidden from "@mui/utils/visuallyHidden"

import MitraTranslator from "@/components/features/MitraTranslator"
import MultiFeatureMitra from "@/components/features/MultiFeatureMitra"
import PageContentFrame from "@/components/layout/PageContentFrame"
import StorageCheck from "@/components/StorageCheck"
import useAppConfig from "@/hooks/useAppConfig"

function MultiFeatureMitraPage() {
  return (
    <>
      <StorageCheck />
      <PageContentFrame maxWidth="xl" sx={{ mb: { xs: 6, md: 14 } }}>
        <Typography component="h1" sx={visuallyHidden}>
          Dharmamitra
        </Typography>
        <MultiFeatureMitra />
      </PageContentFrame>
    </>
  )
}

export default function HomePage() {
  const { hasSearch, hasOCR } = useAppConfig().featureFlags
  const t = useTranslations("Home")

  if (hasSearch === true || hasOCR === true) {
    return <MultiFeatureMitraPage />
  }

  return (
    <>
      <StorageCheck />
      <PageContentFrame
        maxWidth="xl"
        sx={{
          mb: { xs: 6, md: 14 },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{
            mb: { xs: 4, lg: 6 },
          }}
        >
          {t("h1")}
        </Typography>

        <MitraTranslator />
      </PageContentFrame>
    </>
  )
}
