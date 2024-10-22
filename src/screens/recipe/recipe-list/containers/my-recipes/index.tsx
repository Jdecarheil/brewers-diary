import {Avatar, Text} from '@rneui/base';
import {useEffect, useState} from 'react';
import {
	ActivityIndicator,
	StyleSheet,
	View,
	useWindowDimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../stack-navigator';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {RenderRecipes} from '@recipe-components/recipe-render';
import {useNhostClient} from '@nhost/react';
import {fetchRecipes} from '@api/queries/fetchRecipes';
import {Recipe} from '@global-types/recipe';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {NavBarButton} from '@constants/enum';
import {BottomBar} from '@nav-components/bottom-bar';
import {baseStyles} from '@styles/base';
import {Header} from '@header-components/header';
import {TextInput} from '@generic-components/text-input';
import {baseColors, baseSizes} from '@styles/constants';

export type RecipesScreenProps = StackScreenProps<
	RootStackParamList,
	'MyRecipesScreen'
>;

const MyRecipesScreen: React.FC<RecipesScreenProps> = (props) => {
	const [search, setSearch] = useState('');
	const [userId, setUserId] = useState<string | undefined>();
	const [index, setIndex] = React.useState(0);
	const insets = useSafeAreaInsets();
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedIndexes, setSelectedIndexes] = useState([0, 2, 3]);
	const vs = useWindowDimensions().width;
	const [recipes, setRecipes] = useState<Recipe[]>();

	const client = useNhostClient();

	const queryClient = useQueryClient();

	const {status, isPending, error, data} = useQuery({
		queryKey: ['recipesKey', {search, userId, isPublic: false}],
		queryFn: async () => fetchRecipes(client, {isPublic: false}),
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

	// if (isPending) return <Text>No recipes</Text>

	const updateSearch = (search: string) => {
		setSearch(search);
	};

	// const addRecipe = (index: number | undefined) => {
	//   if (recipes && index !== undefined) {
	//     recipeIndex(index);
	//     props.navigation.push('RecipeScreen');
	//   }
	// };

	const goToRecipe = (recipe_id: number | undefined) => {
		if (recipes && recipe_id !== undefined) {
			let index = recipes.findIndex(function (item, i) {
				return item.recipe_id === recipe_id;
			});

			props.navigation.push('RecipeScreen', {recipe: recipes[index]});
		} else {
			console.log('Recipe could not be found by recipe id');
		}
	};

	const handleNav = (value: NavBarButton) => {
		if (value === NavBarButton.LEFT)
			props.navigation.push('MyRecipesScreen');
		else if (value === NavBarButton.MIDDLE) {
			props.navigation.push('GetStartedScreen');
		} else if (value === NavBarButton.RIGHT) '';
	};

	const RecipesActivity = () => {
		if (isPending)
			return (
				<ActivityIndicator
					size="large"
					color={baseColors.primary}
					style={styles.loading}
				/>
			);
		else {
			if (recipes) {
				return (
					<ScrollView
						style={styles.scrollView}
						showsVerticalScrollIndicator={false}
					>
						<RenderRecipes
							recipes={recipes}
							goToRecipe={goToRecipe}
						/>
					</ScrollView>
				);
			} else {
				return <Text style={styles.text}>No recipes to show yet</Text>;
			}
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header title="Recipe Collection" />
			</View>
			<View style={styles.body}>
				<View style={styles.searchContainer}>
					<TextInput
						style={styles.searchBar}
						onChange={() => {}}
						value="Search Recipes"
						placeholder="Enter recipe name"
					/>
				</View>
				<RecipesActivity />
			</View>
			<View style={styles.bottomBar}>
				<BottomBar
					onPress={handleNav}
					left={{uri: require('assets/icons/export.png')}}
					middle={{uri: require('assets/icons/home.png')}}
					right={{uri: require('assets/icons/create.png')}}
				/>
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	header: {
		flex: 1.1,
	},
	bottomBar: {
		flex: 0.5,
	},
	body: {
		flex: 5,
		width: '90%',
		alignSelf: 'center',
		backgroundColor: baseColors.secondary,
	},
	container: {
		flex: 1,
		backgroundColor: baseColors.secondary,
	},
	scrollView: {
		backgroundColor: baseColors.secondary,
	},
	searchBar: {
		marginTop: 20,
		width: '100%',
		backgroundColor: baseColors.quaternary,
	},
	searchContainer: {
		width: '100%',
		alignItems: 'center',
	},
	text: {
		color: baseColors.secondary,
		fontSize: baseSizes.text_subtext,
		alignSelf: 'center',
	},
	loading: {},
});
export default MyRecipesScreen;
