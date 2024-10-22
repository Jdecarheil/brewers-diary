import {Header} from '@screens/get-started/components/header';
import {render, screen, within} from '@testing-library/react-native';
import {ProviderWrapper} from 'src/__mocks__/provider';
import {FlagImage} from './flag-image';
import i18n from 'i18next';

describe('Flag Image', () => {
	test('verifies uk flag shows', () => {
		// render(<ProviderWrapper children={<FlagImage />} />);
		// expect(screen.getByLabelText('country-flag')?.props.source).toBe(
		// 	require('@assets/flags/uk.png'),
		// );
	});
});
