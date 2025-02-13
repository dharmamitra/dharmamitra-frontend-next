import { z } from "zod"

import { BUILD_VARIANTS } from "./constants"

const buildVariantValidator = z.enum(BUILD_VARIANTS).default("pub")

export const getBuildVariant = () => {
  const variant = process.env.NEXT_PUBLIC_BUILD_VARIANT
  return buildVariantValidator.parse(variant)
}

export const getBasePath = () => {
  const buildVariant = getBuildVariant()
  const servedAtRoot = buildVariant === "pub" || buildVariant === "dev"
  return servedAtRoot ? String("") : "/" + buildVariant
}
