import { useMemo } from "react"

import appConfig from "@/config"

// TODO: is this hook still needed?
export default function useAppConfig() {
  return useMemo(() => appConfig, [])
}
