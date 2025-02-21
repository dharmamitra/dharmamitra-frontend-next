import { ReactNode } from "react"

export type { Metadata } from "next"

export type DefaultPageParams = {
  params: Promise<{
    locale: string
  }>
}

export type NewsPostParams = {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export type UnsupportedNewsPostParams = {
  params: Promise<{
    locale: string
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
  params: Promise<{ locale: string }>
} & PageVariants
