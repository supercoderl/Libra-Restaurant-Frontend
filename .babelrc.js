module.exports = {
  presets: [['next/babel', { 'preset-react': { runtime: 'automatic' } }]],
  plugins: [
    'babel-plugin-macros', 
    ['styled-components', { ssr: true }],
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "src": "./src/",
      }
    }],
    [
      "import",
      {
        "libraryName": "antd",
        "style": true
      }
    ]
  ],
}