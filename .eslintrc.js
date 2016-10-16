module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react", 'flowtype', "flowtype-errors"
    ],
    "rules": {
        "flowtype/boolean-style": [
            2,
            "boolean"
        ],
        "flowtype/define-flow-type": 1,
        "flowtype/delimiter-dangle": [
            2,
            "never"
        ],
        "flowtype/generic-spacing": [
            2,
            "never"
        ],
        // "flowtype/no-weak-types": 2,
        // "flowtype/require-parameter-type": 2,
        // "flowtype/require-return-type": [
        //     2,
        //     "always",
        //     {
        //         "annotateUndefined": "never"
        //     }
        // ],
        "flowtype/require-valid-file-annotation": 2,
        "flowtype/semi": [
            2,
            "always"
        ],
        "flowtype/space-after-type-colon": [
            2,
            "always"
        ],
        "flowtype/space-before-generic-bracket": [
            2,
            "never"
        ],
        "flowtype/space-before-type-colon": [
            2,
            "never"
        ],
        // "flowtype/type-id-match": [
        //     2,
        //     "^([A-Z][a-z0-9]+)+Type$"
        // ],
        "flowtype/union-intersection-spacing": [
            2,
            "always"
        ],
        // "flowtype/use-flow-type": 1,
        "flowtype/valid-syntax": 1,

        "flowtype-errors/show-errors": 2,

        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};