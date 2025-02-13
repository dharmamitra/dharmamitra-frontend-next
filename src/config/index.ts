import { BUILD_VARIANTS } from "./constants"
import { AppConfig } from "./defineConfig"
import { getBuildVariant } from "./utils"
import createKumarajivaConfig from "./variants/kumarajiva"
import createLabConfig from "./variants/lab"
import createLocalConfig from "./variants/local"
import createPubConfig from "./variants/pub"
import createRNDConfig from "./variants/rnd"

const configCreatorMap: Record<
  (typeof BUILD_VARIANTS)[number],
  () => AppConfig
> = {
  pub: createPubConfig,
  lab: createLabConfig,
  rnd: createRNDConfig,
  local: createLocalConfig,
  kumarajiva: createKumarajivaConfig,
}

function getConfig() {
  const buildVariant = getBuildVariant()

  const configCreator: () => AppConfig = configCreatorMap[buildVariant]

  return configCreator()
}

const appConfig = getConfig()

export default appConfig
