import {StyleSheet, Text, View} from 'react-native';
import {RecipeStatRowProps} from '@recipe-editable-types/types';
import {Avatar} from '@rneui/base';
import {baseStyles} from '@styles/base';

export const RecipeStatRow = (props: RecipeStatRowProps) => {
	const {value, title, icon} = props;

	return (
		<View style={styles.container}>
			<View style={styles.avatarContainer}>
				<Avatar
					source={icon}
					size={baseStyles.windowSpecs.height / 60}
				/>
			</View>
			<View style={styles.titleContainer}>
				<Text>{title}</Text>
			</View>
			<View style={styles.valueContainer}>
				<Text>{value}</Text>
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderColor: '#F0F0F0',
		flexDirection: 'row',
		marginTop: '1%',
		maxWidth: '95%',
	},
	avatarContainer: {
		flex: 1,
		alignItems: 'center',
	},
	titleContainer: {
		flex: 7,
		alignItems: 'flex-start',
	},
	valueContainer: {
		flex: 2,
		alignItems: 'flex-end',
	},
});
