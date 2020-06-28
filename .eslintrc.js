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
      'order': ['template', 'script', 'style'],
    }],
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'no-prototype-builtins': 0,
    'vue/no-v-html': 0,
    'no-func-assign': 0,
    'vue/no-deprecated-filter': 0,
  },
  extends: [
    'eslint:recommended',
    'standard',
  ],
}
