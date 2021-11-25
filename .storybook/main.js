module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  // TODO: Remove temporary fix: https://githubmemory.com/repo/storybookjs/storybook/issues/16099?page=2
  features: { modernInlineRender: true }
}