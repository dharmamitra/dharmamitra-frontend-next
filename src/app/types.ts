import { ReactNode } from "react"

import { BUILD_VARIANTS } from "@/config/constants"
import { SUPPORTED_LOCALES } from "@/i18n"

import messages from "../../messages/en.json"

export type { Metadata } from "next"

export type DefaultPageParams = {
  params: Promise<{
    locale: SupportedLocale
  }>
}

export type NewsPostParams = {
  params: Promise<{
    locale: SupportedLocale
    slug: string
  }>
}

export type UnsupportedNewsPostParams = {
  params: Promise<{
    locale: SupportedLocale
    unsupported: string
  }>
}

export type DefaultPageProps = {
  children: ReactNode
} & DefaultPageParams

/**
 * correspond to parallel sub-directories (@variant/) in app route directories
 */
export type PageVariants = Partial<Record<BuildVariant, ReactNode>>

// Modified to be more explicit about layout props
export type ParallelVariantLayoutProps = {
  children: ReactNode
  params: Promise<{ locale: SupportedLocale }>
} & PageVariants

// Global types that are used throughout the application
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]
export type BuildVariant = (typeof BUILD_VARIANTS)[number]
export type Messages = typeof messages

// Re-export for convenience
export { BUILD_VARIANTS, SUPPORTED_LOCALES }
