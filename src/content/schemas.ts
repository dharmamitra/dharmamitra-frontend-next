import { JSXElementConstructor, ReactElement } from "react"
import { z } from "zod"

export const NewsPostFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string().date(),
  description: z.string(),
})

export const NewsPostDataSchema = z.object({
  ...NewsPostFrontmatterSchema.shape,
  slug: z.string(),
  locale: z.string(),
})

export type NewsPost = z.infer<typeof NewsPostDataSchema> & {
  content: ReactElement<unknown, string | JSXElementConstructor<unknown>> | null
}
