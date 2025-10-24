import * as React from "react"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Box, Typography } from "@mui/material"
import Grid from "@mui/material/Grid"

// import { Member as MemberType } from "@/app/[locale]/(static-pages)/team/data"
import customTheming from "@/utils/theme/config"

// TODO: Restore import
export type MemberType = {
  id: string
  name: string
  roles:
    | {
        role: string
        i18nRoleKey: keyof Messages["staticContent"]["roles"]
      }[]
    | null
  image: StaticImport
}

export function Member({ id, name, roles, image }: MemberType) {
  const t = useTranslations("staticContent")

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: customTheming.palette.soft,
          borderRadius: "14px",
          p: 2,
          pt: { xs: 6, md: 10 },
          pb: roles ? "unset" : 4,
          mt: { xs: 4, md: 10 },
          maxWidth: { xs: "380px", sm: "unset" },
          mx: { xs: "auto", sm: "unset" },
          height: roles
            ? {
                xs: "clamp(135px, 25vw, 190px)",
                sm: "clamp(155px, 20vw, 190px)",
                lg: "clamp(135px, 18vw, 190px)",
              }
            : "unset",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "68px", md: "100px" },
            height: { xs: "68px", md: "100px" },
          }}
        >
          <Image
            src={image}
            alt={name}
            style={{
              borderRadius: "50%",
              width: "100%",
              height: "100%",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" component="p">
            {name}
          </Typography>
          {roles &&
            roles.map(({ i18nRoleKey }, index) => (
              <Typography
                key={id + "-" + i18nRoleKey}
                variant="body2"
                color="text.secondary"
                align="center"
              >
                {t(`roles.${i18nRoleKey}`)}
                {index < roles.length - 1 && ","}
              </Typography>
            ))}
        </Box>
      </Box>
    </Grid>
  )
}

export default function Members({ members }: { members: MemberType[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        rowGap: { xs: 3, sm: 8 },
        columnGap: { sm: 4, lg: 5 },
        flexWrap: "wrap",
      }}
    >
      <Grid container spacing={{ xs: 3, sm: 4, lg: 5 }} sx={{ width: "100%" }}>
        {members.map((member) => (
          <Member key={member.id} {...member} />
        ))}
      </Grid>
    </Box>
  )
}
