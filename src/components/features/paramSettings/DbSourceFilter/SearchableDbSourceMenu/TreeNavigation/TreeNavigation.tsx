import React from "react"
import { useTranslations } from "next-intl"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import { Box, IconButton, Tooltip } from "@mui/material"
import { useAtomValue } from "jotai"

import { activeDbSourceTreeAtom } from "@/atoms"

import TreeBreadcrumbs from "./TreeBreadcrumbs"

export default function TreeNavigation() {
  const activeTree = useAtomValue(activeDbSourceTreeAtom)

  const t = useTranslations()

  return (
    <Box display="flex" justifyContent="space-between" gap="0.5rem" minHeight="1.75rem" my={1}>
      <TreeBreadcrumbs />

      <Box display="flex" justifySelf="flex-end">
        <Tooltip title={t("generic.openAll")}>
          <IconButton
            aria-label={t("generic.openAll")}
            size="small"
            onClick={() => activeTree?.openAll()}
          >
            <ArrowDropDownIcon color="action" />
          </IconButton>
        </Tooltip>

        <Tooltip title={t("generic.closeAll")}>
          <IconButton
            aria-label={t("generic.closeAll")}
            size="small"
            onClick={() => activeTree?.closeAll()}
          >
            <ArrowDropDownIcon
              color="action"
              sx={{
                transform: "rotate(180deg)",
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  )
}
