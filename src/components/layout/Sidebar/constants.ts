import { Messages } from "@/app/types"
export const SIDEBAR_WIDTH_EXPANDED = 274
export const SIDEBAR_WIDTH_COLLAPSED = 64
export const SIDEBAR_TRANSITION_DURATION = 225

export type MitraFeature = keyof Messages["features"]

export const featureRoutes: MitraFeature[] = ["translate", "explore", "db-search", "ocr"]
