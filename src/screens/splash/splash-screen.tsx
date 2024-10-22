import {useAuthenticationStatus} from '@nhost/react';
import {Avatar} from '@rneui/base';
import {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import {ScaledSheet, s} from 'react-native-size-matters';
import {baseColors, baseFonts, baseSizes} from '@styles/constants';

export type SplashProps = {
	onFinish: (authenticated: boolean) => void;
};

const SplashScreen = (props: SplashProps) => {
	const {isAuthenticated, isLoading} = useAuthenticationStatus();

	setTimeout(async () => {
		const loading = await isLoading;
		if (!loading) props.onFinish(isAuthenticated);
	}, 2500);

	return (
		<View style={styles.splashContainer}>
			<Image
				source={require('assets/icons/hop.png')}
				style={styles.hopAvatar}
			/>
			<Text style={styles.text}>Brewers Diary</Text>
		</View>
	);
};

export const styles = ScaledSheet.create({
	splashContainer: {
		width: '100%',
		height: '100%',
		backgroundColor: baseColors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	hopAvatar: {
		width: '12%',
		aspectRatio: 1,
	},
	text: {
		fontSize: baseSizes.text_modal_title,
		fontFamily: baseFonts.text_primary,
		marginTop: '12@s',
		color: baseColors.secondary,
		alignSelf: 'center',
	},
});

export default SplashScreen;
