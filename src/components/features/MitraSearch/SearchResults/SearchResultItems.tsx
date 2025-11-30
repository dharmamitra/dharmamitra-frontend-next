import Box from "@mui/material/Box"

import ResultItem, { ResultItemsFrame } from "./ResultItem"

import { SearchApiTypes } from "@/api"

type Props = {
  results: SearchApiTypes.Response<"/primary/">["results"]
}

export default function SearchResultItems({ results }: Props) {
  return (
    <Box>
      {results.map((result, index) => {
        const { lang, src_link, query: _query, summary: _summary, ...props } = result
        return (
          <ResultItemsFrame key={`parallel-result-${index}`}>
            <ResultItem
              size={{ xs: 12 }}
              language={lang}
              link={src_link}
              searchResult={result}
              // TODO: clean up
              {...props}
            />
          </ResultItemsFrame>
        )
      })}
    </Box>
  )
}
