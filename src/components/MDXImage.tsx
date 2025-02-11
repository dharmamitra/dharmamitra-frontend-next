import type { ImageProps } from "next/image"
import Image from "next/image"
import fs from "fs"
import sizeOf from "image-size"
import path from "path"

import appConfig from "@/config"

type ImageDimensions = {
  width: number
  height: number
  aspectRatio: number
  error?: string
}

const getImageDimensions = (src: string): ImageDimensions => {
  try {
    const imagePath = path.join(process.cwd(), src)
    const dimensions = sizeOf(fs.readFileSync(imagePath))

    if (!dimensions.width || !dimensions.height) {
      return {
        width: 400,
        height: 400,
        aspectRatio: 1,
        error: `Invalid image dimensions: ${src}`,
      }
    }

    return {
      width: dimensions.width,
      height: dimensions.height,
      aspectRatio: dimensions.width / dimensions.height,
    }
  } catch (error) {
    return {
      width: 400,
      height: 400,
      aspectRatio: 1,
      error: `Failed to get image dimensions for ${src}. Error: ${error}`,
    }
  }
}

const calculateDimensions = (
  originalDimensions: ImageDimensions,
  requestedWidth?: number | string,
  requestedHeight?: number | string,
) => {
  const width = requestedWidth ? Number(requestedWidth) : undefined
  const height = requestedHeight ? Number(requestedHeight) : undefined

  if (width && height) {
    return { width, height }
  }

  if (width) {
    return {
      width,
      height: Math.round(width / originalDimensions.aspectRatio),
    }
  }

  if (height) {
    return {
      width: Math.round(height * originalDimensions.aspectRatio),
      height,
    }
  }

  return {
    width: originalDimensions.width,
    height: originalDimensions.height,
  }
}

type MDXImageProps = Omit<ImageProps, "src"> & {
  src: string
}

const MDXImage = ({ src, alt, width, height, ...props }: MDXImageProps) => {
  const { basePath } = appConfig
  const assetPath = `${basePath}/public/assets/news/${src}`
  const normalizedSrc = `${basePath}/assets/news/${src}`

  const dimensions =
    width && height
      ? { width, height }
      : calculateDimensions(getImageDimensions(assetPath), width, height)

  return (
    <Image
      src={normalizedSrc}
      alt={alt}
      {...dimensions}
      style={{
        objectFit: "contain",
        width: "100%",
        height: "auto",
      }}
      {...props}
    />
  )
}

export default MDXImage
