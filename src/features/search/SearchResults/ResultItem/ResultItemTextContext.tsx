import * as React from "react"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Typography from "@mui/material/Typography"

export type ResultItemTextContextProps = {
  text: string[]
  expanded: boolean
  keyPrefix: string
}

export default function ResultItemTextContext({
  text,
  expanded,
  keyPrefix,
}: ResultItemTextContextProps) {
  return (
    <Accordion
      expanded={expanded}
      sx={{
        boxShadow: "none",
        "&.MuiAccordion-root::before": {
          backgroundColor: "transparent",
        },
      }}
      disableGutters
    >
      <AccordionSummary
        expandIcon={null}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{ display: "none" }}
      ></AccordionSummary>

      <AccordionDetails sx={{ border: "none", boxShadow: "none", p: 0 }}>
        {text.map((paragraph, index) => (
          <Typography
            key={`${keyPrefix}-search-string-result-paragraph-${index}`}
            sx={{
              flexGrow: 1,
              fontSize: "1.25rem !important",
              overflowWrap: "anywhere",
              color: "grey.800",
              px: 1,
            }}
          >
            {paragraph}
          </Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}
