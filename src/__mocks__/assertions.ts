import {cleanup, screen, within} from '@testing-library/react-native';
import {ImageSourcePropType} from 'react-native';

export function assertText(testID: string, expected: string, testName: string) {
	test(testName, () => {
		const {getByText} = within(screen.getByTestId(testID));
		expect(getByText(expected)).toBeTruthy();
		cleanup();
	});
}

export function assertIconPath(
	ariaLabel: string,
	source: ImageSourcePropType,
	testName: string,
) {
	test(`shows correct ${testName} icon`, () => {
		expect(screen.getByLabelText(ariaLabel)?.props.source).toBe(source);
		cleanup();
	});
}
