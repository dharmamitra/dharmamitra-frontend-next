import React from "react"
import { useTranslations } from "next-intl"
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined"
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess"
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore"
import { IconButton } from "@mui/material"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import CopyText from "@/components/CopyTextButton"
import { defaultSourceLanguage } from "@/utils/api/search/params"
import { sourceLangColors } from "@/utils/constants"
import { getValidSourceLanguage } from "@/utils/validators"

type ResultItemHeaderProps = {
  language: string
  segmentnr: string
  title: string
  link: string
  fullResultContentRef: React.RefObject<HTMLDivElement | null>
  hasMoreText: boolean
  isTextExpanded: boolean
  setIsTextExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ResultItemHeader({
  language,
  title,
  link,
  segmentnr,
  fullResultContentRef,
  hasMoreText,
  isTextExpanded,
  setIsTextExpanded,
}: ResultItemHeaderProps) {
  const t = useTranslations()
  const headerContentRef = React.useRef<HTMLDivElement>(null)

  const sourceLangCode = getValidSourceLanguage(language)

  return (
    <Box
      sx={{
        position: isTextExpanded ? "sticky" : undefined,
        top: "6rem",
        zIndex: 1,
        display: "flex",
        flexDirection: { xs: "column-reverse", sm: "row" },
        justifyContent: "space-between",
        alignItems: "flex-start",
        bgcolor: "grey.200",
        p: 1,
        gap: 1,
        borderRadius: "4px",
      }}
    >
      <div ref={headerContentRef}>
        <Typography
          variant="subtitle1"
          component="h3"
          p="0"
          color="grey.800"
          sx={{
            overflowWrap: "anywhere",
            lineHeight: "1.25",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
          title={title.length > 115 ? title : undefined}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="grey.900"
          component="a"
          href={link}
          target="_blank"
          rel="noreferrer"
          sx={{
            "&:hover": { textDecoration: "none" },
          }}
        >
          {segmentnr}
        </Typography>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row-reverse", sm: "row" },
          alignItems: "center",
        }}
      >
        {hasMoreText ? (
          <Tooltip
            title={isTextExpanded ? t("search.collapseText") : t("search.expandText")}
            placement="top"
          >
            <IconButton
              size="small"
              sx={{ p: 1 }}
              onClick={() => setIsTextExpanded((prev) => !prev)}
            >
              {isTextExpanded ? (
                <UnfoldLessIcon fontSize="small" />
              ) : (
                <UnfoldMoreIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        ) : null}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: { xs: 1.5, sm: 0 },
            mr: { sm: 1.5 },
          }}
        >
          <CopyText
            contentRef={headerContentRef}
            tooltip={t("generic.copyRef")}
            ariaLabel={t("generic.copyRef")}
            color="action"
          />
          <CopyText
            contentRef={fullResultContentRef}
            tooltip={t("generic.copyAll")}
            ariaLabel={t("generic.copyAll")}
            icon={<FeedOutlinedIcon color="action" />}
          />
        </Box>

        {sourceLangCode !== defaultSourceLanguage ? (
          <Chip
            label={t(`search.commonParams.filterLanguages.${sourceLangCode}`)}
            variant="filled"
            sx={{
              bgcolor: sourceLangColors[sourceLangCode],
              color: "white",
              fontWeight: 500,
            }}
            size="small"
          />
        ) : null}
      </Box>
    </Box>
  )
}
