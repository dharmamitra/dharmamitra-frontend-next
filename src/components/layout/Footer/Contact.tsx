import { useTranslations } from "next-intl"
import { Box, Button, Typography } from "@mui/material"

import useAppConfig from "@/hooks/useAppConfig"

const buttonAttributes = {
  variant: "outlined",
  color: "secondary",
  sx: { mt: 2 },
} as const

const LocalizedContact = ({ orgEmail }: { orgEmail: string }) => {
  const t = useTranslations("footer")
  return (
    <>
      <Typography variant="h5" component="h2" mb={1}>
        {t("contact.h2")}
      </Typography>
      <Typography variant="body2">{t("contact.p")}</Typography>
      <Button {...buttonAttributes} href={`mailto:${orgEmail}`}>
        {t("contact.button")}
      </Button>
    </>
  )
}

const FallbackContact = ({ orgEmail }: { orgEmail: string }) => {
  return (
    <>
      <Typography variant="h5" component="h2" mb={1}>
        {"We value your feedback"}
      </Typography>
      <Typography variant="body2">
        {
          "Please take a moment to share your thoughts with us. We appreciate you taking the time to help make Dhammamitra better for everyone"
        }
      </Typography>
      <Button {...buttonAttributes} href={`mailto:${orgEmail}`}>
        {"Email us"}
      </Button>
    </>
  )
}

export default function Contact({
  isLocalized = true,
}: {
  isLocalized?: boolean
}) {
  const { orgEmail } = useAppConfig()

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: { md: "flex-end" },
      }}
    >
      <Box
        sx={{
          maxWidth: { lg: "455px" },
        }}
      >
        {isLocalized ? (
          <LocalizedContact orgEmail={orgEmail} />
        ) : (
          <FallbackContact orgEmail={orgEmail} />
        )}
      </Box>
    </Box>
  )
}
