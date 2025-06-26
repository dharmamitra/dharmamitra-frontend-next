import React from "react"
import { useLocale } from "next-intl"
import Box from "@mui/material/Box"

import { SearchApiTypes } from "@/api"

import ResultItem, { ResultItemsFrame } from "../ResultItem"

export default function ParralelSearchResultItems({
  results,
}: {
  results: SearchApiTypes.Response<"/parallel/">["results"]
}) {
  const locale = useLocale()
  return (
    <Box>
      {results.map((result, index) => {
        const {
          query,
          src_segmentnr,
          src_lang,
          src_title,
          src_link,
          src_text,
          tgt_segmentnr,
          tgt_lang,
          tgt_title,
          tgt_link,
          tgt_text,
        } = result

        const sourceText = src_text.text_before + src_text.text_main + src_text.text_after

        const targetText = tgt_text.text_before + tgt_text.text_main + tgt_text.text_after

        return (
          <Box key={`parallel-result-${index}`}>
            <ResultItemsFrame
              parallelRequest={{
                query,
                src_text: sourceText,
                tgt_text: targetText,
                src_translation: src_text.translation,
                tgt_translation: tgt_text.translation,
                locale,
              }}
            >
              <ResultItem
                size={{ xs: 12, md: 6 }}
                language={src_lang}
                title={src_title}
                segmentnr={src_segmentnr}
                link={src_link}
                text={sourceText}
                isParallel
              />
              <ResultItem
                size={{ xs: 12, md: 6 }}
                language={tgt_lang}
                title={tgt_title}
                segmentnr={tgt_segmentnr}
                link={tgt_link}
                text={targetText}
                isParallel
              />
            </ResultItemsFrame>
          </Box>
        )
      })}
    </Box>
  )
}
