module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
    ],
    ignorePatterns: ['dist'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
}
