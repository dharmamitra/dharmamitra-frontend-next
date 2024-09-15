import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import ResultItemTextContext from "./ResultItemTextContext"

export type ResultItemTextProps = {
  text: {
    hasMore: boolean
    before: string[]
    main: string[]
    after: string[]
  }
  isTextExpanded: boolean
}

export default function ResultItemText({
  text,
  isTextExpanded,
}: ResultItemTextProps) {
  return (
    <Box>
      <ResultItemTextContext
        keyPrefix="before"
        text={text.before}
        expanded={isTextExpanded}
      />

      <Box sx={{ display: "flex" }}>
        {text.hasMore && !isTextExpanded ? <Typography>...</Typography> : null}
        <Box>
          {text.main.map((paragraph, index) => (
            <Typography
              key={`main-search-string-result-paragraph-${index}`}
              sx={{
                flexGrow: 1,
                fontSize: "1.25rem !important",
                overflowWrap: "anywhere",
                px: 1,
              }}
            >
              <strong>{paragraph}</strong>
            </Typography>
          ))}
        </Box>
        {text.hasMore && !isTextExpanded ? <Typography>...</Typography> : null}
      </Box>

      <ResultItemTextContext
        keyPrefix="after"
        text={text.after}
        expanded={isTextExpanded}
      />
    </Box>
  )
}
