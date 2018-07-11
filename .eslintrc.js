// http://eslint.org/docs/user-guide/configuring

module.exports = {
  "root": true,
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "commonjs": true
  },
  "extends": [
    "standard",      // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    "standard-react" // https://github.com/feross/eslint-config-standard-react
  ],
  "plugins": [
    "babel",
    "react",
    "promise"
  ],
  "globals": {
    "__DEV__": true,
    "__PROD__": true,
    "__COMPONENT_DEVTOOLS__": false,
    "__WHY_DID_YOU_UPDATE__": false
  },
  "rules": {
    "indent": ["error", 2, {
      'SwitchCase': 1
    }],
    // "no-extra-semi": ["error"],
    "space-before-function-paren": ["error", "never"],
    "arrow-parens": 0,
    "generator-star-spacing": 0,  // allow async-await
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0, // allow debugger during development
    "react/jsx-indent": ["error", 2],
    "react/jsx-indent-props": ["error", 2],
    "react/prop-types": [0],
    "react/jsx-no-bind": 0,
    "standard/no-callback-literal": 0,
    "react/self-closing-comp": ["error", {
      "component": true,
      "html": true
    }]
  }
}
