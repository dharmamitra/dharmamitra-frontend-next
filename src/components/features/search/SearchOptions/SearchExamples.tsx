import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useSetAtom } from "jotai"

import { triggerSearchQueryAtom } from "@/atoms"
import useSearchCommonParams from "@/hooks/search/useSearchCommonParams"
import { exampleSearchQueries } from "@/utils/constants"

type Props = {
  isVisible: boolean
}

export default function SearchExamples({ isVisible }: Props) {
  const { setSearchInput } = useSearchCommonParams()
  const setTriggerSearchQuery = useSetAtom(triggerSearchQueryAtom)

  const handleClick = React.useCallback(
    (example: string) => {
      setSearchInput(example)
      setTriggerSearchQuery(true)
    },
    [setSearchInput, setTriggerSearchQuery],
  )

  if (!isVisible) return null

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        my: 6,
        "@keyframes fadeIn": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
        animation: "fadeIn 0.6s ease-in-out",
      }}
    >
      {Array(9)
        .fill(1)
        .map((_, index) => {
          const randomIndex = Math.floor(
            Math.random() * exampleSearchQueries.length,
          )
          const example = exampleSearchQueries[randomIndex] ?? ""

          return (
            <Button
              key={`example-search-term-${index}`}
              variant="outlined"
              size="small"
              sx={{
                color: "text.secondary",
                borderColor: "grey.400",
                borderRadius: "25px",
                px: 2,
                py: 0.5,
              }}
              onClick={() => handleClick(example)}
            >
              {example}
            </Button>
          )
        })}
    </Box>
  )
}
