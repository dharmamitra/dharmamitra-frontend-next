import * as React from "react"
import useMediaQuery from "@mui/material/useMediaQuery"

import { getSettingPriotiryGroups } from "@/utils"

export const useResponsiveSizes = () => {
  const isLgDesktop = useMediaQuery("(min-width: 1395px)")

  return {
    isLgDesktop,
    isSingleColLayout: !isLgDesktop,
  }
}

export const useResponsiveOptions = <T extends string>(options: T[]) => {
  const { isLgDesktop, isSingleColLayout } = useResponsiveSizes()

  return React.useMemo<[T[], T[]]>(() => {
    let noOfPrimaryItems = 1
    if (isLgDesktop) noOfPrimaryItems = 3

    return getSettingPriotiryGroups<T>({
      setting: options,
      noOfPrimaryItems,
    })
  }, [options, isLgDesktop, isSingleColLayout])
}
