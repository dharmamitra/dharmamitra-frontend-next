import { AppConfig } from "./defineConfig"
import {
  createDMProductionConfig,
  createDMStagingConfig,
  createKJProductionConfig,
  createKJStagingConfig,
  createLocalConfig,
  createPlaygroundProductionConfig,
  createPlaygroundStagingConfig,
} from "./envs"

const configCreators: Record<AppConfig["env"], () => AppConfig> = {
  "dm-staging": createDMStagingConfig,
  "dm-production": createDMProductionConfig,
  "kj-staging": createKJStagingConfig,
  "kj-production": createKJProductionConfig,
  local: createLocalConfig,
  "playground-staging": createPlaygroundStagingConfig,
  "playground-production": createPlaygroundProductionConfig,
}

function getConfig() {
  //   const env = process.env.APP_ENV
  const env = "local"

  if (!env || !(env in configCreators)) {
    throw new Error(`Invalid APP_ENV "${process.env.APP_ENV}"`)
  }

  return configCreators[env as keyof typeof configCreators]()
}

export const appConfig = getConfig()
