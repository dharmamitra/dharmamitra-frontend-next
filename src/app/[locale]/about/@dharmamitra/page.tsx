import Image from "next/image"
import { useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import CheckIcon from "@mui/icons-material/Check"
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Unstable_Grid2"
import { visuallyHidden } from "@mui/utils"

import dmLogoFull from "@/assets/logos/dm-logo-full.png"
import IconCard from "@/components/IconCard"
import Section from "@/components/Section"
import { linkAttrs } from "@/utils/constants"
import customTheming from "@/utils/theme/config"

import data from "./data"

export default function AboutDharmamitraPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const t = useTranslations("About.dharmamitra")

  return (
    <main>
      <Container maxWidth="lg" sx={{ flexGrow: 1, mt: { xs: 6, md: 8 } }}>
        <Typography variant="h1" sx={visuallyHidden}>
          {t("h1")}
        </Typography>

        <Section>
          <Typography variant="h2">{t("about.h2")}</Typography>
          <Typography>{t("about.p1")}</Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", my: 4 }}>
            {data.features.map((feature) => (
              <IconCard
                key={`dharmamitra-feature-${feature.i18nKey}`}
                icon={feature.icon}
                title={t(`about.features.${feature.i18nKey}.title`)}
                description={t(`about.features.${feature.i18nKey}.description`)}
              />
            ))}
          </Box>

          <Typography>{t("about.p2")}</Typography>

          <List>
            {data.roadmapItemKeys.map((key) => (
              <ListItem key={`roadmap-item-${key}`}>
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "50%",
                    height: "28px",
                    width: "28px",
                    mr: 2,
                    border: "1px solid",
                    borderColor: "secondary.main",
                    bgcolor: customTheming.palette.soft,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "unset",
                    }}
                  >
                    <CheckIcon color="secondary" fontSize="small" />
                  </ListItemIcon>
                </Box>
                <ListItemText primary={t(`about.roadmap.${key}`)} />
              </ListItem>
            ))}
          </List>
        </Section>
      </Container>

      <Section sx={{ bgcolor: customTheming.palette.soft }}>
        <Box
          sx={{
            display: "inline-flex",
            width: "100%",
            mx: "auto",
          }}
        >
          <Grid container>
            <Grid xs={12} lg={5}>
              <Box
                sx={{
                  display: { xs: "none", lg: "grid" },
                  placeItems: "center",
                  height: "100%",
                  backgroundColor: customTheming.baseColors.light,
                }}
              >
                <Image
                  src={dmLogoFull}
                  alt="Dharmamitra"
                  width={450}
                  height={240}
                />
              </Box>
            </Grid>

            <Grid xs={12} lg={7}>
              <Container sx={{ py: 5 }}>
                <Typography variant="h2">{t("project.h2")}</Typography>
                <Typography mb={2}>{t("project.p1")}</Typography>
                <Typography mb={2}>{t("project.p2")}</Typography>
                <Typography mb={2}>{t("project.p3")}</Typography>
              </Container>
            </Grid>
          </Grid>
        </Box>
      </Section>

      <Container maxWidth="lg" sx={{ flexGrow: 1, my: { xs: 6, md: 10 } }}>
        <Section>
          <Typography variant="h2" mb={4}>
            {t("collaboration.h2")}
          </Typography>

          <Grid
            container
            columnSpacing={{ xs: 3, sm: 1, md: 8 }}
            rowSpacing={6}
            columns={16}
          >
            {data.collaborators.map((collaborator) => (
              <Grid
                key={`colaborator-${collaborator.i18nKey}`}
                xs={16}
                sm={8}
                md={7}
              >
                <div>
                  <Grid container spacing={{ xs: 3 }}>
                    <Grid xs={2}>
                      <Image
                        src={collaborator.logo.src}
                        alt={collaborator.logo.alt}
                        width={56}
                        height={56}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid xs={10}>
                      <Typography variant="h5" component="h3" mb={1}>
                        {t.rich(
                          `collaboration.collaborators.${collaborator.i18nKey}.name`,
                          {
                            link: (chunks) => (
                              <Link
                                sx={{ color: "text.primary", fontWeight: 500 }}
                                href={collaborator.url}
                                {...linkAttrs}
                              >
                                {chunks}
                              </Link>
                            ),
                          },
                        )}
                      </Typography>
                      <Typography variant="body2">
                        {t(
                          `collaboration.collaborators.${collaborator.i18nKey}.description`,
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            ))}
          </Grid>
        </Section>
      </Container>
    </main>
  )
}
