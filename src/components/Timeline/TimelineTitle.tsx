import { Typography } from "@mui/material"

import LocalLink from "@/components/LocalLink"

type TimelineTitleProps = {
  title: string
  slug?: string
  content?: React.ReactNode | null
}

export default function TimelineTitle({
  title,
  slug,
  content,
}: TimelineTitleProps) {
  const titleStyles = {
    fontSize: { xs: "1.5rem", md: "2rem" },
    mb: 0,
  }

  if (content && slug) {
    return (
      <LocalLink
        href={`/news/${slug}`}
        sx={{
          textDecoration: "none",
          "&:hover": {
            "& .MuiTypography-h2": {
              color: "primary.main",
            },
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            ...titleStyles,
            transition: "color 0.2s",
          }}
        >
          {title}
        </Typography>
      </LocalLink>
    )
  }

  return (
    <Typography variant="h2" sx={titleStyles}>
      {title}
    </Typography>
  )
}
