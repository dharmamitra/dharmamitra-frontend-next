import { AppConfig } from "./defineConfig"
import createDMProductionConfig from "./envs/dm"
import createKPProductionConfig from "./envs/kp"
import createLabProductionConfig from "./envs/lab"
import createLocalConfig from "./envs/local"

const configCreators: Record<AppConfig["env"], () => AppConfig> = {
  dm: createDMProductionConfig,
  kp: createKPProductionConfig,
  lab: createLabProductionConfig,
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
