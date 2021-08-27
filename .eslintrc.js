module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb', 'airbnb-typescript', 'prettier'],
  rules: {
    '@typescript-eslint/semi': ['error', 'never'],
    'no-undef': 'off',
    'max-lines': ['error', { max: 300, skipComments: true }],
    'react/prefer-stateless-function': ['error'],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'dot-notation': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'desc',
        },
      },
    ],
  },
}
