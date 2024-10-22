import {Dimensions, StyleSheet} from 'react-native';
import {baseColors, baseFonts, baseSizes} from '@styles/constants';
import {s} from 'react-native-size-matters';

export const baseStyles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
	headerContainer: {
		backgroundColor: baseColors.primary,
		flex: 1.1,
		zIndex: 4,
	},
	bodyContainer: {
		backgroundColor: baseColors.secondary,
		flex: 6,
	},
	footerContainer: {
		flex: 0.4,
		backgroundColor: baseColors.primary,
		borderTopWidth: 3,
		borderColor: baseColors.quaternary,
	},
	h1Title: {
		fontSize: baseSizes.text_h1,
		color: baseColors.secondary,
		fontFamily: baseFonts.text_primary,
	},
	authTitle: {
		color: baseColors.input_placeholder,
		fontFamily: baseFonts.text_primary,
		fontSize: baseSizes.text_h1,
	},
	formTextError: {
		color: baseColors.error,
		fontFamily: baseFonts.text_primary,
		fontSize: baseSizes.text_details,
	},
	label: {
		fontWeight: '700',
		fontFamily: baseFonts.text_primary,
		marginBottom: s(5),
		color: baseColors.text_tertiary,
	},
	headerContainerScreens: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	headerTitle: {
		fontSize: baseSizes.text_h1,
		color: baseColors.secondary,
		alignSelf: 'center',
	},
	windowSpecs: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
	baseText: {
		color: baseColors.primary,
		fontFamily: baseFonts.text_primary,
	},
	cancelIcon: {
		color: baseColors.secondary,
		fontSize: baseSizes.text_h1,
	},
	setMiddleContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
	imageDressing: {
		borderRadius: 6,
		borderWidth: 0.5,
		borderColor: baseColors.text_primary,
	},
	inputIcon: {
		height: '60%',
		aspectRatio: 1,
	},
	inputIconContainer: {
		flex: 1,
		justifyContent: 'center',
	},
});
