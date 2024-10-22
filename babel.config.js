module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		['module:react-native-dotenv'],
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: [
					'.ios.js',
					'.android.js',
					'.js',
					'.ts',
					'.tsx',
					'.json',
				],
				alias: {
					'@root': '.',
					'@mocks': ['./src/__mocks__'],
					'@global-types': './src/global-types',
					'@utils': './src/utils',
					'@recipe-editable-components':
						'./src/screens/recipe/recipe-editable/components',
					'@recipe-editable-styles':
						'./src/screens/recipe/recipe-editable/styles',
					'@recipe-editable-types':
						'./src/screens/recipe/recipe-editable/types',
					'@constants': './src/constants',
					'@styles': './src/styles',
					'@config': './src/config',
					'@routes': './src/routes',
					'@screens': './src/screens',
					'@login-screen': './src/screens/auth/containers/login',
					'@registration-screen':
						'./src/screens/auth/containers/registration',
					'@fp-screen':
						'./src/screens/auth/containers/forgot-password',
					'@assets': './src/assets',
					'@components': './src/components',
					'@generic-components': './src/components/generic',
					'@footer-components': './src/components/footer',
					'@form-components': './src/components/forms',
					'@header-components': './src/components/headers',
					'@nav-components': './src/components/nav',
					'@recipe-components': './src/components/recipes',
					'@api': './src/api',
					'@lib': './src/lib',
					'@localization': './src/lib/localization',
				},
			},
		],
	],
};
