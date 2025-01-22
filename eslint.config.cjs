// eslint-disable-next-line @typescript-eslint/no-var-requires
const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat();

module.exports = [
    ...compat.config({
        plugins: ["prettier", "simple-import-sort"],
        extends: ["@rocketseat/eslint-config/react"],
        rules: {
            "prettier/prettier": [
                "error",
                {
                    printWidth: 80,
                    tabWidth: 4,
                    singleQuote: false,
                    trailingComma: "all",
                    arrowParens: "always",
                    semi: true,
                },
            ],
            quotes: ["error", "double"],
            "simple-import-sort/imports": "error",
        },
    }),
];
