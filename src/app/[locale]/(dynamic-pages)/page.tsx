import { Typography } from "@mui/material"
import visuallyHidden from "@mui/utils/visuallyHidden"

import MultiFeatureMitra from "@/components/features/MultiFeatureMitra"
import PageContentFrame from "@/components/layout/PageContentFrame"
import StorageCheck from "@/components/StorageCheck"

export default function HomePage() {
  return (
    <>
      <StorageCheck />
      <PageContentFrame maxWidth="xl" sx={{ mb: { xs: 6, md: 14 } }}>
        <Typography component="h1" sx={visuallyHidden}>
          Dharmamitra
        </Typography>
        <MultiFeatureMitra />
      </PageContentFrame>
    </>
  )
}
