import Script from "next/script"

export default function FeedbucketScript() {
  return (
    <Script
      type="text/javascript"
      src="https://cdn.feedbucket.app/assets/feedbucket.js"
      data-feedbucket={process.env.FEEDBUCKET_KEY}
    />
  )
}
