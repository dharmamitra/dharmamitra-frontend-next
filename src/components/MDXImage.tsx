import type { ImageProps } from "next/image"
import Image from "next/image"
import { Box } from "@mui/material"
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

type MDXImageProps = Omit<ImageProps, "src"> & {
  src: string
  maxWidth?: number
  maxHeight?: number
  style?: React.CSSProperties
}

const MDXImage = ({
  src,
  alt,
  maxWidth,
  maxHeight,
  style,
  ...props
}: MDXImageProps) => {
  const { basePath } = appConfig
  const assetPath = `${basePath}/public/assets/news/${src}`
  const normalizedSrc = `${basePath}/assets/news/${src}`

  const originalDimensions = getImageDimensions(assetPath)

  return (
    <Box
      component="span"
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: maxWidth ?? "100%",
        height: "auto",
        maxHeight: maxHeight ?? "none",
        "& img": {
          width: "100%",
          height: "auto",
          maxHeight: maxHeight ?? "none",
          objectFit: "contain",
        },
        ...style,
      }}
    >
      <Image
        src={normalizedSrc}
        alt={alt}
        width={originalDimensions.width}
        height={originalDimensions.height}
        {...props}
      />
    </Box>
  )
}

export default MDXImage
