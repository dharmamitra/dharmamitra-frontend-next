"use client"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { grey } from "@mui/material/colors"

import useTranslationStream from "@/hooks/useTranslationStream"

export default function TranslationTaggingOutput() {
  const { taggingData } = useTranslationStream()

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          gap: 2,
          mt: 8,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: {
            xs: grey[50],
            md: "background.paper",
          },
        }}
      >
        {taggingData?.map((tag: any, index) => (
          <Typography
            key={`tagging-lemma-${tag.lemma}-${index}`}
            component={"p"}
          >
            {tag.lemma}
          </Typography>
        ))}
      </Box>
    </>
  )
}
