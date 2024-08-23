import React from "react"
import { useLocale } from "next-intl"
import Box from "@mui/material/Box"

import { SearchApiTypes } from "@/api"

import ResultItem, { ResultItemsFrame } from "../ResultItem"

export default function PrimarySearchResultItems({
  results,
}: {
  results: SearchApiTypes.Response<"/primary/">["results"]
}) {
  const locale = useLocale()
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
              primaryRequest={{ locale, query, summary }}
              {...props}
            />
          </ResultItemsFrame>
        )
      })}
    </Box>
  )
}
