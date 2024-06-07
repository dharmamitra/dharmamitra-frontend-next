import Image from "next/image"
import { useTranslations } from "next-intl"
import { Box, Button, Grid, Typography } from "@mui/material"

import LocalLink from "@/components/LocalLink"
import useAppConfig from "@/hooks/useAppConfig"
import customTheming from "@/utils/theme/config"

export default function Footer() {
  const {
    orgEmail,
    isClient,
    basePath,
    assetPaths: { logoLarge },
  } = useAppConfig()
  const t = useTranslations("footer")

  return (
    <Box
      sx={{
        width: "100%",
        py: 6,
        // px alaigned with NavigationBar
        px: { xs: 3, md: 4 },
        bgcolor: customTheming.palette.soft,
      }}
      component="footer"
    >
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} lg={4}>
          <LocalLink
            href="/"
            sx={{
              display: "flex",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            <Box
              sx={{
                maxWidth: { xs: "264px", lg: "324px", xl: "334px" },
                maxHeight: { xs: "264px", md: "170px", lg: "unset" },
              }}
            >
              <Image
                src={basePath + logoLarge.src}
                alt="Logo"
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "100%",
                }}
                width={logoLarge.width}
                height={logoLarge.height}
              />
            </Box>
          </LocalLink>
        </Grid>

        {isClient ? (
          <Grid item xs={12} md={6} lg={4}></Grid>
        ) : (
          <Grid item xs={12} md={6} lg={4}>
            <Box
              sx={{
                maxWidth: { lg: "455px" },
              }}
            >
              <Typography
                variant="h5"
                component="h2"
                fontWeight="500"
                color="primary"
                mb={1}
              >
                {t("mission.h2")}
              </Typography>
              <Typography variant="body2">{t("mission.p")}</Typography>
            </Box>
          </Grid>
        )}

        <Grid item xs={12} md={6} lg={4}>
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
              <Typography variant="h5" component="h2" color="primary" mb={1}>
                {t("contact.h2")}
              </Typography>
              <Typography variant="body2">{t("contact.p")}</Typography>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 2 }}
                href={`mailto:${orgEmail}`}
              >
                {t("contact.button")}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
