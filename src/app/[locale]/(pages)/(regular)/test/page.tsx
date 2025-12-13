"use client"

import Head from "next/head"

import MitraExplore from "@/components/features/MitraExplore"
import FeatureContainer from "@/components/features/MultiFeatureMitra/FeatureContainer"

export default function Page() {
  return (
    <div>
      <Head>
        <title>Mitra RnD testing</title>
        <meta name="description" content="Test page" />
      </Head>

      <main>
        <FeatureContainer id="search-feature-wrapper">
          <h1>Explore</h1>
          <MitraExplore isSearchControlsOpen={true} setIsSearchControlsOpen={() => {}} />
        </FeatureContainer>
      </main>
    </div>
  )
}
