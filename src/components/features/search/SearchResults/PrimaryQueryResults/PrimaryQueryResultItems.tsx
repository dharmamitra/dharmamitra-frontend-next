import React from "react"
import Box from "@mui/material/Box"

import { SearchApiTypes } from "@/api"

import ResultItem, { ResultItemsFrame } from "../ResultItem"

export default function PrimarySearchResultItems({
  results,
}: {
  results: SearchApiTypes.PrimaryRresponse["results"]
}) {
  return (
    <Box>
      {results.map((result, index) => {
        const { lang, src_link, ...props } = result
        return (
          <ResultItemsFrame key={`parallel-result-${index}`}>
            <ResultItem
              xs={12}
              language={lang}
              link={src_link}
              {...props}
              isPrimaryQuery
            />
          </ResultItemsFrame>
        )
      })}
    </Box>
  )
}
