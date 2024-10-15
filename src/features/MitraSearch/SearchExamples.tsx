import React from "react"
import { useLocale } from "next-intl"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import { useSearchInputParam } from "@/hooks/params"
import { exampleSearchStrings } from "@/utils/searchExamples"

type Props = {
  isShown: boolean
}

export default function SearchExamples({ isShown }: Props) {
  const [search_input, setSearchInput] = useSearchInputParam()
  const locale = useLocale() as SupportedLocale

  const handleClick = React.useCallback(
    (example: string) => {
      setSearchInput(example)
    },
    [setSearchInput],
  )

  const examples = React.useMemo(() => {
    const uniqueExamples = new Set<string>()
    while (uniqueExamples.size < 9) {
      const randomIndex = Math.floor(
        Math.random() * exampleSearchStrings[locale].length,
      )
      uniqueExamples.add(exampleSearchStrings[locale][randomIndex] ?? "")
    }
    return Array.from(uniqueExamples)
  }, [locale])

  if (!isShown) return null

  return (
    <Box
      sx={{
        display: search_input ? "none" : "flex",
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
      ))}
    </Box>
  )
}
