import Image from "next/image"
import { useTranslations } from "next-intl"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"

import { PageShell } from "@/components/layout"

import members from "./data"

export default function Home() {
  const t = useTranslations("Team")

  return (
    <PageShell sx={{ mb: 12 }}>
      <Typography variant="h1" component="h1">
        {t("h1")}
      </Typography>

      <section style={{ marginBlockEnd: "4rem" }}>
        <Typography variant="h2" mb={4}>
          {t("present.h2")}
        </Typography>

        <Stack
          direction="row"
          spacing={4}
          rowGap={8}
          useFlexGap
          flexWrap="wrap"
        >
          {members.current.map((member) => {
            const { id, name, roles, image } = member
            return (
              <Box key={id}>
                <Image
                  src={image}
                  alt={name}
                  width={200}
                  height={200}
                  style={{ borderRadius: "50%" }}
                />

                <Typography align="center" variant="h6" component="p">
                  {name}
                </Typography>
                {roles &&
                  roles.map(({ i18nRoleKey }, index) => (
                    <Typography
                      align="center"
                      key={id + "-" + i18nRoleKey}
                      color="grey"
                    >
                      {t(`roles.${i18nRoleKey}`)}
                      {index < roles.length - 1 && ","}
                    </Typography>
                  ))}
              </Box>
            )
          })}
        </Stack>
      </section>

      <section style={{ marginBlockEnd: "4rem" }}>
        <Typography variant="h2" mb={4}>
          {t("past.h2")}
        </Typography>

        <Stack
          direction="row"
          spacing={4}
          rowGap={8}
          useFlexGap
          flexWrap="wrap"
        >
          {members.past.map((member) => {
            const { id, name, roles, image } = member
            return (
              <Box key={id}>
                <Image
                  src={image}
                  alt={name}
                  width={200}
                  height={200}
                  style={{ borderRadius: "50%" }}
                />

                <Typography align="center" variant="h6" component="p">
                  {name}
                </Typography>
                {roles &&
                  roles.map(({ i18nRoleKey }, index) => (
                    <Typography
                      align="center"
                      key={id + "-" + i18nRoleKey}
                      color="grey"
                    >
                      {t(`roles.${i18nRoleKey}`)}
                      {index < roles.length - 1 && ","}
                    </Typography>
                  ))}
              </Box>
            )
          })}
        </Stack>
      </section>
    </PageShell>
  )
}
