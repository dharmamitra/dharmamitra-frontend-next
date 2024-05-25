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
  unsandhiedIndex: number
}

export default function TranslationTaggingOutput() {
  const { taggingData } = useTaggingData()
  const t = useTranslations("translation")

  const [sentenceUnsandhiedIndecies, setSentenceUnsandhiedIndecies] =
    React.useState<[number, number] | []>([0, 0])

  const [expandIndecies, setExpandIndecies] = React.useState<number[]>([0])

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

  const handleSentenceUnsandhiedChange = ({
    event,
    sentenceIndex,
    unsandhiedIndex,
  }: HandleSentenceLammaChangeProps) => {
    if (
      (event.type === "keydown" &&
        (event as React.KeyboardEvent<HTMLButtonElement>).key === "Enter") ||
      event.type === "click"
    ) {
      event.preventDefault()
      if (!expandIndecies.includes(sentenceIndex)) {
        setExpandIndecies([...expandIndecies, sentenceIndex])
      }
      setSentenceUnsandhiedIndecies([sentenceIndex, unsandhiedIndex])
    }
  }

  if (!taggingData) return null

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
        {t("tagging.heading")}
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
            const [, selecetedUnsandhiedIndex] = sentenceUnsandhiedIndecies
            const selectedSentence =
              selecetedUnsandhiedIndex !== undefined
                ? sentence[selecetedUnsandhiedIndex]
                : null

            const { lemma, tag, meanings } = selectedSentence || {}

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
                      rowGap: 2,
                      columnGap: 0.5,
                      mr: 3,
                    }}
                  >
                    {sentence.map((item, unsandhiedIndex) => {
                      const { unsandhied } = item
                      const isSelected =
                        sentenceUnsandhiedIndecies[0] === sentenceIndex &&
                        unsandhiedIndex === sentenceUnsandhiedIndecies[1]
                      return (
                        <Button
                          key={`translation-tagging-sentence-${unsandhiedIndex}`}
                          variant={isSelected ? "contained" : "outlined"}
                          color="primary"
                          sx={{
                            mr: !unsandhied.endsWith("-") ? 3 : undefined,
                            textTransform: "none",
                            fontWeight: "bold",
                          }}
                          onClick={(event) =>
                            handleSentenceUnsandhiedChange({
                              event,
                              sentenceIndex,
                              unsandhiedIndex,
                            })
                          }
                          onKeyDown={(event) =>
                            handleSentenceUnsandhiedChange({
                              event,
                              sentenceIndex,
                              unsandhiedIndex,
                            })
                          }
                        >
                          {unsandhied}
                        </Button>
                      )
                    })}
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography mb={1}>
                    <Typography fontWeight={600} component="span">
                      {t("tagging.lemma")}:{" "}
                    </Typography>
                    {lemma}
                  </Typography>
                  <Typography mb={1}>
                    <Typography fontWeight={600} component="span">
                      {t("tagging.tag")}:{" "}
                    </Typography>
                    {tag}
                  </Typography>
                  <Box>
                    <Typography fontWeight={600} component="span">
                      {t("tagging.meanings")}:
                    </Typography>
                    <Box component="ul" mt={1}>
                      {meanings?.map((meaning, meaningIndex) => (
                        <Typography
                          key={`translation-tagging-meaning-${meaningIndex}`}
                          component="li"
                        >
                          {meaning}
                        </Typography>
                      ))}
                    </Box>
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
