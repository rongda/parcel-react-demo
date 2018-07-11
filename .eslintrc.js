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
    "standard",
    "standard-react"
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
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
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
