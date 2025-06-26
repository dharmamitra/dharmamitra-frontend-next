import React from "react"
import { Box } from "@mui/material"

import CopyPageLink from "@/components/CopyPageLink"
import { useSearchInputParam } from "@/hooks/params"
import { useParallelSearchQuery } from "@/hooks/search/queries"

import NonResultCaseBlock from "../NonResultCaseBlock"
import ResultsHeading from "../ResultsHeading"
import ParallelCopyResults from "./ParallelCopyResults"
import ParralelSearchResultItems from "./ParralelSearchResultItems"

export default function ParallelQueryResults() {
  const [searchInput] = useSearchInputParam()
  const { data, isLoading, isError, error } = useParallelSearchQuery(searchInput)

  if (isLoading || isError || !data || !data.length) {
    return (
      <NonResultCaseBlock
        isLoading={isLoading}
        errorMessage={error?.message}
        hasData={!!data}
        noResultsFound={data?.length === 0}
      />
    )
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          gap: 1,
        }}
      >
        <ResultsHeading results={data.length} />

        <Box>
          <CopyPageLink />
          <ParallelCopyResults type="refs" results={data} />
          <ParallelCopyResults type="full" results={data} />
        </Box>
      </Box>

      <ParralelSearchResultItems results={data} />
    </>
  )
}
