import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  preset: 'ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    'react-native-sensors': '<rootDir>/fakeModule/react-native-sensors.ts',
  },
}

export default config
