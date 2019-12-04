module.exports = {
    "parser": "babel-eslint",
    "extends": [
        "eslint:recommended",
        "plugin:flowtype/recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:css-modules/recommended",
        "airbnb"
    ],
    "plugins": [
        "json",
        "flowtype",
        "react",
        "jsx-a11y",
        "import",
        "css-modules"
    ],
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "webpack.config.js"
            }
        }
    },
    "env": {
        "browser": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "globals": {
        "__DEV__": false
    },
    "rules": {
        // @formatter:off

        "arrow-body-style": "off",
        "array-bracket-spacing": ["error", "never"],
        "arrow-parens": ["error", "as-needed", {"requireForBlockBody": true}],
        "class-methods-use-this": "off",
        "camelcase": ["error", {"properties": "never"}],
        "comma-dangle": ["error", {
            "arrays": "only-multiline",
            "objects": "only-multiline",
            "imports": "never",
            "exports": "never",
            "functions": "ignore"
        }],
        "function-paren-newline": "off", // 不做要求,
        "object-curly-spacing": ["error", "never"],
        "object-curly-newline": ["error", {"multiline": true, "consistent": true}],
        "padded-blocks": ["error", {"classes": "always"}],
        "prefer-arrow-callback": ["error", {"allowNamedFunctions": true}],
        "prefer-destructuring": "off", // 不作强制要求
        "prefer-rest-params": "off",
        "prefer-template":"off",
        "max-len": ["error", {"code": 120, "ignoreComments": true}],
        "no-console": "warn",
        "no-constant-condition": ["error", { "checkLoops": false }],
        "no-continue": "off",
        "no-debugger": "error",
        "no-else-return": "off",
        "no-empty-function": ["error", {"allow": ["arrowFunctions"]}],
        "no-lonely-if": "off",
        "no-nested-ternary": "off",
        "no-mixed-operators": "off",
        "no-multi-spaces": ["error", {"ignoreEOLComments": true}],
        "no-param-reassign": ["error", {"props": false}],
        "no-plusplus": "off",
        "no-prototype-builtins": "off",
        "no-restricted-globals": ["off"], // 不做要求
        "no-return-assign": ["error", "except-parens"],
        "no-underscore-dangle": ["error", {"allowAfterThis": true, "allowAfterSuper": true, "enforceInMethodNames": false}],
        "no-unused-expressions": ["error", {"allowShortCircuit": true, "allowTernary": true, "allowTaggedTemplates": true}],
        "no-unused-vars": ["error", {"vars": "local", "args": "none"}],
        "no-use-before-define": ["error", {"functions": false, "classes": true}],
        "quote-props": ["error", "as-needed", {"unnecessary": false, "numbers": true}],

        "css-modules/no-unused-class": "error",
        "css-modules/no-undef-class": ["error", {"camelCase": true}],

        "import/extensions": "off",
        "import/prefer-default-export": "off",
        // 不支持 私有域 @pkfare/xxx 的用法识别，关闭
        "import/no-extraneous-dependencies": "off",

        "jsx-a11y/anchor-is-valid": "off",
        "jsx-a11y/click-events-have-key-events": "warn",
        "jsx-a11y/mouse-events-have-key-events": "warn",
        "jsx-a11y/no-noninteractive-element-interactions": "off", // 不作要求
        "jsx-a11y/no-static-element-interactions": "off",

        "react/forbid-prop-types": "warn",
        "react/jsx-boolean-value": ["error", "always"],
        "react/jsx-no-bind": "off",
        "react/jsx-no-target-blank": "warn",
        "react/jsx-tag-spacing": "off",
        "react/prop-types": ["warn", {"ignore": ["className", "style"]}],
        "react/no-array-index-key": "warn",
        "react/no-danger": "off",
        "react/no-typos": "off",
        "react/no-unused-prop-types": "off", // 无法识别变量传递，关闭
        "react/no-unused-state": "error",
        "react/prefer-stateless-function": "off",
        "react/require-default-props": "warn",
        "react/sort-comp": ["warn", {
            "order": [
                "type-annotations",
                "static-methods",
                "lifecycle",
                "/^public.+$/",
                "/^get.+$/",
                "/^handle.+$/",
                "/^on.+$/",
                "everything-else",
                "render"
            ]
        }],

        // @formatter:on
    }
};
