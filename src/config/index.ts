import { AppConfig, AppEnv, SUPPORTED_ENVS } from "./defineConfig"
import createKumarajivaConfig from "./envs/kumarajiva"
import createLabConfig from "./envs/lab"
import createLocalConfig from "./envs/local"
import createPubConfig from "./envs/pub"
import createRNDConfig from "./envs/rnd"

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
      configCreator = createPubConfig
    }

    if (env === "lab") {
      configCreator = createLabConfig
    }

    if (env === "rnd") {
      configCreator = createRNDConfig
    }

    if (env === "local") {
      configCreator = createLocalConfig
    }

    if (env === "kumarajiva") {
      configCreator = createKumarajivaConfig
    }
  })

  return configCreator()
}

const appConfig = getConfig()

export default appConfig
