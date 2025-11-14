import React from "react"
import { useTranslations } from "next-intl"
import Tooltip from "@mui/material/Tooltip"

import { tooltipEnterStyles } from "@/components/styled-ssr-safe"

type TriggerQueryButtonProps = {
  children: React.ReactNode
}

export default function TriggerTooltip({ children }: TriggerQueryButtonProps) {
  const t = useTranslations()
  return (
    <>
      <Tooltip
        title={
          <span>
            {`${t("search.search")}`} (Ctrl +<span style={tooltipEnterStyles}>↵</span>)
          </span>
        }
        placement="top"
        enterDelay={1000}
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [-24, 0],
                },
              },
            ],
          },
        }}
      >
        <span>{children}</span>
      </Tooltip>
    </>
  )
}
