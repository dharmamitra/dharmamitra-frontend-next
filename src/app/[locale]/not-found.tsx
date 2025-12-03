import { cookies } from "next/headers"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"

import { Metadata } from "@/app/types"
import { AppLayout } from "@/components/layout"
import NotFound from "@/components/layout/NotFound"
import StorageCheck from "@/components/StorageCheck"
import appConfig from "@/config"
import { cookieKeys } from "@/utils/constants"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "metadata" })

  return {
    title: {
      default: t("title"),
      template: `%s · ${appConfig.siteName}`,
    },
    description: t("description"),
  }
}

export default async function DynamicPageLayout() {
  const messages = await getMessages()
  const cookieStore = await cookies()
  const showExtensionBanner = cookieStore.get(cookieKeys.extensionBannerClosed)?.value !== "true"
  const sidebarExpanded = cookieStore.get(cookieKeys.sidebarExpanded)?.value !== "false"

  return (
    <NextIntlClientProvider messages={messages}>
      <AppLayout showExtensionBanner={showExtensionBanner} initialSidebarExpanded={sidebarExpanded}>
        <StorageCheck />
        <NotFound />
      </AppLayout>
    </NextIntlClientProvider>
  )
}
