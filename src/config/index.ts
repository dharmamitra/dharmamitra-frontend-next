import { AppConfig } from "./defineConfig"
import createDMProductionConfig from "./envs/dm-production"
import createDMStagingConfig from "./envs/dm-staging"
import createKPProductionConfig from "./envs/kp-production"
import createKPStagingConfig from "./envs/kp-staging"
import createLabProductionConfig from "./envs/lab-production"
import createLabStagingConfig from "./envs/lab-staging"
import createLocalConfig from "./envs/local"

const configCreators: Record<AppConfig["env"], () => AppConfig> = {
  "dm-production": createDMProductionConfig,
  "dm-staging": createDMStagingConfig,
  "kp-production": createKPProductionConfig,
  "kp-staging": createKPStagingConfig,
  "lab-production": createLabProductionConfig,
  "lab-staging": createLabStagingConfig,
  local: createLocalConfig,
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
