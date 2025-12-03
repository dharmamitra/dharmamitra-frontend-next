import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { NuqsAdapter } from "nuqs/adapters/react"

import { DefaultPageParams, DefaultPageProps, Metadata } from "@/app/types"
import { AppLayout } from "@/components/layout"
import StorageCheck from "@/components/StorageCheck"
import appConfig from "@/config"
import { routing } from "@/i18n/routing"
import { cookieKeys } from "@/utils/constants"
import QueryProvider from "@/utils/QueryProvider"

export async function generateMetadata({ params }: DefaultPageParams): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: {
      default: t("title"),
      template: `%s · ${appConfig.siteName}`,
    },
    description: t("description"),
  }
}

export default async function DynamicPageLayout({ children, params }: DefaultPageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    return notFound()
  }

  const cookieStore = await cookies()
  const showExtensionBanner = cookieStore.get(cookieKeys.extensionBannerClosed)?.value !== "true"
  const sidebarExpanded = cookieStore.get(cookieKeys.sidebarExpanded)?.value !== "false"

  return (
    <QueryProvider>
      <NuqsAdapter>
        <AppLayout
          showExtensionBanner={showExtensionBanner}
          initialSidebarExpanded={sidebarExpanded}
        >
          <StorageCheck />
          {children}
        </AppLayout>
      </NuqsAdapter>
    </QueryProvider>
  )
}
