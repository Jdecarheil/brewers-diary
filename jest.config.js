const {defaults: tsjPreset} = require('ts-jest/presets');
const {pathsToModuleNameMapper} = require('ts-jest');
const {compilerOptions} = require('./tsconfig');

module.exports = {
	...tsjPreset,
	preset: 'react-native',
	transform: {
		'^.+\\.(jsx|js)$': 'babel-jest',
		'^.+\\.(tsx|ts)?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.jest.json',
			},
		],
	},
	modulePaths: ['<rootDir>'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	transformIgnorePatterns: [
		'node_modules/(?!@rneui/base|@react-native|react-native)',
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
