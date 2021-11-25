const commonRules = {
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
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
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
        {
          pattern: '@blahaj/**',
          group: 'internal',
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
  'react/no-unescaped-entities': 'off',
  'import/prefer-default-export': 'off',
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: [
        'webpack.*.js', '**/*.test.js', '**/*.spec.js', '**/*.stories.jsx', 'webpack.*.ts', '**/*.test.ts', '**/*.spec.ts', '**/*.stories.tsx',
      ],
    },
  ],
  'implicit-arrow-linebreak': 'off',
  'operator-linebreak': 'off',
  'no-plusplus': 'off',
  'function-paren-newline': 'off',
  'react/jsx-one-expression-per-line': 'off',
  'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.tsx'] }],
  'array-bracket-newline': [
    'error', 'consistent',
  ],
  'react/function-component-definition': [
    2,
    {
      unnamedComponents: 'arrow-function',
      namedComponents: 'arrow-function',
    },
  ],
  'react/require-default-props': 'off',
};

const commonExtensions = [
  'plugin:react/recommended',
  'plugin:react/jsx-runtime',
  'eslint:recommended',
  'airbnb',
];

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [...commonExtensions],
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: { 'import/no-anonymous-default-export': 'off' },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['react', '@typescript-eslint'],
      extends: [
        ...commonExtensions,
        'plugin:import/typescript',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: { project: ['./tsconfig.json'] },
      rules: { ...commonRules },
    },
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: { ...commonRules },
};
