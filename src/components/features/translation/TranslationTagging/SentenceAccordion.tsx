"use client"

import React from "react"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { alpha } from "@mui/material"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import { DMApi } from "@/utils/api"

import SentenceAnalysis from "./SentenceAnalysis"

type Props = DMApi.Schema["Sentence"] & {
  sentenceIndex?: number
}

export default function SentenceAccordion({
  sentence,
  grammatical_analysis: grammaticalAnalysis,
  sentenceIndex = 0,
}: Props) {
  const [selectedUnsandhiedIndex, setSelectedUnsandhiedIndex] =
    React.useState<number>(0)

  const selectedUnsandhied = grammaticalAnalysis[selectedUnsandhiedIndex]

  const { lemma, tag, meanings } = selectedUnsandhied ?? {}

  return (
    <Accordion
      key={`translation-tagging-sentence-${sentenceIndex}`}
      defaultExpanded={sentenceIndex === 0}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`sentence-${sentenceIndex}-content`}
        id={`sentence-${sentenceIndex}-summary`}
        style={{ userSelect: "text" }}
      >
        <Typography variant="body2">{sentence}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            rowGap: 2,
            columnGap: 0.5,
            mr: 3,
            mb: 3,
          }}
        >
          {grammaticalAnalysis.map((item, unsandhiedIndex) => {
            const isSelected = unsandhiedIndex === selectedUnsandhiedIndex
            return (
              <Button
                key={`translation-tagging-sentence-${unsandhiedIndex}`}
                variant="outlined"
                color="secondary"
                sx={(theme) => ({
                  mr: !item.unsandhied.endsWith("-") ? 3 : undefined,
                  textTransform: "none",
                  backgroundColor: isSelected
                    ? alpha(theme.palette.secondary.main, 0.15)
                    : undefined,
                  "&:hover": {
                    backgroundColor: isSelected
                      ? alpha(theme.palette.secondary.main, 0.15)
                      : undefined,
                  },
                })}
                onClick={() => setSelectedUnsandhiedIndex(unsandhiedIndex)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setSelectedUnsandhiedIndex(unsandhiedIndex)
                  }
                }}
              >
                {item.unsandhied}
              </Button>
            )
          })}
        </Box>
        {lemma ? (
          <SentenceAnalysis lemma={lemma} tag={tag!} meanings={meanings!} />
        ) : null}
      </AccordionDetails>
    </Accordion>
  )
}
