import Box from "@mui/material/Box"

import CopyResults from "./CopyResults"
import NonResultCaseBlock from "./NonResultCaseBlock"
import ResultsHeading from "./ResultsHeading"
import SearchResultItems from "./SearchResultItems"

import CopyPageLink from "@/components/CopyPageLink"
import ExceptionText from "@/components/ExceptionText"
import { MAX_PRIMARY_RESULTS } from "@/components/features/MitraSearch/utils"
import { useSearchInputParam } from "@/hooks/params"
import { usePrimarySearchQuery } from "@/hooks/search/queries"

export default function SearchResults() {
  const [searchInput] = useSearchInputParam()
  const { data, isLoading, isError, error } = usePrimarySearchQuery(searchInput)

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

  if (!data) return null

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
          <CopyResults type="refs" results={data} />
          <CopyResults type="full" results={data} />
        </Box>
      </Box>

      <SearchResultItems results={data} />
      <ExceptionText
        isRendered={data.length >= MAX_PRIMARY_RESULTS}
        exceptionI18nKey="maxSearchResultsWarning"
      />
    </>
  )
}
