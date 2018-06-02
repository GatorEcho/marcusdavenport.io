module.exports = {
    "env": {
        "browser": true
    },
    "extends": "prettier",
    "rules": {
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
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "prettier/prettier": [
            "error",
            {
                "trailingComma": "es5",
                "singleQuote": true,
                "printWidth": 120,
            }
        ]
    },
    "plugins":[
        "prettier"
    ]
};