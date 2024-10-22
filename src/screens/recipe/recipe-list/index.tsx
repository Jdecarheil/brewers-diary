import {Avatar, Text} from '@rneui/base';
import {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {RenderRecipes} from '@recipe-components/recipe-render';
import {useNhostClient} from '@nhost/react';
import {fetchRecipes} from '@api/queries/fetchRecipes';
import {Recipe} from '@global-types/recipe';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {NavBarButton, RecipeType} from '@constants/enum';
import {BottomBar} from '@nav-components/bottom-bar';
import {baseStyles} from '@styles/base';
import {Header} from '@header-components/header';
import {baseColors, baseSizes} from '@styles/constants';
import {RootStackParamList} from '@screens/stack-navigator';
import {Input} from '@ui-kitten/components';
import {s} from 'react-native-size-matters';
import {addRecipe} from '@api/mutations/addRecipe';

export type RecipeListScreenProps = StackScreenProps<
	RootStackParamList,
	'RecipeListScreen'
>;

export type RecipesActivityProps = {
	isPending: boolean;
	recipes: Recipe[] | undefined;
	search: string;
	updateSearch: (value: string) => void;
	goToRecipe: (recipe_id: number | undefined) => void;
};

export const RecipeListScreen: React.FC<RecipeListScreenProps> = (props) => {
	const isPublicList = props.route.params.type;
	const [search, setSearch] = useState('');
	const [userId, setUserId] = useState<string | undefined>();
	const [recipes, setRecipes] = useState<Recipe[]>();
	const client = useNhostClient();
	const queryClient = useQueryClient();

	const {status, isPending, error, data} = useQuery({
		queryKey: [
			'recipesKey',
			{
				search,
				userId,
				isPublic: isPublicList === RecipeType.PRIVATE ? false : true,
			},
		],
		queryFn: async () =>
			fetchRecipes(client, {
				isPublic: isPublicList === RecipeType.PRIVATE ? false : true,
			}),
	});

	const addNewRecipeMutation = useMutation({
		mutationFn: () => addRecipe(client),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['recipesKey']});
		},
	});

	if (error) {
		console.log('Error with query: ' + error);
	}

	useEffect(() => {
		if (status === 'success' && data.recipes) {
			setRecipes(data.recipes);
		}
	}, [status, data]);

	useEffect(() => {
		setUserId(client.auth.getUser()?.id);
	}, []);

	const updateSearch = (search: string) => {
		setSearch(search);
	};

	const goToRecipe = (recipe_id: number | undefined) => {
		if (recipes && recipe_id !== undefined) {
			let index = recipes.findIndex(function (item, i) {
				return item.recipe_id === recipe_id;
			});

			isPublicList === RecipeType.PRIVATE
				? props.navigation.push('RecipeScreen', {
						recipe: recipes[index],
				  })
				: props.navigation.push('RecipeOverviewScreen', {
						recipe: recipes[index],
				  });
		} else {
			console.log('Recipe could not be found by recipe id');
		}
	};

	const addNewRecipe = () => {
		addNewRecipeMutation.mutateAsync();
		if (recipes) goToRecipe(recipes[recipes?.length - 1].recipe_id);
		else
			console.log(
				"Can't find recipe id as there are no recipes registered",
			);
	};

	const handleNav = (value: NavBarButton) => {
		if (value === NavBarButton.LEFT)
			props.navigation.push('MyRecipesScreen');
		else if (value === NavBarButton.MIDDLE) {
			props.navigation.push('GetStartedScreen');
		} else if (value === NavBarButton.RIGHT)
			isPublicList === RecipeType.PRIVATE ? addNewRecipe() : null;
	};

	return (
		<View style={baseStyles.mainContainer}>
			<View style={styles.scrollViewMain}>
				<View style={baseStyles.headerContainer}>
					<Header title="Recipe Collection" />
				</View>
				<View style={styles.bodyContainer}>
					<RecipesActivity
						isPending={isPending}
						goToRecipe={goToRecipe}
						updateSearch={updateSearch}
						recipes={recipes}
						search={search}
					/>
				</View>
				<View style={baseStyles.footerContainer}>
					<BottomBar
						onPress={handleNav}
						left={{uri: require('assets/icons/export.png')}}
						middle={{uri: require('assets/icons/home.png')}}
						right={{uri: require('assets/icons/create.png')}}
					/>
				</View>
			</View>
		</View>
	);
};

export const RecipesActivity = (props: RecipesActivityProps) => {
	const {isPending, recipes, search, updateSearch, goToRecipe} = props;

	if (isPending)
		return (
			<View style={styles.activityLoadingContainer}>
				<ActivityIndicator size="large" color={baseColors.primary} />
			</View>
		);
	else {
		if (recipes) {
			return (
				<ScrollView
					style={styles.scrollView}
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.searchContainer}>
						<Input
							value={search}
							label="Filter Recipes"
							textStyle={{color: baseColors.primary}}
							placeholder="Place your Text"
							accessoryLeft={
								<Avatar
									source={require('assets/icons/search.png')}
									size={baseStyles.windowSpecs.height / 28}
								/>
							}
							onChangeText={(nextValue) =>
								updateSearch(nextValue)
							}
						/>
					</View>
					<View style={styles.recipesContainer}>
						<RenderRecipes
							recipes={recipes}
							goToRecipe={goToRecipe}
						/>
					</View>
				</ScrollView>
			);
		} else {
			return (
				<View style={styles.noRecipeContainer}>
					<Text style={styles.text}>No recipes to show yet</Text>
					<Avatar
						source={require('assets/icons/page.png')}
						size={s(30)}
					/>
				</View>
			);
		}
	}
};

export const styles = StyleSheet.create({
	activityLoadingContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	bodyContainer: {
		...baseStyles.bodyContainer,
		width: '90%',
		alignSelf: 'center',
	},
	scrollView: {
		backgroundColor: baseColors.secondary,
		height: '100%',
	},
	scrollViewMain: {
		flex: 2,
	},
	searchBar: {
		color: baseColors.primary,
		marginTop: 20,
		width: '100%',
		backgroundColor: baseColors.quaternary,
	},
	searchContainer: {
		width: '100%',
		flex: 1,
		marginTop: s(10),
	},
	recipesContainer: {
		flex: 1,
		marginTop: s(10),
	},
	text: {
		color: baseColors.primary,
		fontSize: baseSizes.text_subtext,
		alignSelf: 'center',
		marginBottom: 15,
	},
	searchBarContainer: {
		flexDirection: 'row',
	},
	noRecipeContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
