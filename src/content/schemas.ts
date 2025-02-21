import { JSXElementConstructor, ReactElement } from "react"
import { z } from "zod"

export const NewsPostFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string().date(),
  type: z.string(),
  location: z.string().optional(),
})

export const NewsPostDataSchema = z.object({
  ...NewsPostFrontmatterSchema.shape,
  slug: z.string(),
  locale: z.string(),
})

export type NewsPost = z.infer<typeof NewsPostDataSchema> & {
  content: ReactElement<unknown, string | JSXElementConstructor<unknown>> | null
}
