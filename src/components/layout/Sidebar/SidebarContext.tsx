"use client"

import { createContext, ReactNode, useContext, useState } from "react"

import { cookieKeys } from "@/utils/constants"

type SidebarContextValue = {
  isExpanded: boolean
  isBannerVisible: boolean
  toggle: () => void
  expand: () => void
  collapse: () => void
  dismissBanner: () => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

function setCookie(key: string, value: boolean) {
  document.cookie = `${key}=${value}; path=/; max-age=31536000; SameSite=Strict`
}

type ProviderProps = {
  children: ReactNode
  initialExpanded?: boolean
  initialBannerVisible?: boolean
}

export function SidebarProvider({
  children,
  initialExpanded = true,
  initialBannerVisible = true,
}: ProviderProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded)
  const [isBannerVisible, setIsBannerVisible] = useState(initialBannerVisible)

  const toggle = () => {
    setIsExpanded((prev) => {
      const next = !prev
      setCookie(cookieKeys.sidebarExpanded, next)
      return next
    })
  }

  const expand = () => {
    setIsExpanded(true)
    setCookie(cookieKeys.sidebarExpanded, true)
  }

  const collapse = () => {
    setIsExpanded(false)
    setCookie(cookieKeys.sidebarExpanded, false)
  }

  const dismissBanner = () => {
    setCookie(cookieKeys.extensionBannerClosed, true)
    setIsBannerVisible(false)
  }

  return (
    <SidebarContext.Provider
      value={{ isExpanded, isBannerVisible, toggle, expand, collapse, dismissBanner }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebarState() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebarState must be used within a SidebarProvider")
  }
  return context
}
