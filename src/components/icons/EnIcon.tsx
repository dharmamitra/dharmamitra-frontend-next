// src: https://icon-sets.iconify.design/icon-park-outline/english/
import type { SVGProps } from "react"
import React from "react"

type Props = {
  color?: string
  size?: number
} & SVGProps<SVGSVGElement>

export default function IconParkOutlineEnglish({
  color = "currentColor",
  size = 1,
  ...props
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size * 36}
      height={size * 36}
      viewBox="0 0 48 48"
      {...props}
    >
      <g
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
      >
        <rect width={36} height={36} x={6} y={6} rx={3}></rect>
        <path d="M13 31V17h8m-8 7h7.5M13 31h7.5m5.5 0V19m0 12v-6.5a4.5 4.5 0 0 1 4.5-4.5v0a4.5 4.5 0 0 1 4.5 4.5V31"></path>
      </g>
    </svg>
  )
}
