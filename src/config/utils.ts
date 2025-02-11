import { z } from "zod"

import { BUILD_VARIANTS } from "./constants"

const buildVariantValidator = z.enum(BUILD_VARIANTS).default("pub")

export const getBuildVariant = () => {
  const variant = process.env.NEXT_PUBLIC_BUILD_VARIANT
  const buildVariant = buildVariantValidator.parse(variant)
  return { buildVariant }
}

export const getBasePath = () => {
  const { buildVariant } = getBuildVariant()
  const servedAtRoot = buildVariant === "pub" || buildVariant === "local"

  return { basePath: servedAtRoot ? String("") : "/" + buildVariant }
}
