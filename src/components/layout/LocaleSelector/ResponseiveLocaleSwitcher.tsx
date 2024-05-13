"use client"

import React, { ReactNode } from "react"

import MobileLocaleSwitcher from "./MobileLocaleSwitcher"

export type LocaleSwitcherProps = {
  children: ReactNode
  defaultValue: string
  label: string
}

// TODO: Refactor
const ResponsiveLocaleSwitcher = (props: LocaleSwitcherProps) => {
  return <MobileLocaleSwitcher {...props} />
}

export default ResponsiveLocaleSwitcher
