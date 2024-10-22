import {render} from '@testing-library/react-native';

import {assertIconPath, assertText} from 'src/__mocks__/assertions';

import {FooterWithWrapper, NavRowsWithWrapper} from 'src/__mocks__/wrappers';

jest.mock('@screens/get-started/components/header');

describe('Get Started', () => {
	describe('Footer', () => {
		beforeEach(() => {
			render(<FooterWithWrapper />);
		});

		const pkg = require('../../../package.json');

		assertText(
			'footer-account-type-text',
			'Standard User',
			'verifies correct account type shown',
		);
	});

	describe('Nav Rows', () => {
		beforeEach(() => {
			render(<NavRowsWithWrapper />);
		});

		const title = (item: string) => {
			return `verifies correct title for ${item}`;
		};

		const subtitle = (item: string) => {
			return `verifies correct subtitle for ${item}`;
		};

		describe('My Collection', () => {
			assertText(
				'my-collection-row-title',
				'My Collection',
				title('my collection'),
			);

			assertText(
				'my-collection-row-subtitle',
				'View your current recipes',
				subtitle('my collection'),
			);

			assertIconPath(
				'recipe-icon',
				require('@assets/icons/recipe.png'),
				'recipe',
			);
			assertIconPath(
				'my-collection-chevron-icon',
				require('@assets/icons/chevron.png'),
				'chevron',
			);
		});

		describe('Global Recipes', () => {
			assertText(
				'global-recipes-row-title',
				'Global Recipes',
				title('global recipes'),
			);

			assertText(
				'global-recipes-row-subtitle',
				'View brews available to the public',
				subtitle('global recipes'),
			);

			assertIconPath(
				'global-recipe-icon',
				require('@assets/icons/database.png'),
				'global recipe',
			);

			assertIconPath(
				'global-recipes-chevron-icon',
				require('@assets/icons/chevron.png'),
				'chevron',
			);
		});

		describe('Sessions', () => {
			assertText(
				'sessions-row-title',
				'Brew Sessions',
				title('sessions'),
			);

			assertText(
				'sessions-row-subtitle',
				'View previous or current session batches',
				subtitle('sessions'),
			);

			assertIconPath(
				'sessions-icon',
				require('@assets/icons/beer.png'),
				'sessions',
			);

			assertIconPath(
				'sessions-chevron-icon',
				require('@assets/icons/chevron.png'),
				'chevron',
			);
		});

		describe('Tools', () => {
			assertText('tools-row-title', 'Tools', title('tools'));

			assertText(
				'tools-row-subtitle',
				'Tools to aid with brew days',
				subtitle('tools'),
			);

			assertIconPath(
				'tools-icon',
				require('@assets/icons/tools.png'),
				'tools',
			);

			assertIconPath(
				'tools-chevron-icon',
				require('@assets/icons/chevron.png'),
				'chevron',
			);
		});

		describe('Inventory', () => {
			assertText('inventory-row-title', 'Inventory', title('inventory'));

			assertText(
				'inventory-row-subtitle',
				'View your available ingredients',
				subtitle('inventory'),
			);

			assertIconPath(
				'inventory-icon',
				require('@assets/icons/inventory.png'),
				'inventory',
			);

			assertIconPath(
				'inventory-chevron-icon',
				require('@assets/icons/chevron.png'),
				'chevron',
			);
		});

		describe('About', () => {
			assertText('about-row-title', 'About', title('about'));

			assertText(
				'about-row-subtitle',
				'Information about this app',
				subtitle('about'),
			);

			assertIconPath(
				'about-icon',
				require('@assets/icons/about.png'),
				'about',
			);

			assertIconPath(
				'about-chevron-icon',
				require('@assets/icons/chevron.png'),
				'chevron',
			);
		});

		describe('Help', () => {
			assertText('help-row-title', 'Help', title('help'));

			assertText(
				'help-row-subtitle',
				'Resources to help you',
				subtitle('help'),
			);

			assertIconPath(
				'help-icon',
				require('@assets/icons/help.png'),
				'help',
			);

			assertIconPath(
				'help-chevron-icon',
				require('@assets/icons/chevron.png'),
				'chevron',
			);
		});
	});
});
