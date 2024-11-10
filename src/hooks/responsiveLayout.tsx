import * as React from "react"
import useMediaQuery from "@mui/material/useMediaQuery"

import { getSettingPriotiryGroups } from "@/utils"

export const useResponsiveSizes = () => {
  const isSmTablet = useMediaQuery("(min-width: 510px)")
  const isLgTablet = useMediaQuery("(min-width: 760px)")
  const isSmDesktop = useMediaQuery("(min-width: 975px)")
  const isLgDesktop = useMediaQuery("(min-width: 1260px)")

  return {
    isSmTablet,
    isLgTablet,
    isSmDesktop,
    isLgDesktop,
    isSingleColLayout: !isLgTablet,
  }
}

export const useResponsiveOptions = <T extends string>(options: T[]) => {
  const {
    isSmTablet,
    isLgTablet,
    isSmDesktop,
    isLgDesktop,
    isSingleColLayout,
  } = useResponsiveSizes()

  return React.useMemo<[T[], T[]]>(() => {
    let noOfPrimaryItems = 1
    if (isSingleColLayout && isSmTablet) noOfPrimaryItems = 2
    if (!isSingleColLayout && isLgTablet) noOfPrimaryItems = 1
    if (!isSingleColLayout && isSmDesktop) noOfPrimaryItems = 2
    if (isLgDesktop) noOfPrimaryItems = 3

    return getSettingPriotiryGroups<T>({
      setting: options,
      noOfPrimaryItems,
    })
  }, [
    options,
    isSmTablet,
    isLgTablet,
    isSmDesktop,
    isLgDesktop,
    isSingleColLayout,
  ])
}
