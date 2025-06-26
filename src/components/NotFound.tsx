import * as React from "react"
import { useTranslations } from "next-intl"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Box, Link, Typography } from "@mui/material"

import Error from "@/components/Error"
import LocalLink from "@/components/LocalLink"
import useAppConfig from "@/hooks/useAppConfig"

const LocalizedTitle = () => {
  const t = useTranslations("NotFound")
  return t("h1")
}

const FallbackTitle = () => {
  return "Page not found"
}

const LocalizedMessage = () => {
  const t = useTranslations("NotFound")
  return t.rich("message", {
    cite: (chunks) => (
      <cite style={{ display: "block", fontSize: "0.8em" }}>
        <small>{chunks}</small>
      </cite>
    ),
  })
}

const FallbackMessage = () => {
  const { orgEmail } = useAppConfig()
  return (
    <Typography>
      {
        "Please check the URL to make sure you're using the right version of the site, or try clicking the home button. "
      }
      <Link href={`mailto:${orgEmail}`} fontWeight={500}>
        Contact us
      </Link>
      {" if the issue persists."}
    </Typography>
  )
}

const LocalizedHomeLink = () => {
  const t = useTranslations("NotFound")
  return (
    <LocalLink sx={{ display: "flex", alignItems: "center", mt: 6 }} variant="button" href="/">
      <ArrowBackIcon /> {t("home")}
    </LocalLink>
  )
}

const FallbackHomeLink = () => {
  const { basePath } = useAppConfig()
  return (
    <Link sx={{ display: "flex", alignItems: "center", mt: 6 }} variant="button" href={basePath}>
      <ArrowBackIcon /> {"Go home"}
    </Link>
  )
}

export default function NotFound({ isLocalized = true }: { isLocalized?: boolean }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        my: 12,
      }}
    >
      <hgroup>
        <Typography variant="h1" component="p" align="center" color="error" mb={2}>
          {"404"}
        </Typography>
        <Typography variant="h2" component="h1" align="center" color="error" mb={4}>
          {isLocalized ? <LocalizedTitle /> : <FallbackTitle />}
        </Typography>
      </hgroup>
      <Error
        message={
          <Box
            sx={{
              maxWidth: "550px",
              fontWeight: 400,
              textAlign: "center",
            }}
          >
            {isLocalized ? <LocalizedMessage /> : <FallbackMessage />}
          </Box>
        }
        imgWdiths={{ xs: "140px", sm: "200px" }}
      />
      {isLocalized ? <LocalizedHomeLink /> : <FallbackHomeLink />}
    </Box>
  )
}
