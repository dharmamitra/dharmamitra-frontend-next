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
  })
}

export function createPlaygroundProductionConfig() {
  return defineConfig({
    env: "playground-production",
  })
}

export function createPlaygroundStagingConfig() {
  return defineConfig({
    env: "playground-staging",
  })
}
