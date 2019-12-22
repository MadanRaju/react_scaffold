module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'./best-practice-rules.js',
		'./error-rules.js',
		'./es6-rules.js',
		'./import-rules.js',
		'./node-rules.js',
		'./react-a11y-rules.js',
		'./react-rules.js',
		'./strict-rules.js',
		'./style-rules.js',
		'./variable-rules.js'
	],
	env: {
		browser: true,
		node: true,
		es6: true,
		jest: true
	},
	globals: {
		"document": true
	},
	parserOptions: {
		"ecmaVersion": 6,
      	"ecmaFeatures": {
	        "arrowFunctions": true,
	        "binaryLiterals": true,
	        "blockBindings": true,
	        "classes": true,
	        "defaultParams": true,
	        "destructuring": true,
	        "experimentalObjectRestSpread": true,
	        "forOf": true,
	        "globalReturn": true,
	        "generators": false,
	        "jsx": true,
	        "modules": true,
	        "objectLiteralComputedProperties": true,
	        "objectLiteralDuplicateProperties": false,
	        "objectLiteralShorthandMethods": true,
	        "objectLiteralShorthandProperties": true,
	        "octalLiterals": true,
	        "regexUFlag": true,
	        "regexYFlag": true,
	        "spread": true,
	        "superInFunctions": true,
	        "templateStrings": true,
	        "unicodeCodePointEscapes": true
	    },
      	"sourceType": "module"
	}
};