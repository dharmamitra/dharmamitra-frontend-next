import React from "react"
import Box from "@mui/material/Box"
import Grid, { Grid2Props } from "@mui/material/Grid2"

import { SearchApiTypes } from "@/api"
import { getParagraphsFromString } from "@/utils/api/stream"

import ResultItemExplanation from "./explanation/ResultItemExplanation"
import ResultItemHeader from "./ResultItemHeader"
import ResultItemText from "./ResultItemText"

type ResultItemProps = {
  language: string
  segmentnr: string
  title: string
  link: string
  text: SearchApiTypes.Response<"/primary/">["results"][0]["text"]
  text_new?: SearchApiTypes.Response<"/primary/">["results"][0]["text_new"] // TODO: remove
  primaryRequest?: SearchApiTypes.RequestBody<"/explanation/">
  parallelRequest?: SearchApiTypes.RequestBody<"/explanation-parallel/">
  isParallel?: boolean
  query?: string
  summary?: string
  size: Grid2Props["size"]
}

function ResultItem({
  language,
  title,
  link,
  segmentnr,
  text,
  text_new,
  primaryRequest,
  parallelRequest,
  isParallel,
  size,
}: ResultItemProps) {
  const fullResultContentRef = React.useRef<HTMLDivElement>(null)

  const parsedText = React.useMemo(() => {
    if (text_new) {
      const textContent = {
        before: getParagraphsFromString(text_new.text_before),
        main: getParagraphsFromString(text_new.text_main),
        after: getParagraphsFromString(text_new.text_after),
      }

      return {
        ...textContent,
        hasMore: textContent.before.length > 0 || textContent.after.length > 0,
      }
    }

    return {
      before: [],
      main: getParagraphsFromString(text),
      after: [],
      hasMore: false,
    }
  }, [text, text_new])

  const [isTextExpanded, setIsTextExpanded] = React.useState<boolean>(false)

  return (
    <Grid size={size} ref={fullResultContentRef}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          m: 1.25,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            columnGap: 2,
            rowGap: 1,
            ...(isParallel && {
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "8px",
            }),
          }}
        >
          <ResultItemHeader
            language={language}
            title={title}
            link={link}
            segmentnr={segmentnr}
            fullResultContentRef={fullResultContentRef}
            hasMoreText={parsedText.hasMore}
            isTextExpanded={isTextExpanded}
            setIsTextExpanded={setIsTextExpanded}
          />

          <ResultItemText text={parsedText} isTextExpanded={isTextExpanded} />
        </Box>

        <ResultItemExplanation
          isRendered={!!primaryRequest || !!parallelRequest}
          primaryRequest={primaryRequest}
          parallelRequest={parallelRequest}
        />
      </Box>
    </Grid>
  )
}

export default React.memo(ResultItem)
