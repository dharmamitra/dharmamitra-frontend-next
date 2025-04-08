// src: https://www.svgrepo.com/svg/502883/upload-desktop
import type { SVGProps } from "react"
import React from "react"

type Props = {
  color?: string
  size?: number
} & SVGProps<SVGSVGElement>

export default function UploadIcon({
  color = "#e0e0e0",
  size = 1,
  ...props
}: Props) {
  return (
    <svg
      width={size * 75}
      height={size * 75}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="bgCarrier" strokeWidth="0" />

      <g id="tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

      <g id="iconCarrier">
        <path
          d="M12 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H18C19.1046 16 20 15.1046 20 14V12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 9V3M17.5 3L15 5.5M17.5 3L20 5.5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16V20"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 20H16"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
