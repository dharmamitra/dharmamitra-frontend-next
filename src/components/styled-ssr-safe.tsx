import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { FormControlLabel, FormControlLabelProps, Radio } from "@mui/material"

import customTheming from "@/utils/theme/config"

/**
 * COMMON COMPONENT STYLES
 *
 */

export const tabsStyles = {
  borderRadius: "50px",
  backgroundColor: "#eeeeee",
  "& button": {
    minHeight: "48px",
    maxHeight: "48px",
    margin: "8px",
    borderRadius: "50px",
    border: "3px solid transparent",
    transition:
      "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
  },
  minWidth: "210px",
  width: "fit-content",
  marginInline: "auto",
  "& button.Mui-selected": {
    backgroundColor: "#fff",
    boxShadow: "0px 4px 4px 0px #0000001C",
    transition:
      "box-shadow 0.3s ease-in-out, background-color 0.1s ease-in-out",
    color: customTheming.baseColors.secondary,
  },
  "*": {
    animation: "none !important",
  },
}

export const tooltipEnterStyles = {
  fontSize: "1.1rem",
  lineHeight: 0.75,
  paddingBottom: "0.1rem",
  verticalAlign: "middle",
}

export const warningBgFactory = 0.1

export const flatRadioGroupStyles = {
  position: "relative",
  display: "flex",
  gap: 2,
  borderRadius: "8px",
  padding: "8px 0 8px 24px",
  marginInline: "-16px 8px",
  bgColor: "pink",
}

export const selectedOptionsStyles = {
  textDecoration: "underline",
  textDecorationThickness: "3px",
  textUnderlineOffset: "8px",
  textDecorationColor: "currentColor",
}

export const secondaryOptionsInputStyles = {
  position: "relative",
  zIndex: 2,
  pl: "0 !important",
  pr: 1,
}

/**
 * SSR-SAFE STYLED COMPONENTS
 *
 */

export const VisuallyHiddenRadio = ({ ...props }) => (
  <Radio
    {...props}
    style={{
      position: "absolute",
      left: "-10000px",
      top: "auto",
      width: "1px",
      height: "1px",
      overflow: "hidden",
    }}
  />
)

export const CustomFormControlLabel = ({
  checked,
  ...props
}: FormControlLabelProps & { checked?: boolean }) => (
  <FormControlLabel
    {...props}
    sx={{
      ...(checked && {
        ".MuiFormControlLabel-label": {
          color: customTheming.baseColors.secondary,
          ...selectedOptionsStyles,
        },
      }),
    }}
  />
)

export const SecondaryOptionsButtonIcon = () => (
  <KeyboardArrowDownIcon
    style={{
      position: "absolute",
      right: 0,
      color: "gray",
    }}
  />
)
