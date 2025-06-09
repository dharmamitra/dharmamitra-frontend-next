import { useTranslations } from "next-intl"
import { Box, Button, Grid, Typography } from "@mui/material"

import useAppConfig from "@/hooks/useAppConfig"

const buttonAttributes = {
  variant: "outlined",
  color: "secondary",
  sx: { mt: 2 },
} as const

const ContactCard = ({
  title,
  text,
  buttonLabel,
  buttonHref,
}: {
  title: string
  text: string
  buttonLabel: string
  buttonHref: string
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        height: "100%",
        p: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h3" mb={1}>
        {title}
      </Typography>
      <Typography variant="body2" mb={2}>
        {text}
      </Typography>
      <Button
        {...buttonAttributes}
        sx={{ justifySelf: "flex-start" }}
        href={buttonHref}
      >
        {buttonLabel}
      </Button>
    </Box>
  )
}

const ContactFrame = ({
  heading,
  cards,
}: {
  heading: string
  cards: {
    title: string
    text: string
    buttonLabel: string
    buttonHref: string
  }[]
}) => {
  return (
    <>
      <Typography variant="h2" mb={3}>
        {heading}
      </Typography>

      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid key={card.title} size={{ xs: 12, md: 6 }}>
            <ContactCard
              key={card.title}
              title={card.title}
              text={card.text}
              buttonLabel={card.buttonLabel}
              buttonHref={card.buttonHref}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

const LocalizedContact = ({ orgEmail }: { orgEmail: string }) => {
  const t = useTranslations("About.dharmamitra.contact")
  return (
    <ContactFrame
      heading={t("h2")}
      cards={[
        {
          title: t("card1.title"),
          text: t("card1.text"),
          buttonLabel: t("card1.button"),
          buttonHref: `mailto:${orgEmail}`,
        },
        {
          title: t("card2.title"),
          text: t("card2.text"),
          buttonLabel: t("card2.button"),
          buttonHref: `mailto:${orgEmail}`,
        },
      ]}
    />
  )
}

const FallbackContact = ({ orgEmail }: { orgEmail: string }) => {
  return (
    <ContactFrame
      heading={"Contact"}
      cards={[
        {
          title: "We'd love to hear from you!",
          text: "If you have any comments or suggestions, please take a moment to share your thoughts with us. We really appreciate every message we get helping to make Dharmamitra better for everyone.",
          buttonLabel: "Send feedback",
          buttonHref: `mailto:${orgEmail}`,
        },
        {
          title: "Building on Mitra",
          text: "If you are interested in using the Dharmamitra, or it's API to build your own project, please contact us beforehand to discuss this with us.",
          buttonLabel: "Request permission",
          buttonHref: `mailto:${orgEmail}`,
        },
      ]}
    />
  )
}

export default function Contact({
  isLocalized = true,
}: {
  isLocalized?: boolean
}) {
  const { orgEmail } = useAppConfig()

  return (
    <Box>
      {isLocalized ? (
        <LocalizedContact orgEmail={orgEmail} />
      ) : (
        <FallbackContact orgEmail={orgEmail} />
      )}
    </Box>
  )
}
