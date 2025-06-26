import { compileMDX } from "next-mdx-remote/rsc"
import { existsSync } from "fs"
import { readdir, readFile } from "fs/promises"
import path from "path"

import LocalLink from "@/components/LocalLink"
import MDXImage from "@/components/MDXImage"
import { getBuildVariant } from "@/config/utils"
import { type NewsPost, NewsPostDataSchema } from "@/content/schemas"

const NEWS_PATH = path.join(process.cwd(), "src/content/news")

const EXAMPLE_POST_SLUG = "3999-02-09-example"

const isMDContent = (source: string) => {
  const content = source.trim().split("---")[2]
  return Boolean(content && content.trim().length > 0)
}

const hasBuildExamplePost = (path: string) => {
  const buildVariant = getBuildVariant()
  if (!(buildVariant === "dev" || buildVariant === "rnd")) return false
  return path.includes(EXAMPLE_POST_SLUG)
}

export const getPostFileRoutes = async (locale: string) => {
  const articleDirs = await readdir(NEWS_PATH)
  return articleDirs
    .map((slug) => ({
      filePath: path.join(NEWS_PATH, slug, `${locale}.mdx`),
      slug,
    }))
    .filter(({ filePath }) => {
      if (existsSync(filePath)) {
        if (filePath.includes(EXAMPLE_POST_SLUG)) {
          return hasBuildExamplePost(filePath)
        }
        return true
      }

      return false
    })
}

export const getPostFileContent = async (file: {
  filePath: string
  slug: string
  locale: string
}) => {
  const source = await readFile(file.filePath, "utf-8")

  const { content, frontmatter } = await compileMDX({
    source,
    components: {
      img: MDXImage,
      a: LocalLink,
      MDXImage,
    },
    options: {
      parseFrontmatter: true,
      //TODO: Add rehype plugins
      // mdxOptions: {
      //   rehypePlugins: [rehypeMDXImportMedia],
      // },
    },
  })

  const post = {
    ...frontmatter,
    slug: file.slug,
    locale: file.locale,
  }

  const validatedPost = NewsPostDataSchema.safeParse(post)

  if (!validatedPost.success) {
    throw new Error(
      `Post not rendered. ${file.slug} has invalid frontmatter: ${JSON.stringify(
        validatedPost.error.format(),
      )}`,
    )
  }
  return {
    ...validatedPost.data,
    content: isMDContent(source) ? content : null,
  }
}

export async function getNewsPosts(locale: string) {
  try {
    const postFiles = await getPostFileRoutes(locale)
    const posts: NewsPost[] = []

    for (const file of postFiles) {
      const post = await getPostFileContent({
        filePath: file.filePath,
        slug: file.slug,
        locale,
      })

      posts.push(post)
    }

    return {
      posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    }
  } catch (error) {
    if (error instanceof Error) {
      return { error, posts: [] }
    }

    return { error: new Error("Unknown error:" + error), posts: [] }
  }
}

export async function getStaticNewsPostsParams(locale: string) {
  const postFiles = await getPostFileRoutes(locale)

  const posts = await Promise.all(
    postFiles.map(async (post) => {
      const source = await readFile(post.filePath, "utf-8")
      return { ...post, content: isMDContent(source) }
    }),
  )

  return posts.filter((post) => post.content)
}

export async function getNewsPost({ slug, locale }: { slug: string; locale: string }) {
  try {
    const post = await getPostFileContent({
      filePath: path.join(NEWS_PATH, slug, `${locale}.mdx`),
      slug,
      locale,
    })

    return { post }
  } catch (error) {
    if (error instanceof Error) {
      return { error }
    }

    return { error: new Error("Unknown error:" + error) }
  }
}
