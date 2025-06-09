import React from "react"
import { useTranslations } from "next-intl"
import UploadFileIcon from "@mui/icons-material/UploadFile"
import { SvgIconProps } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"

type AttachFileButtonProps = {
  onClick: () => void
  disabled?: boolean
  acceptedFileTypes?: string
  color?: SvgIconProps["color"]
  fontSize?: SvgIconProps["fontSize"]
  sx?: SvgIconProps["sx"]
}

export default function AttachFileButton({
  onClick,
  disabled = false,
  acceptedFileTypes,
  color = "action",
  fontSize = "small",
  sx,
}: AttachFileButtonProps) {
  const t = useTranslations("generic")

  return (
    <Tooltip
      title={
        <span style={{ display: "block", textAlign: "center" }}>
          {disabled ? (
            <>{t("uploadDisabled")}</>
          ) : (
            <>
              {t.rich("upload", {
                fileTypes: `${acceptedFileTypes} `,
                br: () => <br />,
              })}
            </>
          )}
        </span>
      }
      placement="top"
      slotProps={{
        popper: {
          sx: {
            [`& .MuiTooltip-tooltip`]: {
              maxWidth: "none",
            },
          },
        },
      }}
    >
      <span>
        <IconButton
          aria-label={`${t.rich("upload", {
            fileTypes: `${acceptedFileTypes} `,
            br: () => "",
          })}`}
          onClick={onClick}
          disabled={disabled}
          color="inherit"
        >
          <UploadFileIcon
            color={disabled ? "disabled" : color}
            fontSize={fontSize}
            sx={sx}
          />
        </IconButton>
      </span>
    </Tooltip>
  )
}
