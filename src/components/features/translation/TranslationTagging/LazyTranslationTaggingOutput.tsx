"use client"

import React from "react"
import { useTranslations } from "next-intl"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import useTaggingData from "@/hooks/useTaggingData"

type HandleChangeProps = {
  event:
    | React.MouseEvent<HTMLButtonElement | SVGSVGElement, MouseEvent>
    | React.KeyboardEvent<HTMLButtonElement | SVGSVGElement>
  sentenceIndex: number
}

type HandleSentenceLammaChangeProps = HandleChangeProps & {
  lemmaIndex: number
}

export default function TranslationTaggingOutput() {
  const { taggingData } = useTaggingData()
  const t = useTranslations("translation")

  const [sentenceLemmaIndecies, setSentenceLemmaIndecies] = React.useState<
    [number, number] | []
  >([])

  const [expandIndecies, setExpandIndecies] = React.useState([0])

  const handleSentenceExpansionChange = ({
    event,
    sentenceIndex,
  }: HandleChangeProps) => {
    if (
      (event.type === "keydown" &&
        (event as React.KeyboardEvent<HTMLButtonElement>).key === "Enter") ||
      event.type === "click"
    ) {
      event.preventDefault()

      if (expandIndecies.includes(sentenceIndex)) {
        setExpandIndecies(
          expandIndecies.filter((index) => index !== sentenceIndex),
        )
      } else {
        setExpandIndecies([...expandIndecies, sentenceIndex])
      }
    }
  }

  const handleSentenceLemmaChange = ({
    event,
    sentenceIndex,
    lemmaIndex,
  }: HandleSentenceLammaChangeProps) => {
    if (
      (event.type === "keydown" &&
        (event as React.KeyboardEvent<HTMLButtonElement>).key === "Enter") ||
      event.type === "click"
    ) {
      event.preventDefault()
      setSentenceLemmaIndecies([sentenceIndex, lemmaIndex])
    }
  }

  return (
    <Box
      sx={{
        marginTop: 8,
      }}
    >
      <Typography
        component="h3"
        variant="h5"
        sx={{ fontWeight: "bold", mb: 4 }}
      >
        {t("taggingHeading")}
      </Typography>

      <Box
        sx={{
          width: "100%",
          px: 3,
          py: 4,
          backgroundColor: (theme) => theme.custom.palette.panel,
        }}
      >
        <>
          {taggingData?.map((sentence, sentenceIndex) => {
            const [, selecetedLemmaIndex] = sentenceLemmaIndecies
            const sentenceLemma =
              selecetedLemmaIndex !== undefined
                ? sentence[selecetedLemmaIndex]
                : null

            return (
              <Accordion
                key={`translation-tagging-sentence-${sentenceIndex}`}
                expanded={expandIndecies.includes(sentenceIndex)}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ cursor: "pointer" }}
                      onClick={(event) =>
                        handleSentenceExpansionChange({ event, sentenceIndex })
                      }
                      onKeyDown={(event) =>
                        handleSentenceExpansionChange({ event, sentenceIndex })
                      }
                    />
                  }
                  aria-controls={`sentence-${sentenceIndex}-content`}
                  id={`sentence-${sentenceIndex}-summary`}
                  sx={{ cursor: "unset !important", py: 2 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 3,
                      mr: 3,
                    }}
                  >
                    {sentence.map((item, lemmaIndex) => {
                      return (
                        <Button
                          key={`translation-tagging-sentence-${lemmaIndex}`}
                          variant="outlined"
                          color={
                            sentenceLemmaIndecies[0] === sentenceIndex &&
                            lemmaIndex === sentenceLemmaIndecies[1]
                              ? "secondary"
                              : "primary"
                          }
                          onClick={(event) =>
                            handleSentenceLemmaChange({
                              event,
                              sentenceIndex,
                              lemmaIndex,
                            })
                          }
                          onKeyDown={(event) =>
                            handleSentenceLemmaChange({
                              event,
                              sentenceIndex,
                              lemmaIndex,
                            })
                          }
                          sx={{
                            textTransform: "none",
                            fontWeight: "bold",
                          }}
                        >
                          {item.lemma}
                        </Button>
                      )
                    })}
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <Box>{sentenceLemma?.unsandhied}</Box>
                  <Box>
                    {sentenceLemma?.meanings.map((meaning, meaningIndex) => (
                      <Typography
                        key={`translation-tagging-meaning-${meaningIndex}`}
                      >
                        {meaning}
                      </Typography>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            )
          })}
        </>
      </Box>
    </Box>
  )
}
