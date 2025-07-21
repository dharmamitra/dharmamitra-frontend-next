import React from "react"
import Box from "@mui/material/Box"

import { SearchApiTypes } from "@/api"

import ResultItem, { ResultItemsFrame } from "../ResultItem"

type Props = {
  results: SearchApiTypes.Response<"/primary/">["results"]
}

export default function PrimarySearchResultItems({ results }: Props) {
  return (
    <Box>
      {results.map((result, index) => {
        const { lang, src_link, query, summary, ...props } = result
        return (
          <ResultItemsFrame key={`parallel-result-${index}`}>
            <ResultItem
              size={{ xs: 12 }}
              language={lang}
              link={src_link}
              primarySearchResult={result}
              // TODO: clean up
              {...props}
            />
          </ResultItemsFrame>
        )
      })}
    </Box>
  )
}
