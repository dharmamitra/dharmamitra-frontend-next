import React from "react"
import Box from "@mui/material/Box"

import { SearchApiTypes } from "@/api"

import ResultItem, { ResultItemsFrame } from "../ResultItem"

export default function ParralelSearchResultItems({
  results,
}: {
  results: SearchApiTypes.ParallelRresponse["results"]
}) {
  return (
    <Box>
      {results.map((result, index) => (
        <ResultItemsFrame key={`parallel-result-${index}`}>
          <ResultItem
            xs={12}
            md={6}
            language={result.src_lang}
            title={result.src_title}
            segmentnr={result.src_segmentnr}
            link={result.src_link}
            text={[
              result.src_text.text_before,
              result.src_text.text_main,
              result.src_text.text_after,
            ].join("")}
            translation={result.tgt_text.translation}
          />
          <ResultItem
            xs={12}
            md={6}
            language={result.tgt_lang}
            title={result.tgt_title}
            segmentnr={result.tgt_segmentnr}
            link={result.tgt_link}
            text={[
              result.tgt_text.text_before,
              result.tgt_text.text_main,
              result.tgt_text.text_after,
            ].join("")}
            translation={result.tgt_text.translation}
          />
        </ResultItemsFrame>
      ))}
    </Box>
  )
}
