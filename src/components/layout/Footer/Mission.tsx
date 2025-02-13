import { useTranslations } from "next-intl"
import { Box, Typography } from "@mui/material"

const LocalizedMission = () => {
  const t = useTranslations("footer")
  return (
    <>
      <Typography variant="body2">{t("mission.p")}</Typography>
    </>
  )
}

const FallbackMission = () => {
  return (
    <>
      <Typography variant="body2">
        {
          "Harnessing AI technologies to promote the scholarly study and personal practice of the dharma and to accelerate academic and individual research through open-source collaboration on datasets, models and applications."
        }
      </Typography>
    </>
  )
}

export default function Mission({
  isLocalized = true,
}: {
  isLocalized?: boolean
}) {
  return (
    <Box
      sx={{
        maxWidth: { md: "424px" },
      }}
    >
      {isLocalized ? <LocalizedMission /> : <FallbackMission />}
    </Box>
  )
}
