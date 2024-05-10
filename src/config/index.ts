import { AppConfig, AppEnv, envs } from "./defineConfig"
import createDMConfig from "./envs/dm"
import createKPConfig from "./envs/kp"
import createLabConfig from "./envs/lab"
import createLocalConfig from "./envs/local"

function getConfig() {
  const setEnv = process.env.NEXT_PUBLIC_APP_ENV as AppEnv

  if (!setEnv) {
    throw new Error(`NEXT_PUBLIC_APP_ENV is not set`)
  }

  if (!envs.includes(setEnv)) {
    throw new Error(`Invalid NEXT_PUBLIC_APP_ENV value: "${setEnv}"`)
  }

  let configCreator: () => AppConfig = () => {
    throw new Error(`Missing environment config creator for "${setEnv}"`)
  }

  // Loop preferred over a switch statement to guard against
  // missing config creators.
  envs.forEach((env) => {
    if (env !== setEnv) return

    if (env === "dm") {
      configCreator = createDMConfig
    }

    if (env === "kp") {
      configCreator = createKPConfig
    }

    if (env === "lab") {
      configCreator = createLabConfig
    }

    if (env === "local") {
      configCreator = createLocalConfig
    }
  })

  return configCreator()
}

const appConfig = getConfig()

export default appConfig
