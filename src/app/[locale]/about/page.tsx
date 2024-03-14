import { useTranslations } from "next-intl"
import styles from "../page.module.css"

export default function Home() {
  const t = useTranslations("about")

  return (
    <main className={styles.main}>
      <h1>{t("title")}</h1>
    </main>
  )
}
