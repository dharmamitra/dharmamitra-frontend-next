import Image from "next/image"
import { useTranslations } from "next-intl"
import { unstable_setRequestLocale } from "next-intl/server"
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined"
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined"
import SavedSearchOutlinedIcon from "@mui/icons-material/SavedSearchOutlined"
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined"
import ViewInArOutlinedIcon from "@mui/icons-material/ViewInArOutlined"
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import Link from "@mui/material/Link"

import logoFull from "@/assets/dm-logo-full.png"
import Section from "@/components/Section"
import { linkAttrs } from "@/utils/ui"

export default function AboutDharmamitraPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const t = useTranslations("About.dharmamitra")

  const listKeys = ["li1", "li2", "li3"] as const

  return (
    <>
      <Typography variant="h1">{t("h1")}</Typography>

      <Section>
        <Typography variant="h2">{t("mission.h2")}</Typography>
        <Typography variant="reader" component="p">
          {t("mission.p1")}
        </Typography>

        <Typography variant="reader" component="p">
          {t("mission.p2.line1")}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <SmartToyOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t(`mission.p2.${listKeys[0]}`)} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <SavedSearchOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t(`mission.p2.${listKeys[1]}`)} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <AutoFixHighOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t(`mission.p2.${listKeys[2]}`)} />
          </ListItem>
        </List>

        <Typography variant="reader" component="p">
          {t("mission.p3.line1")}
        </Typography>

        <List>
          <ListItem>
            <ListItemIcon>
              <ViewInArOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t(`mission.p3.${listKeys[0]}`)} />
          </ListItem>

          <ListItem>
            <ListItemIcon>
              <ColorLensOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={t(`mission.p3.${listKeys[1]}`)} />
          </ListItem>
        </List>
      </Section>

      <Section>
        <Typography variant="h2">{t("project.h2")}</Typography>

        <Typography variant="reader" component="p">
          {t("project.p1")}
        </Typography>

        <Image
          src={logoFull}
          alt="Dharmamitra"
          style={{ width: "100%", height: "auto" }}
          priority
        />

        <Typography variant="reader" component="p">
          {t("project.p2")}
        </Typography>
        <Typography variant="reader" component="p">
          {t("project.p3")}
        </Typography>
      </Section>

      <Section>
        <Typography variant="h2" mb={3}>
          {t("collaboration.h2")}
        </Typography>

        <Typography variant="h5" component="h3">
          {t.rich("collaboration.monlam.name", {
            monlam: (chunks) => (
              <Link href="https://monlam.ai" {...linkAttrs}>
                {chunks}
              </Link>
            ),
          })}
        </Typography>
        <Typography variant="reader" component="p">
          {t("collaboration.monlam.description")}
        </Typography>

        <Typography variant="h5" component="h3" mt={4}>
          {t.rich("collaboration.kumarajiva.name", {
            kumarajiva: (chunks) => (
              <Link href="https://www.ymfz.org/" {...linkAttrs}>
                {chunks}
              </Link>
            ),
          })}
        </Typography>
        <Typography variant="reader" component="p">
          {t("collaboration.kumarajiva.description")}
        </Typography>

        <Typography variant="h5" component="h3" mt={4}>
          {t.rich("collaboration.iitk.name", {
            iitk: (chunks) => (
              <Link href="https://www.iitkgp.ac.in/" {...linkAttrs}>
                {chunks}
              </Link>
            ),
          })}
        </Typography>
        <Typography variant="reader" component="p">
          {t("collaboration.iitk.description")}
        </Typography>

        <Typography variant="h5" component="h3" mt={4}>
          {t.rich("collaboration.ai4bharat.name", {
            ai4bharat: (chunks) => (
              <Link href="https://ai4bharat.iitm.ac.in/" {...linkAttrs}>
                {chunks}
              </Link>
            ),
          })}
        </Typography>
        <Typography variant="reader" component="p">
          {t("collaboration.ai4bharat.description")}
        </Typography>
      </Section>
    </>
  )
}
