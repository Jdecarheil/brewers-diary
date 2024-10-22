import {Header} from '@screens/get-started/components/header';
import {render, screen, within} from '@testing-library/react-native';
import {ProviderWrapper} from 'src/__mocks__/provider';

export const Wrapper = () => {
	return (
		<ProviderWrapper
			children={
				<Header
					logout={() => {}}
					settings={() => {}}
					upload={() => {}}
				/>
			}
		/>
	);
};

test('verifies anonymous name is present', () => {
	render(<Wrapper />);
	const {getByText} = within(screen.getByTestId('header-user-name'));
	expect(getByText('Anonymous')).toBeTruthy();
});

test('shows correct settings icon', () => {
	render(<Wrapper />);
	expect(screen.getByLabelText('settings-icon')?.props.source).toBe(
		require('@assets/icons/settings.png'),
	);
});

test('shows correct logout icon', () => {
	render(<Wrapper />);
	expect(screen.getByLabelText('logout-icon')?.props.source).toBe(
		require('@assets/icons/logout.png'),
	);
});

test('shows correct profile icon', () => {
	render(<Wrapper />);
	expect(screen.getByLabelText('user-image')?.props.source).toBe(
		require('@assets/images/default.png'),
	);
});
