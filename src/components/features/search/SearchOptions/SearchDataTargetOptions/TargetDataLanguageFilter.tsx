/* eslint-disable */

// import React from "react"
// import { useTranslations } from "next-intl"
// import ToggleButton from "@mui/material/ToggleButton"
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

// import {
//   DataTargetLanguage,
//   primaryDataTargetLanguages,
//   SearchDataTarget,
//   tempParallelDataTargetLanguages,
// } from "@/utils/api/translation/params"

// const getOptions = (searchTarget: SearchDataTarget) => {
//   switch (searchTarget) {
//     case "primary":
//       return {
//         options: primaryDataTargetLanguages,
//         i18nKey: "search.primaryLanguages" as const,
//       }
//     case "parallel_data":
//       return {
//         options: tempParallelDataTargetLanguages,
//         i18nKey: "search.parallelLanguages" as const,
//       }
//     default:
//       return {}
//   }
// }

// type TargetDataLanguageFilterProps = {
//   isSmallScreen: boolean
//   value: DataTargetLanguage | null
//   searchTarget: SearchDataTarget
//   /* eslint-disable-next-line no-unused-vars */
//   hangleChange: (value: string | null) => void
// }

// type LanguageSelectorProps = Omit<
//   TargetDataLanguageFilterProps,
//   "searchTarget"
// > & {
//   options: DataTargetLanguage[]
//   i18nKey: "search.primaryLanguages" | "search.parallelLanguages"
// }

// const LanguageSelector = ({
//   isSmallScreen,
//   value,
//   hangleChange,
//   options,
//   i18nKey,
// }: LanguageSelectorProps) => {
//   const t = useTranslations(i18nKey)

//   return (
//     <ToggleButtonGroup
//       orientation={isSmallScreen ? "vertical" : "horizontal"}
//       color="secondary"
//       size="small"
//       value={value}
//       exclusive
//       onChange={(event, value) => hangleChange(value)}
//       aria-label="Data Source"
//     >
//       {options.map((language) => (
//         <ToggleButton key={language + "data-language-option"} value={language}>
//           {t(`${language}`)}
//         </ToggleButton>
//       ))}
//     </ToggleButtonGroup>
//   )
// }

// export default function TargetDataLanguageFilter({
//   searchTarget,
//   ...rest
// }: TargetDataLanguageFilterProps) {
//   const { options, i18nKey } = getOptions(searchTarget)

//   if (!options) return null

//   return <LanguageSelector {...rest} options={options} i18nKey={i18nKey} />
// }

export default function TargetDataLanguageFilter({
  searchTarget,
  ...rest
}: any) {
  return null
}
