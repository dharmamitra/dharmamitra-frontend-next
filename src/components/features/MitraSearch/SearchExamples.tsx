import React from "react"
import { useLocale } from "next-intl"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import { useSearchInputParam } from "@/hooks/params"
import { usePrimarySearchQuery } from "@/hooks/search/queries"
import { exampleSearchStrings } from "@/utils/searchExamples"

type Props = {
  isShown: boolean
}

function SearchExampleButton({ example }: { example: string }) {
  const { refetch } = usePrimarySearchQuery(example)
  const [, setSearchInput] = useSearchInputParam()

  const handleClick = React.useCallback(
    (example: string) => {
      setSearchInput(example)
      refetch()
    },
    [setSearchInput, refetch],
  )

  return (
    <Button
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
}

export default function SearchExamples({ isShown }: Props) {
  const [search_input] = useSearchInputParam()
  const locale = useLocale()

  const examples = React.useMemo(() => {
    const uniqueExamples = new Set<string>()
    while (uniqueExamples.size < 7) {
      const randomIndex = Math.floor(Math.random() * exampleSearchStrings[locale].length)
      uniqueExamples.add(exampleSearchStrings[locale][randomIndex] ?? "")
    }
    return Array.from(uniqueExamples)
  }, [locale])

  if (!isShown || search_input) return null

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
        transition: "display 2s ease-in-out",
      }}
    >
      {examples.map((example, index) => (
        <SearchExampleButton key={`example-search-term-${index}`} example={example} />
      ))}
    </Box>
  )
}
