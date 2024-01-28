module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "route": "readonly"
    },
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "import"
    ],
    "rules": {
        "react/react-in-jsx-scope": 0,
        "react/jsx-uses-react": 0,
        "react/prop-types": 0,
        "import/order": [
            "error",
            {
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index"
                ],
                "newlines-between": "always",
                alphabetize: { order: "asc", caseInsensitive: true },
                pathGroups: [
                    {
                        pattern: "react**",
                        group: "builtin",
                        position: "before",
                    },
                    {
                        pattern: "@material-ui/**",
                        group: "external",
                        position: "after",
                    },
                ],
                pathGroupsExcludedImportTypes: ["react"],
            },
        ],
    }
}
