import { AppConfig } from "./defineConfig"
import {
  createDMProductionConfig,
  createDMStagingConfig,
  createKJProductionConfig,
  createKJStagingConfig,
  createLabProductionConfig,
  createLabStagingConfig,
  createLocalConfig,
} from "./envs"

const configCreators: Record<AppConfig["env"], () => AppConfig> = {
  "dm-staging": createDMStagingConfig,
  "dm-production": createDMProductionConfig,
  "kj-staging": createKJStagingConfig,
  "kj-production": createKJProductionConfig,
  local: createLocalConfig,
  "lab-staging": createLabStagingConfig,
  "lab-production": createLabProductionConfig,
}

function getConfig() {
  const env = process.env.NEXT_PUBLIC_APP_ENV

  if (!env || !(env in configCreators)) {
    throw new Error(`Invalid NEXT_PUBLIC_APP_ENV value: "${env}"`)
  }

  return configCreators[env as keyof typeof configCreators]()
}

const appConfig = getConfig()

export default appConfig
