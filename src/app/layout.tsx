import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

// As we have a `not-found.tsx` page on the root, a layout file
// is required. Style providers are added here the root level
// becaues they are inherited by downsstream layouts.
export default function RootLayout({ children }: Props) {
  return children
}
