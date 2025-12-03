import AlternateEmailIcon from "@mui/icons-material/AlternateEmail"
import FacebookIcon from "@mui/icons-material/Facebook"
import GitHubIcon from "@mui/icons-material/GitHub"
import XIcon from "@mui/icons-material/X"
import YouTubeIcon from "@mui/icons-material/YouTube"
import { Box, IconButton, SxProps } from "@mui/material"

import { linkAttrs } from "@/utils/constants"

const { color, ...attrs } = linkAttrs
const URLS = {
  email: "mailto:dharmamitra.project@gmail.com",
  github: "https://github.com/dharmamitra",
  youtube: "https://www.youtube.com/@dharmamitra_ucb",
  x: "https://x.com/dharmamitra_ucb",
  facebook: "https://www.facebook.com/people/Dharmamitra-Project/61578013388240/",
}

export const Socials = ({ sx }: { sx?: SxProps }) => {
  return (
    <Box sx={{ display: "flex", gap: 1, ...sx }}>
      <IconButton href={URLS.email} {...attrs}>
        <AlternateEmailIcon sx={{ fontSize: 22 }} />
      </IconButton>
      <IconButton href={URLS.github} {...attrs}>
        <GitHubIcon sx={{ fontSize: 22 }} />
      </IconButton>
      <IconButton href={URLS.youtube} {...attrs}>
        <YouTubeIcon sx={{ fontSize: 22 }} />
      </IconButton>
      <IconButton href={URLS.x} {...attrs}>
        <XIcon sx={{ fontSize: 22 }} />
      </IconButton>
      <IconButton href={URLS.facebook} {...attrs}>
        <FacebookIcon sx={{ fontSize: 22 }} />
      </IconButton>
    </Box>
  )
}
