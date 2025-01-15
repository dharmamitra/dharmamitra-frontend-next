import { StaticImport } from "next/dist/shared/lib/get-img-props"

import imgAarnavSrivastava from "@/assets/team/aarnav-srivastava.jpg"
import imgAminahBorgLuck from "@/assets/team/aminah.jpg"
import avatar from "@/assets/team/avatar.svg"
import imgDavidAllport from "@/assets/team/david-allport.png"
import imgDevikaGopakumar from "@/assets/team/devika-gopakumar.jpg"
import imgFrancesBelleza from "@/assets/team/frances-belleza.jpg"
import imgKayshavBhardwaj from "@/assets/team/kayshav-bhardwaj.png"
import imgKurtKeutzer from "@/assets/team/kurt-keutzer.jpg"
import imgKushBhardwaj from "@/assets/team/kush-bhardwaj.png"
import imgLakshPatel from "@/assets/team/laksh-patel.jpg"
import imgMirandaZhu from "@/assets/team/miranda-zhu.jpg"
import imgRajMehta from "@/assets/team/raj-mehta.png"
import imgRheaMehta from "@/assets/team/rhea-mehta.jpg"
import imgSaiSrinivasan from "@/assets/team/sai-srinivasan.jpg"
import imgSanjanaSrinivasan from "@/assets/team/sanjana-srinivasan.png"
import imgSebastianNehrdich from "@/assets/team/sebastian-nehrdich.jpg"
import imgShivamDewan from "@/assets/team/shivam-dewan.jpg"
import imgSiyaMehta from "@/assets/team/siya-mehta.png"
import imgSujeetJaiswal from "@/assets/team/sujeet-jaiswal.jpg"
import imgVarunRao from "@/assets/team/varun-rao.png"
import imgVladimirAngirov from "@/assets/team/vladimir-angirov.jpg"

export type Member = {
  id: string
  name: string
  roles:
    | {
        role: string
        i18nRoleKey: keyof Messages["staticContent"]["roles"]
      }[]
    | null
  image: StaticImport
}

type TeamMembers = {
  main: Member[]
  volunteers: Member[]
}

const members: TeamMembers = {
  main: [
    {
      id: crypto.randomUUID(),
      name: "Kurt Keutzer",
      roles: [{ role: "Executive Director", i18nRoleKey: "directorExecutive" }],
      image: imgKurtKeutzer,
    },
    {
      id: crypto.randomUUID(),
      name: "Sebastian Nehrdich",
      roles: [{ role: "Technical Director", i18nRoleKey: "directorTechnical" }],
      image: imgSebastianNehrdich,
    },
    {
      id: crypto.randomUUID(),
      name: "David Allport",
      roles: [
        {
          role: "Sanskrit data collection",
          i18nRoleKey: "dataCollectionSanskrit",
        },
      ],
      image: imgDavidAllport,
    },
    {
      id: crypto.randomUUID(),
      name: "Vladimir Angirov",
      roles: [
        {
          role: "Sanskrit data collection",
          i18nRoleKey: "dataCollectionSanskrit",
        },
        {
          role: "Project infrastructure",
          i18nRoleKey: "projectInfrastructure",
        },
      ],
      image: imgVladimirAngirov,
    },
    {
      id: crypto.randomUUID(),
      name: "Aminah Borg-Luck",
      roles: [
        { role: "Website development", i18nRoleKey: "websiteDevelopment" },
      ],
      image: imgAminahBorgLuck,
    },
    {
      id: crypto.randomUUID(),
      name: "Shivam Dewan",
      roles: [{ role: "Product Designer", i18nRoleKey: "productDesigner" }],
      image: imgShivamDewan,
    },
    {
      id: crypto.randomUUID(),
      name: "Jivnesh Sandhan",
      roles: [
        {
          role: "Sanskrit data collection",
          i18nRoleKey: "dataCollectionSanskrit",
        },
        {
          role: "Sanskrit NLP research",
          i18nRoleKey: "nlpResearchSanskrit",
        },
      ],
      image: avatar,
    },
    {
      id: crypto.randomUUID(),
      name: "Sujeet Jaiswal",
      roles: [
        {
          role: "Sanskrit data collection",
          i18nRoleKey: "dataCollectionSanskrit",
        },
        {
          role: "Sanskrit NLP research",
          i18nRoleKey: "nlpResearchSanskrit",
        },
      ],
      image: imgSujeetJaiswal,
    },
  ],
  volunteers: [
    {
      id: crypto.randomUUID(),
      name: "Frances Belleza",
      roles: null,
      image: imgFrancesBelleza,
    },
    {
      id: crypto.randomUUID(),
      name: "Kayshav Bhardwaj",
      roles: null,
      image: imgKayshavBhardwaj,
    },
    {
      id: crypto.randomUUID(),
      name: "Kush Bhardwaj",
      roles: null,
      image: imgKushBhardwaj,
    },
    {
      id: crypto.randomUUID(),
      name: "Aarnav Srivastava",
      roles: null,
      image: imgAarnavSrivastava,
    },
    {
      id: crypto.randomUUID(),
      name: "Rohan Sarakinti",
      roles: null,
      image: avatar,
    },
    {
      id: crypto.randomUUID(),
      name: "Varun Rao",
      roles: null,
      image: imgVarunRao,
    },
    {
      id: crypto.randomUUID(),
      name: "Devika Gopakumar",
      roles: null,
      image: imgDevikaGopakumar,
    },
    {
      id: crypto.randomUUID(),
      name: "Miranda Zhu",
      roles: null,
      image: imgMirandaZhu,
    },
    {
      id: crypto.randomUUID(),
      name: "Om Chandran",
      roles: null,
      image: avatar,
    },
    {
      id: crypto.randomUUID(),
      name: "Siya Mehta",
      roles: null,
      image: imgSiyaMehta,
    },
    {
      id: crypto.randomUUID(),
      name: "Sanjana Srinivasan",
      roles: null,
      image: imgSanjanaSrinivasan,
    },
    {
      id: crypto.randomUUID(),
      name: "Sai Srinivasan",
      roles: null,
      image: imgSaiSrinivasan,
    },
    {
      id: crypto.randomUUID(),
      name: "Rhea Mehta",
      roles: null,
      image: imgRheaMehta,
    },
    {
      id: crypto.randomUUID(),
      name: "Raj Mehta",
      roles: null,
      image: imgRajMehta,
    },
    {
      id: crypto.randomUUID(),
      name: "Daksh Parikh",
      roles: null,
      image: avatar,
    },
    {
      id: crypto.randomUUID(),
      name: "Laksh Patel",
      roles: null,
      image: imgLakshPatel,
    },
  ],
}

export default members
