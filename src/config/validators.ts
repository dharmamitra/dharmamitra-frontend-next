import { BUILD_VARIANTS } from "./constants"

export function isValidBuildVariant(
  variant: unknown,
): variant is (typeof BUILD_VARIANTS)[number] {
  return (
    typeof variant === "string" &&
    BUILD_VARIANTS.some((value) => value === variant)
  )
}

export const getValidBuildVariant = () => {
  const buildVariant = process.env.NEXT_PUBLIC_BUILD_VARIANT

  if (!buildVariant) {
    throw new Error(`NEXT_PUBLIC_BUILD_VARIANT is not set`)
  }
  if (!isValidBuildVariant(buildVariant)) {
    throw new Error(
      `Invalid NEXT_PUBLIC_BUILD_VARIANT .env value set: "${buildVariant}"`,
    )
  }
  return { buildVariant }
}

export const getValidBasePath = () => {
  const { NODE_ENV: env } = process.env
  const { buildVariant } = getValidBuildVariant()
  const servedAtRoot = buildVariant === "pub" || env === "development"
  return { basePath: servedAtRoot ? String("") : "/" + buildVariant }
}
