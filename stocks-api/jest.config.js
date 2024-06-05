export default {
  globals: {
    "ts-jest": {
      useESM: true,
      tsconfig: "tsconfig.json",
    },
  },
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
