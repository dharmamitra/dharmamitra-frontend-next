"use client"

import React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useQuery } from "@tanstack/react-query"
import { useAtomValue } from "jotai"

import { DM_API } from "@/api"
import { triggerSearchQueryAtom } from "@/atoms"
import useInputWithUrlParam from "@/hooks/useInputWithUrlParam"
import { apiParamsNames } from "@/utils/api/params"

export default function SearchResults() {
  const { input } = useInputWithUrlParam(apiParamsNames.search.search_input)

  const triggerSearchQuery = useAtomValue(triggerSearchQueryAtom)

  const { data, isLoading, isError } = useQuery({
    queryKey: DM_API.search.makeQueryKey({ search_input: input }),
    queryFn: () => DM_API.search.call({ search_input: input }),
    enabled: triggerSearchQuery,
  })

  return (
    <Box sx={{ mt: 3 }}>
      {isLoading ? (
        <Typography component="p" variant="h5" sx={{ mt: 6 }}>
          Loading...
        </Typography>
      ) : null}
      {isError ? (
        <Typography component="p" variant="h5" sx={{ mt: 6 }}>
          Error
        </Typography>
      ) : null}
      {data ? (
        <>
          <Typography component="h3" variant="h5" sx={{ mt: 6 }}>
            Results:
          </Typography>
          <Typography sx={{ mt: 2 }}>
            {JSON.stringify(data as string)}
          </Typography>
        </>
      ) : null}
    </Box>
  )
}
