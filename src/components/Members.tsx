import * as React from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { Box, Typography } from "@mui/material"

import { Member as MemberType } from "@/app/[locale]/team/@dharmamitra/data"

export function Member({ id, name, roles, image }: MemberType) {
  // TODO: Generalize (this should not be specific to dharmamitra)
  const t = useTranslations("Team.dharmamitra")

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { sm: "column" },
        alignItems: "center",
        width: { xs: "100%", sm: "45%", md: "unset" },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "100px", sm: "225px", md: "200px" },
          height: { xs: "100px", sm: "225px", md: "200px" },
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
          pl: 2,
          alignItems: { sm: "center" },
        }}
      >
        <Typography variant="h6" component="p">
          {name}
        </Typography>
        {roles &&
          roles.map(({ i18nRoleKey }, index) => (
            <Typography key={id + "-" + i18nRoleKey} color="text.secondary">
              {t(`roles.${i18nRoleKey}`)}
              {index < roles.length - 1 && ","}
            </Typography>
          ))}
      </Box>
    </Box>
  )
}

export default function Members({ members }: { members: MemberType[] }) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        rowGap: { xs: 3, sm: 8 },
        columnGap: { sm: 4, lg: 8 },
        flexWrap: "wrap",
      }}
    >
      {members.map((member) => (
        <Member key={member.id} {...member} />
      ))}
    </Box>
  )
}
