"use client"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import useTaggingData from "@/hooks/useTaggingData"

export default function TranslationTaggingOutput() {
  const { taggingData } = useTaggingData()

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
        Grammatical analysis
      </Typography>

      <Box
        sx={{
          width: "100%",
          px: 3,
          py: 4,
          backgroundColor: (theme) => theme.custom.palette.panel,
        }}
      >
        {taggingData?.map((sentences, dataIndex) => {
          return (
            <Box
              key={`translation-tagging-data-${dataIndex}`}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              {sentences.map((sentence, sentenceIndex) => {
                const { lemma } = sentence
                return (
                  <Box
                    key={`translation-tagging-sentence-${sentenceIndex}`}
                    // sx={{
                    //   display: "flex",
                    //   flexDirection: "column",
                    //   width: "100%",
                    //   height: "100%",
                    //   gap: 2,
                    // }}
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
    </Box>
  )
}
