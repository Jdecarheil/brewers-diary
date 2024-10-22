import {StyleSheet, Text, View} from 'react-native';
import {TitleRowProps} from '@recipe-editable-types/types';
import {baseColors, baseSizes} from '@styles/constants';
import {TouchableOpacity} from 'react-native';

export const TitleRow = (props: TitleRowProps) => {
	const {left, middle, right, onPress} = props;
	return (
		<View style={styles.titleContainer}>
			<View style={styles.titleInnerContainer}>
				{left ? (
					<TouchableOpacity>
						<Text
							style={styles.addIcon}
							onPress={() =>
								onPress ? onPress(true, false) : null
							}
						>
							+
						</Text>
					</TouchableOpacity>
				) : null}
			</View>
			<View style={styles.titleInnerContainer}>
				<Text style={styles.titleText}>{middle}</Text>
			</View>
			<View style={styles.titleInnerContainer}>
				{<Text style={styles.detailsText}>{right}</Text>}
			</View>
		</View>
	);
};
export const styles = StyleSheet.create({
	titleContainer: {
		backgroundColor: baseColors.tertiary,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		marginTop: '3%',
		width: '90%',
		minHeight: '4%',
		alignSelf: 'center',
		flexDirection: 'row',
	},
	titleInnerContainer: {
		flex: 1,
		alignItems: 'center',
	},
	titleText: {
		color: baseColors.primary,
		fontSize: baseSizes.text_details,
		fontWeight: '700',
	},
	addIcon: {
		color: baseColors.primary,
		fontSize: baseSizes.text_modal_title,
	},
	detailsText: {
		color: baseColors.primary,
	},
});
