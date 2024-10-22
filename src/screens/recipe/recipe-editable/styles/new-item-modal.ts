import {StyleSheet} from 'react-native';
import {baseColors} from '@styles/constants';

export const styles = StyleSheet.create({
	formError: {
		color: baseColors.warning,
	},
	containerRow: {
		flexDirection: 'row',
	},
	container: {
		flex: 1,
		width: '90%',
		alignSelf: 'center',
		alignContent: 'center',
	},
	inputContainer: {
		width: '100%',
		alignSelf: 'center',
		marginBottom: '4%',
	},
	outerContainer: {
		flex: 1,
		alignItems: 'center',
	},
	input: {
		backgroundColor: baseColors.input,
	},
	buttonStyle: {
		backgroundColor: baseColors.primary,
	},
	buttonContainerStyle: {
		borderRadius: 7,
	},
	detailsContainer: {
		flex: 1,
	},
});
