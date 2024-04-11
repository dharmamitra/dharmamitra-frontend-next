import * as React from "react"
import useMediaQuery from "@mui/material/useMediaQuery"

import { getSettingPriotiryGroups } from "@/utils/ui"

export const useResponsiveOptions = <T extends string[]>(options: T) => {
  const isMobile = useMediaQuery("(max-width: 510px)")
  const isTablet = useMediaQuery("(min-width: 900px) and (max-width: 1100px)")

  return React.useMemo<[string[], string[]]>(() => {
    const noOfPrimaryItems = isMobile || isTablet ? 1 : 3

    return getSettingPriotiryGroups({
      setting: options,
      noOfPrimaryItems,
    })
  }, [isMobile, isTablet, options])
}
