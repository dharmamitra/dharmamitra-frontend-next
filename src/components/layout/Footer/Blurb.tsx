import { useTranslations } from "next-intl"
import { Box, Link, Typography } from "@mui/material"

import { linkAttrs } from "@/utils/constants"

const MAX_WIDTH = "464px"

const LocalizedBlurb = () => {
  const t = useTranslations("footer")
  return (
    <Box
      sx={{
        maxWidth: MAX_WIDTH,
      }}
    >
      <Typography variant="body2" textAlign={{ xs: "center", lg: "right" }} mt={2}>
        {t.rich("blurb", {
          link: (chunks) => (
            <Link href="https://tsadra.org/" {...linkAttrs}>
              {chunks}
            </Link>
          ),
        })}
      </Typography>
    </Box>
  )
}

const FallbackBlurb = () => {
  return (
    <Box
      sx={{
        maxWidth: MAX_WIDTH,
      }}
    >
      <Typography variant="body2" textAlign={{ xs: "center", lg: "right" }} mt={2}>
        {
          "Harnessing AI technologies to promote the scholarly study and personal practice of the dharma."
        }
        {" In collaboration with the "}
        <Link href="https://tsadra.org/" {...linkAttrs}>
          Tsadra Foundation
        </Link>
        {"; powered by the Gemini API."}
      </Typography>
    </Box>
  )
}

export default function Blurb({ isLocalized = true }: { isLocalized?: boolean }) {
  return <>{isLocalized ? <LocalizedBlurb /> : <FallbackBlurb />}</>
}
