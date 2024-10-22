import {Image, StyleSheet, Text, View} from 'react-native';
import {baseStyles} from '@styles/base';
import {baseColors, baseSizes} from '@styles/constants';

export type RecipeHeaderProps = {
	title: string;
	dateAdded: string;
	description: string;
	imageUrl: string;
};

export const RecipeHeader = (props: RecipeHeaderProps) => {
	const {title, dateAdded, description, imageUrl} = props;

	return (
		<View style={styles.headerContainer}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					resizeMode="cover"
					source={{uri: imageUrl}}
				/>
			</View>
			<View style={styles.contentContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.description}>{dateAdded}</Text>
					<Text style={styles.dateAdded}>{description}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	headerContainer: {
		...baseStyles.headerContainer,
		flexDirection: 'row',
	},
	title: {
		fontSize: baseSizes.text_modal_title,
		color: baseColors.text_primary,
	},
	description: {
		fontSize: baseSizes.text_spec_text,
		color: baseColors.text_primary,
	},
	dateAdded: {
		fontSize: baseSizes.text_spec_text,
		color: baseColors.text_primary,
	},
	heading: {
		color: 'white',
		fontSize: 22,
		fontWeight: 'bold',
	},
	headerRight: {
		display: 'flex',
		flexDirection: 'row',
		marginTop: 5,
	},
	subheaderText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold',
	},
	image: {
		flex: 1,
		aspectRatio: 1,
		height: '60%',
		margin: '15%',
		borderRadius: 10,
		borderWidth: 0.5,
		borderColor: 'white',
	},
	imageContainer: {
		flex: 2,
	},
	contentContainer: {
		flex: 4,
		justifyContent: 'center',
	},
	textContainer: {
		flexDirection: 'column',
	},
});
