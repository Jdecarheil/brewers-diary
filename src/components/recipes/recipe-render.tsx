import {Avatar, Text} from '@rneui/base';
import {baseColors, baseFonts, baseSizes} from '@styles/constants';
import {Recipe} from '@global-types/recipe';
import {Alert, Image, StyleSheet, View} from 'react-native';
import {baseStyles} from '@styles/base';
import {useNhostClient} from '@nhost/react';
import {fetchProfile} from '@api/queries/fetchProfile';
import {s} from 'react-native-size-matters';
import {useState} from 'react';
import {deleteRecipe} from '@api/mutations/deleteRecipe';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {TouchableOpacity} from 'react-native';
import {DialogBox} from '@generic-components/dialog';
import {ButtonComponent as Button} from '@generic-components/button';

export type RecipeContainerProps = {
	removeRecipe: (recipe_id: number | undefined) => void;
	recipe: Recipe;
	index: number;
};

export type RenderRecipesProps = {
	goToRecipe: (index: number | undefined) => void;
	recipes: Recipe[];
};

export const RenderRecipes = (props: RenderRecipesProps) => {
	const {goToRecipe, recipes} = props;
	const client = useNhostClient();
	const [errorAlert, setErrorAlert] = useState(false);
	const queryClient = useQueryClient();
	const image = fetchProfile(client);

	const deleteRecipeMutation = useMutation({
		mutationFn: (recipe_id: number) => deleteRecipe(client, recipe_id ?? 0),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['recipesKey']});
		},
	});

	const removeRecipe = (recipe_id: number | undefined) => {
		if (recipe_id) {
			deleteRecipeMutation.mutateAsync(recipe_id);
		} else {
			setErrorAlert(true);
			console.log('Unable to find a recipe id');
		}
	};

	if (errorAlert) {
		Alert.alert('Something went wrong, recipe was unable to be deleted');
		setErrorAlert(false);
	}

	if (recipes) {
		return recipes.map((recipe, index) => {
			return (
				<TouchableOpacity
					key={index}
					onPress={() => goToRecipe(recipe.recipe_id)}
				>
					<RecipeContainer
						key={index}
						index={index}
						recipe={recipe}
						removeRecipe={removeRecipe}
					/>
				</TouchableOpacity>
			);
		});
	} else {
		return <Text style={styles.noRecipesText}>No recipes added yet</Text>;
	}
};

export const RecipeContainer = (props: RecipeContainerProps) => {
	const {recipe, removeRecipe, index} = props;
	const [recipeOptionsOpen, setRecipeOptionsOpen] = useState(false);

	const handleRecipeOptions = (value: boolean) => {
		setRecipeOptionsOpen(value);
	};

	return (
		<View key={index} style={styles.recipeRowContainer}>
			<View style={styles.avatarContainer}>
				<Image
					source={{
						uri: 'https://randomuser.me/api/portraits/men/36.jpg',
					}}
					style={styles.recipeAvatar}
				/>
			</View>
			<View style={styles.contentContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.titleText}>Pale Ale</Text>
					<Text style={styles.subTitleText}>
						A lighter bodied beer
					</Text>
				</View>
				<View style={styles.specsContainer}>
					<Text style={styles.specText}>Ibu: 4</Text>
					<Text style={styles.specText}>
						Vol: {recipe.fermentable_volume}
					</Text>
					<Text style={styles.specText}>Color: 5</Text>
				</View>
			</View>
			<View style={styles.deleteContainer}>
				<TouchableOpacity
					onPress={() => {
						handleRecipeOptions(true);
					}}
				>
					<Avatar
						source={require('assets/icons/dots.png')}
						size={s(20)}
					/>
				</TouchableOpacity>
			</View>
			<DialogBox
				children={[
					<Button
						title={'Publish Recipe'}
						buttonStyle={{backgroundColor: baseColors.primary}}
						onPress={() => removeRecipe(recipe.recipe_id)}
					/>,
					<Button
						title={'Copy Recipe'}
						buttonStyle={{backgroundColor: baseColors.primary}}
						onPress={() => removeRecipe(recipe.recipe_id)}
					/>,
					<Button
						title={'Remove Recipe'}
						buttonStyle={{
							backgroundColor: baseColors.input_placeholder,
						}}
						onPress={() => removeRecipe(recipe.recipe_id)}
					/>,
					<Button
						title={'Exit'}
						buttonStyle={{
							backgroundColor: baseColors.input_placeholder,
						}}
						onPress={() => handleRecipeOptions(false)}
					/>,
				]}
				isVisible={recipeOptionsOpen}
				title={'Recipe Options'}
				onCancel={handleRecipeOptions}
				onPress1={() => {}}
			/>
		</View>
	);
};

export const styles = StyleSheet.create({
	recipeRowContainer: {
		flexDirection: 'row',
		height: s(70),
		marginTop: '1.5%',
	},
	deleteContainer: {
		justifyContent: 'center',
	},
	textContainer: {
		flex: 1,
	},
	avatarContainer: {
		flex: 1,
		resizeMode: 'contain',
	},
	recipeAvatar: {
		aspectRatio: 1,
		height: '100%',
		...baseStyles.imageDressing,
	},
	deleteButton: {
		minHeight: '100%',
		backgroundColor: 'red',
	},
	contentContainer: {
		flex: 2.4,
	},
	titleContainer: {
		flex: 1,
	},
	titleText: {
		fontSize: baseSizes.text_subtext,
		fontFamily: baseFonts.text_primary,
		fontWeight: '700',
	},
	dateAddedText: {
		alignSelf: 'flex-end',
		flex: 1,
	},
	subTitleText: {},
	subtitleContainer: {},
	subtextContainer: {},
	specsContainer: {
		flexDirection: 'row',
	},
	specText: {
		flex: 1,
		color: baseColors.primary,
		fontSize: baseSizes.text_spec_text,
	},
	noRecipesText: {
		alignSelf: 'center',
		marginTop: 20,
	},
});
