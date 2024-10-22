import {ReactNode} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {baseSizes, text_styles} from '@styles/constants';
import {Avatar} from '@rneui/base';
import {ScaledSheet, s} from 'react-native-size-matters';
import {baseStyles} from '@styles/base';

export type NavRowContainerProps = {
	onPress: () => void;
	title: string;
	subTitle: string;
	icon: ReactNode;
	testID: string;
};

export const NavRowContainer = (props: NavRowContainerProps) => {
	const {onPress, title, subTitle, icon, testID} = props;

	return (
		<View style={styles.mainContainer}>
			<View style={styles.iconContainer}>{icon}</View>

			<View style={styles.textContainer}>
				<Text style={styles.title} testID={testID + '-row-title'}>
					{title}
				</Text>
				<Text style={styles.subtitle} testID={testID + '-row-subtitle'}>
					{subTitle}
				</Text>
			</View>

			<View style={styles.chevron}>
				<TouchableOpacity onPress={onPress}>
					<Image
						source={require('@assets/icons/chevron.png')}
						aria-label={testID + '-chevron-icon'}
						style={[baseStyles.inputIcon, {height: '50%'}]}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export const styles = ScaledSheet.create({
	mainContainer: {
		flexDirection: 'row',
		flex: 1,
		zIndex: 999,
	},
	iconContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textContainer: {
		flex: 3,
		justifyContent: 'center',
	},
	subtitle: {
		color: text_styles.title_color,
		fontSize: baseSizes.text_details,
	},
	title: {
		color: text_styles.title_color,
		fontWeight: 'bold',
		fontSize: baseSizes.text_details,
	},
	chevron: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
