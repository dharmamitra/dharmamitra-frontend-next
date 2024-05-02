import defineConfig from "./defineConfig"

export function createDMProductionConfig() {
  return defineConfig({
    env: "dm-production",
  })
}

export function createDMStagingConfig() {
  return defineConfig({
    env: "dm-staging",
  })
}

export function createKJProductionConfig() {
  return defineConfig({
    env: "kj-production",
  })
}

export function createKJStagingConfig() {
  return defineConfig({
    env: "kj-staging",
  })
}

export function createLocalConfig() {
  return defineConfig({
    env: "local",
    siteUrl: "http://localhost:3000",
    featureFlags: {
      search: true,
    },
  })
}

export function createLabProductionConfig() {
  return defineConfig({
    env: "lab-production",
    featureFlags: {
      search: true,
    },
  })
}

export function createLabStagingConfig() {
  return defineConfig({
    env: "lab-staging",
    featureFlags: {
      search: true,
    },
  })
}
