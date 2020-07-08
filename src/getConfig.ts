import path from 'path';

import { Options } from 'jscodeshift';

const cwd = process.cwd();

export const readConfigFile = (
  configFilename: string,
  defaultConfig: object,
) => {
  try {
    const configPath = path.join(cwd, configFilename);
    const config = require(configPath); // eslint-disable-line

    return config;
  } catch (e) {
    // eslint-disable-next-line
    console.log('Config not found');
    return defaultConfig;
  }
};

export const getConfig = <Config extends object>(
  options: Options,
  defaultConfig: object = {},
): Config => {
  if (options.testConfig) {
    return options.testConfig;
  }

  if (!options.config) {
    return defaultConfig;
  }

  return readConfigFile(options.config, defaultConfig);
};
