module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module"
    },
    plugins: ["@typescript-eslint/eslint-plugin"],
    extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/@typescript-eslint"
    ],
    root: true,
    env: {
        node: true,
        jest: true
    },
    rules: {
        "indent": [
            "error",
            4,
            {
                SwitchCase: 1,
                VariableDeclarator: {
                    var: 2,
                    let: 2,
                    const: 3
                },
                MemberExpression: 1,
                FunctionDeclaration: {
                    parameters: 1
                },
                CallExpression: {
                    arguments: 1
                },
                ArrayExpression: 1,
                ObjectExpression: 1
            }
        ],
        "no-extra-semi": "error",
        "curly": [
            "error",
            "all"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "object-curly-spacing": [
            "error",
            "never"
        ],
        "comma-dangle": [
            "error",
            "never"
        ],
        "no-unused-vars": [
            "error",
            {
                "vars": "local",
                "args": "after-used"
            }
        ],
        "semi": [
            "error",
            "always",
            {
                "omitLastInOneLineBlock": true
            }
        ],
        "no-console": [
            "warn"
        ],
        "space-before-function-paren": [
            "error",
            {
                "anonymous": "never",
                "named": "never"
            }
        ],
        "brace-style": [
            "error",
            "1tbs"
        ],
        "keyword-spacing": "error",
        "eol-last": "error",
        "no-trailing-spaces": "error",
        "no-multiple-empty-lines": "error",

        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "off"
    }
};
