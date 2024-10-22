import {StyleSheet, Text, View} from 'react-native';
import {baseStyles} from 'styles/base';
import {baseColors, baseSizes} from 'styles/constants';

export type TileProps = {
	title: string;
	value: string;
};

export const Tile = (props: TileProps) => {
	const {title, value} = props;
	return (
		<View style={styles.tileOuterContainer}>
			<View style={styles.topSection}>
				<Text style={styles.titleText}>{title}</Text>
			</View>
			<View style={styles.bottomSection}>
				<Text style={styles.valueText}>{value}</Text>
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	tileOuterContainer: {
		backgroundColor: baseColors.tertiary,
		width: baseStyles.windowSpecs.width / 4,
		height: baseStyles.windowSpecs.width / 4,
		alignSelf: 'center',
		borderRadius: 16,
	},
	topSection: {
		...baseStyles.setMiddleContainer,
	},
	bottomSection: {
		...baseStyles.setMiddleContainer,
		flex: 0.8,
		backgroundColor: baseColors.primary,
		borderBottomLeftRadius: 16,
		borderBottomRightRadius: 16,
		alignItems: 'center',
	},
	titleText: {
		color: baseColors.primary,
		fontSize: baseSizes.text_details,
		fontWeight: '700',
	},
	valueText: {
		color: baseColors.quaternary,
		fontSize: baseSizes.text_subtext,
	},
});
