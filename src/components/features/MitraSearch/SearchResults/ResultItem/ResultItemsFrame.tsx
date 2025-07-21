import React from "react"
// import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"

import { SearchApiTypes } from "@/api"

// import ResultItemExplanation from "./explanation/ResultItemExplanation"

const frameStyles = {
  border: "1px solid",
  borderColor: "divider",
  borderRadius: "8px",
  mb: 3,
}

export default function ResultItemsFrame({
  children,
  // parallelRequest,
}: {
  children: React.ReactNode
  parallelRequest?: SearchApiTypes.RequestBody<"/explanation-parallel/">
}) {
  // if (parallelRequest) {
  //   return (
  //     <Box sx={frameStyles}>
  //       <Grid container>{children}</Grid>
  //       <Box px={2} mt={3}>
  //         <ResultItemExplanation parallelRequest={parallelRequest} />
  //       </Box>
  //     </Box>
  //   )
  // }

  return (
    <Grid container sx={frameStyles}>
      {children}
    </Grid>
  )
}
