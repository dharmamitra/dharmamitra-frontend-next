import createDMProductionConfig from "./envs/dm"
import createKPProductionConfig from "./envs/kp"
import createLabProductionConfig from "./envs/lab"
import createLocalConfig from "./envs/local"

function getConfig() {
  const env = process.env.NEXT_PUBLIC_APP_ENV

  if (!env) {
    throw new Error(`NEXT_PUBLIC_APP_ENV is not set`)
  }

  switch (env) {
    case "dm":
      return createDMProductionConfig()
    case "kp":
      return createKPProductionConfig()
    case "lab":
      return createLabProductionConfig()
    case "local":
      return createLocalConfig()
    default:
      throw new Error(`Invalid NEXT_PUBLIC_APP_ENV value: "${env}"`)
  }
}

const appConfig = getConfig()

export default appConfig
