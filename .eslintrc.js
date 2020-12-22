module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    rules: {
        // "@typescript-eslint/explicit-function-return-type": 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                argsIgnorePattern: '^_' // ignore unused variables whose name is '_'
            }
        ],
        'no-sparse-arrays': 0,
        // "no-return-await": 2,
        // "curly": 2,
        'semi': 2,
        '@typescript-eslint/no-inferrable-types': 0,
        'no-extra-boolean-cast': 0,
        'no-trailing-spaces': ['error', { 'ignoreComments': true }]
    }
};
