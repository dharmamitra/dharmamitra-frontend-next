import { useTranslations } from "next-intl"
import { FormControlLabel, Radio, styled } from "@mui/material"

export const CustomFormControlLabel = styled(FormControlLabel)(
  ({ theme, checked }) => ({
    padding: "4px 12px",
    margin: "0 !important",
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: "#f7f7f7",
    border: `1px solid #e0e0e0`,
    transition:
      "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
    ...(checked && {
      backgroundColor: "white",
      border: `1px solid ${theme.palette.secondary.main}`,
      boxShadow: "0px 6px 6px 0px #cccccc1C",
    }),

    ".MuiFormControlLabel-label": {
      fontSize: "1rem",
      ...(checked && {
        color: theme.palette.secondary.main,
      }),
    },
  }),
)

export const VisuallyHiddenRadio = styled(Radio)({
  position: "absolute",
  left: "-10000px",
  top: "auto",
  width: "1px",
  height: "1px",
  overflow: "hidden",
})

export default function RadioOptionButtonGroup({
  i18nKey,
  option,
  isSelected,
}: {
  i18nKey: "models" | "grammar"
  option: string
  isSelected: boolean
}) {
  const t = useTranslations(`translation.${i18nKey}`)

  return (
    <CustomFormControlLabel
      value={option}
      control={
        <VisuallyHiddenRadio
          id={`${option}-${i18nKey}-option`}
          data-testid={`${option}-${i18nKey}-option`}
        />
      }
      // TODO: remove casting on enpoint update
      label={t(option as keyof Messages["translation"][typeof i18nKey])}
      checked={isSelected}
    />
  )
}
