import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

export const FlagImage = () => {
	const {i18n} = useTranslation();
	const val = i18n.getDataByLanguage(i18n.language);

	return (
		<Image
			style={styles.flagStyle}
			aria-label="country-flag"
			source={val ? val['image'] : require('@assets/flags/uk.png')}
		/>
	);
};

export const styles = ScaledSheet.create({
	flagStyle: {
		height: '50%',
		aspectRatio: 1,
	},
});
