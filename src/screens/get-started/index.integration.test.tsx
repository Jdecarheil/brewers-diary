import {
	cleanup,
	render,
	screen,
	userEvent,
	within,
} from '@testing-library/react-native';

import {GetStartedScreenWithWrapper} from 'src/__mocks__/wrappers';

describe('Get Started Screen', () => {
	beforeEach(() => {
		render(<GetStartedScreenWithWrapper />);
	});

	test('upload image modal dissapears when clicking close', async () => {
		await userEvent.press(screen.getByTestId('avatar-container'));
		const {getByText} = within(
			screen.getByTestId('upload-profile-image-base-modal-title'),
		);
		expect(getByText('Upload new profile image')).toBeTruthy();

		await userEvent.press(
			screen.getByTestId('upload-profile-image-base-modal-close'),
		);

		const title = screen.queryAllByTestId(
			'upload-profile-image-base-modal-title',
		);

		expect(title).toHaveLength(0);
		cleanup();
	});
});
