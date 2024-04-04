import { FormControlLabel, Radio, styled } from "@mui/material"

export const VisuallyHiddenRadio = styled(Radio)({
  position: "absolute",
  left: "-10000px",
  top: "auto",
  width: "1px",
  height: "1px",
  overflow: "hidden",
})

export const CustomFormControlLabel = styled(FormControlLabel)(
  ({ theme, checked }) => ({
    paddingInline: theme.spacing(1),
    ".MuiFormControlLabel-label": checked && {
      textDecoration: "underline",
      color: theme.palette.primary.main,
    },
  }),
)
