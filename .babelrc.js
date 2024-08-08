module.exports = {
  presets: [
    ['next/babel', { 'preset-react': { runtime: 'automatic' } }],
    ["next/babel"],
    ["@zeit/next-typescript/babel"]
  ],
  plugins: [
    'babel-plugin-macros', 
    ['styled-components', { ssr: true }],
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@layouts": "./src/layouts/",
        "@components": "./src/components/",
        "@styles": "./src/styles/",
        "src": "./src/",
        "dva-utils": "./src/utils/",
        "dva": "dva-no-router"
      }
    }],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    [
      "import",
      {
        "libraryName": "antd",
        "style": true
      }
    ]
  ],
}