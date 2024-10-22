import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {baseStyles} from '@styles/base';

export const Footer = () => {
	return <View style={styles.footerContainer}></View>;
};

export const styles = ScaledSheet.create({
	footerContainer: {
		...baseStyles.footerContainer,
		height: baseStyles.windowSpecs.height / 10,
		zIndex: 4,
		bottom: 0,
	},
});
