"use client"

import Box from "@mui/material/Box"
import { grey } from "@mui/material/colors"
import Typography from "@mui/material/Typography"

import useTaggingData from "@/hooks/useTaggingData"

export default function TranslationTaggingOutput() {
  const { taggingData } = useTaggingData()

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: 8,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      {taggingData?.map((sentences, dataIndex) => {
        return (
          <Box
            key={`translation-tagging-data-${dataIndex}`}
            sx={{
              display: "flex",
              gap: 2,
              mt: 8,
              backgroundColor: {
                xs: grey[50],
                md: "background.paper",
              },
            }}
          >
            {sentences.map((sentence, sentenceIndex) => {
              const { lemma } = sentence
              return (
                <Box
                  key={`translation-tagging-sentence-${sentenceIndex}`}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    gap: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    {lemma}
                  </Typography>
                </Box>
              )
            })}
          </Box>
        )
      })}
    </Box>
  )
}
