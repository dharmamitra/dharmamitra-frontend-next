import type { JSX } from "react"
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined"
import FindInPageOutlinedIcon from "@mui/icons-material/FindInPageOutlined"
import TranslateIcon from "@mui/icons-material/Translate"

import ai4bharatLogoFull from "@/assets/logos/ai4bharat.svg"
import iitkgpLogoFull from "@/assets/logos/iitkgp.svg"
import kumarajivaLogoFull from "@/assets/logos/kumarajiva.svg"
import monlamLogoFull from "@/assets/logos/monlam.svg"
import tsadraLogoFull from "@/assets/logos/tsadra-1x1.png"

type RoadmapItemKey = keyof Messages["About"]["dharmamitra"]["about"]["roadmap"]

type DMAbouPageData = {
  features: {
    i18nKey: keyof Messages["About"]["dharmamitra"]["about"]["features"]
    icon: JSX.Element
  }[]
  collaborators: {
    i18nKey: keyof Messages["About"]["dharmamitra"]["collaboration"]["collaborators"]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    logo: { src: any; alt: string }
    url: string
  }[]
  roadmapItemKeys: RoadmapItemKey[]
}

const data: DMAbouPageData = {
  features: [
    {
      i18nKey: "auto-translation",
      icon: <TranslateIcon color="secondary" sx={{ strokeWidth: 0.5 }} />,
    },
    {
      i18nKey: "semantic-search",
      icon: <FindInPageOutlinedIcon color="secondary" />,
    },
    {
      i18nKey: "toolkit",
      icon: <AutoFixHighOutlinedIcon color="secondary" />,
    },
  ],
  roadmapItemKeys: ["mandala", "art"],
  collaborators: [
    {
      i18nKey: "tsadra",
      logo: { src: tsadraLogoFull, alt: "Tsadra logo" },
      url: "https://tsadra.org/",
    },
    {
      i18nKey: "monlam",
      logo: { src: monlamLogoFull, alt: "Monlam AI logo" },
      url: "https://monlam.ai/",
    },
    {
      i18nKey: "kumarajiva",
      logo: { src: kumarajivaLogoFull, alt: "Kumarajiva logo" },
      url: "https://www.ymfz.org/",
    },
    {
      i18nKey: "iitk",
      logo: { src: iitkgpLogoFull, alt: "IIT-KGP logo" },
      url: "https://iitkgp.ac.in/",
    },
    {
      i18nKey: "ai4bharat",
      logo: { src: ai4bharatLogoFull, alt: "AI4Bharat logo" },
      url: "https://ai4bharat.iitm.ac.in/",
    },
  ],
}

export default data
