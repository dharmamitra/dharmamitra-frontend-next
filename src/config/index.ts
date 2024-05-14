import { AppConfig, AppEnv, SUPPORTED_ENVS } from "./defineConfig"
import createLabConfig from "./envs/lab"
import createDMConfig from "./envs/pub"
import createLocalConfig from "./envs/rnd"

function getConfig() {
  const setEnv = process.env.NEXT_PUBLIC_APP_ENV as AppEnv

  if (!setEnv) {
    throw new Error(`NEXT_PUBLIC_APP_ENV is not set`)
  }

  if (!SUPPORTED_ENVS.includes(setEnv)) {
    throw new Error(`Invalid NEXT_PUBLIC_APP_ENV value: "${setEnv}"`)
  }

  let configCreator: () => AppConfig = () => {
    throw new Error(`Missing environment config creator for "${setEnv}"`)
  }

  // Loop preferred over a switch statement to guard against
  // missing config creators.
  SUPPORTED_ENVS.forEach((env) => {
    if (env !== setEnv) return

    if (env === "pub") {
      configCreator = createDMConfig
    }

    if (env === "lab") {
      configCreator = createLabConfig
    }

    if (env === "rnd") {
      configCreator = createLocalConfig
    }
  })

  return configCreator()
}

const appConfig = getConfig()

export default appConfig
