import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"

export default function TextSkeleton() {
  return (
    <Box
      sx={{ width: "100%" }}
      data-testid="translation-loading"
      aria-label="Loading"
    >
      {[7, 4].map((n, i) => (
        <Box key={"translation-skeleton-" + i} mb={1.5}>
          <Skeleton sx={{ animationDuration: `2s` }} />
          <Skeleton
            animation="wave"
            sx={{
              "&::after": { animationDuration: `2.${n}s` },
            }}
          />
          <Skeleton animation={false} width={`${n * 10}%`} />
        </Box>
      ))}
    </Box>
  )
}
