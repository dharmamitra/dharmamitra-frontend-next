import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"

export default function ScrollToTopButton({
  scrollMarkerInView,
}: {
  scrollMarkerInView: boolean
}) {
  return (
    <Box
      sx={{
        display: scrollMarkerInView ? "none" : "flex",
        position: { xs: "fixed", lg: "sticky" },
        bottom: "1.5rem",
        right: { xs: "1.5rem", lg: 0 },
        zIndex: 1000,
        justifyContent: "flex-end",
        transition: "display 1.5s ease-in-out",
        "@keyframes fadeIn": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <IconButton
        onClick={() =>
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
          })
        }
        aria-label="go back to top"
        sx={{
          backgroundColor: "white",
          border: "2px solid",
          borderColor: "divider",
        }}
      >
        <ArrowForwardIosIcon sx={{ transform: "rotate(-90deg)" }} />
      </IconButton>
    </Box>
  )
}
