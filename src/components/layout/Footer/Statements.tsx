import { useTranslations } from "next-intl"
import { Box, Link, Typography } from "@mui/material"

import { linkAttrs } from "@/utils/constants"

const LocalizedMission = () => {
  const t = useTranslations("footer")
  return (
    <>
      <Box
        sx={{
          maxWidth: "564px",
        }}
      >
        <Typography variant="body2" textAlign="center">
          {t("mission.p")}{" "}
          {t.rich("collaboration", {
            link: (chunks) => (
              <Link href="https://tsadra.org/" {...linkAttrs}>
                {chunks}
              </Link>
            ),
          })}
        </Typography>
      </Box>
      <Typography variant="body2" textAlign="center" color="text.secondary">
        {t("engine")}
      </Typography>
    </>
  )
}

const FallbackMission = () => {
  return (
    <>
      <Box
        sx={{
          maxWidth: "564px",
        }}
      >
        <Typography variant="body2" textAlign="center">
          {
            "Harnessing AI technologies to promote the scholarly study and personal practice of the dharma and to accelerate academic and individual research through open-source collaboration on datasets, models and applications. "
          }
          {"In collaboration with the "}
          <Link href="https://tsadra.org/" {...linkAttrs}>
            Tsadra Foundation
          </Link>
          {"."}
        </Typography>
      </Box>
      <Typography variant="body2" textAlign="center" color="text.secondary">
        "Powered by the Gemini API"
      </Typography>
    </>
  )
}

export default function Statements({ isLocalized = true }: { isLocalized?: boolean }) {
  return <>{isLocalized ? <LocalizedMission /> : <FallbackMission />}</>
}
