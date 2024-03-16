import { Box, Container, Typography } from "@mui/material"

export default function Footer() {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        mt: 4,
        bgcolor: "background.paper",
        p: 6,
      }}
      component="footer"
    >
      <Container>
        <Typography variant="body2" color="text.secondary" align="center">
          Converse with over 2500 years of Buddhism.
        </Typography>
      </Container>
    </Box>
  )
}
