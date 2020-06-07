module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', {
      'named': 'never',
    }],
    'vue/component-tags-order': ['error', {
      'order': ['template', 'script', 'style']
    }]
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard'
  ],
}
