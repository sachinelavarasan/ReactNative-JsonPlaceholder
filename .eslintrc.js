module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  parser: 'babel-eslint',
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/state-in-constructor': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'consistent-return': 0,
    'no-shadow': 0,
    camelcase: 0,
    'array-callback-return': 0,
    'global-require': 0,
    'no-use-before-define': [
      'error',
      { functions: true, classes: true, variables: false },
    ], // disable the rule for variables, but enable it for functions and classes
    'import/no-unresolved': 'off',
  },
};
