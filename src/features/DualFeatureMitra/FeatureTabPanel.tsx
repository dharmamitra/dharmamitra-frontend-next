import Box from "@mui/material/Box"

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

export default function FeatureTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`feature-selector-tabpanel-${index}`}
      aria-labelledby={`feature-selector-tab-${index}`}
      style={{ height: "100%" }}
      {...other}
    >
      {value === index ? (
        <Box sx={{ width: "100%", height: "100%", py: 3 }}>{children}</Box>
      ) : null}
    </div>
  )
}
