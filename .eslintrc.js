module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb', 'plugin:react/jsx-runtime', 'eslint:recommended',
  ],
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: { 'import/no-anonymous-default-export': 'off' },
    },
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'object-curly-newline': [
      'error', {
        ObjectExpression: {
          consistent: true, multiline: true, minProperties: 3,
        },
        ImportDeclaration: {
          consistent: true, multiline: true, minProperties: 3,
        },
        ExportDeclaration: 'never',
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'webpack.*.js', '**/*.test.js', '**/*.spec.js',
        ],
      },
    ],
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'no-plusplus': 'off',
    'function-paren-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'array-bracket-newline': [
      'error', 'consistent',
    ],
  },
};
