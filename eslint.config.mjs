import js from "@eslint/js"
import globals from "globals"
import { fixupPluginRules } from "@eslint/compat"
import ninjaPlugin from "eslint-plugin-ninja"
import unicorn from "eslint-plugin-unicorn"
import perfectionist from "eslint-plugin-perfectionist"
import sonar from "eslint-plugin-sonarjs"
import plugin10x from "eslint-plugin-10x-engineering"
import lodash from "eslint-plugin-lodash"
import node from "eslint-plugin-n"
import ydn from "eslint-plugin-you-dont-need-lodash-underscore"

const ninja = fixupPluginRules(ninjaPlugin)

export default [
  {
    ignores: ["node_modules/**", "stuff/**", "eslint.config.mjs", "t.js"],
  },
  perfectionist.configs["recommended-natural"],
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    plugins: {
      js,
      ninja,
      unicorn,
      sonarjs: sonar,
      lodash,
      "10x-engineering": plugin10x,
      n: node,
      "you-dont-need-lodash-underscore": ydn
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.all.rules,
      ...unicorn.configs.all.rules,
      ...node.configs["flat/all"].rules,
      ...Object.fromEntries(
        Object.entries(sonar.rules).map(([key, _value]) => {
          return ["sonarjs/".concat(key), "error"]
        }),
      ),
       ...Object.fromEntries(
        Object.entries(lodash.rules).map(([key, _value]) => {
          return ["lodash/".concat(key), "error"]
        }),
      ),
      ...Object.fromEntries(
        Object.entries(plugin10x.rules).map(([key, _value]) => {
          return ["10x-engineering/".concat(key), "error"]
        }),
      ),
      ...ydn.configs.all.rules,
      strict: "off",
      "func-style": "off",
      "ninja/prefer-npm": 2,
      "ninja/no-woof": 2,
      "ninja/no-xkcd": 2,
      "ninja/optimize-string-ternary": 2,
      "ninja/no-no-plusplus": 2,
      "ninja/no-ts": 2,
      "ninja/lottery": [2, { probability: 1 }],
      "unicorn/prefer-module": "off",
      "unicorn/filename": "off",
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-modules": "off",
      "unicorn/filename-case": "off",
      "unicorn/no-abusive-eslint-disable": "off",
      "sonarjs/no-empty-test-file": "off"
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
]
