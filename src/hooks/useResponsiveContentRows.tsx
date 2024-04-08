import * as React from "react"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

const useResponsiveContentRows = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(
    theme.breakpoints.up("sm") && theme.breakpoints.down("md"),
  )

  return React.useMemo<number>(() => {
    if (isMobile) {
      return 10
    }

    if (isTablet) {
      return 8
    }

    return 14
  }, [isMobile, isTablet])
}

export default useResponsiveContentRows
