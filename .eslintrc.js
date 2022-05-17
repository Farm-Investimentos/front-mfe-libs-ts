module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ['airbnb-base'],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		'consistent-return': 0,
		'operator-linebreak': 0,
		'import/prefer-default-export': 0,
		'no-param-reassign': 0,
		'no-return-assign': 0,
		'prefer-destructuring': 0,
		'prefer-template': 0,
		'implicit-arrow-linebreak': 0,
	},
};
