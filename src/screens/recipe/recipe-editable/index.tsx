import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../../stack-navigator';
import {Avatar} from '@rneui/base';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {baseColors} from '@styles/constants';
import {
	DetailsProps,
	IngredientProp,
	IngredientProps,
	ProcessProps,
	RenderTilesProp,
} from './types/types';
import {BiternessFormula, NavBarButton, RecipeType} from '@constants/enum';
import {calcIBU} from '@lib/calculators/ibu';
import {useNhostClient} from '@nhost/react';
import {baseStyles} from '@styles/base';
import {Tile} from '@recipe-editable-components/tile';
import {TextInput} from '@generic-components/text-input';
import {RecipeStatRow} from '@recipe-components/recipe-stat-row';
import {BottomBar} from '@nav-components/bottom-bar';
import {ButtonComponent as Button} from '@generic-components/button';
import {FermentableModal} from './components/modals/fermentable-modal';
import {TitleRow} from '../../../components/recipes/title-row';
import {YeastModal} from './components/modals/yeast-modal';
import {AdditiveModal} from './components/modals/additive-modal';
import {HopModal} from './components/modals/hop-modal';
import {Tab, TabView} from '@ui-kitten/components';
import {Yeast} from '@global-types/yeast';
import {Fermentable} from '@global-types/fermentable';
import {Additive} from '@global-types/additive';
import {Hop} from '@global-types/hop';
import {calculatePPG} from '@lib/calculators/ppg';
import {calcFG, calcOG} from '@lib/calculators/gravity';
import {RecipeHeader} from '@header-components/recipe-header';
import {calcAbv} from '@lib/calculators/abv';
import {calcColor} from '@lib/calculators/color';
import {boilOffCalc} from '@lib/calculators/boil-off';
import {fetchRecipeImage} from '@api/queries/fetchRecipeImage';

export type RecipeScreenProps = StackScreenProps<
	RootStackParamList,
	'RecipeScreen'
>;

export const RecipeScreen: React.FC<RecipeScreenProps> = (props) => {
	const {recipe} = props.route.params;
	const [fermentables, setFermentables] = useState(recipe.fermentables);
	const [additives] = useState(recipe.additives);
	const [originalGravity, setOriginalGravity] = useState(1.0);
	const [finalGravity, setFinalGravity] = useState(1.0);
	const [boilOff, setBoilOff] = useState(0);
	const [abv, setAbv] = useState(0.0);
	const [ebc, setEbc] = useState('0');
	const [ibu, setIbu] = useState(0);
	const [mashVolume, setMashVolume] = useState(0);
	const [spargeVolume, setSpargeVolume] = useState(0);
	const [strikeWaterVolume, setStrikeWaterVolume] = useState(0);
	const [bugu, setBugu] = useState(0);
	const [totalWeight, setTotalWeight] = useState<number>(0);
	const [preBoilGravity] = useState(1.035);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const client = useNhostClient();

	const saveRecipe = () => {};

	useEffect(() => {
		fetchRecipeImage(client, recipe.image_id);
	}, []);

	const handleNav = (value: NavBarButton) => {
		if (value === NavBarButton.LEFT)
			props.navigation.push('RecipeListScreen', {
				type: RecipeType.PRIVATE,
			});
		else if (value === NavBarButton.MIDDLE) saveRecipe();
		else if (value === NavBarButton.RIGHT)
			props.navigation.push('BrewingSessionsScreen', {recipe: recipe});
	};

	useEffect(() => {
		if (recipe.fermentables.length !== 0) {
			let weight = 0;
			fermentables.map((fermentable) => {
				weight += fermentable.weight;
				return;
			});

			setTotalWeight(weight);
		}
	}, []);

	useEffect(() => {
		if (recipe.fermentables.length !== 0 && recipe) {
			const newFermentableArray = fermentables.map((fermentable) => {
				let calculatedPpg = calculatePPG(fermentable);
				if (fermentable.max_ppg === calculatedPpg) {
					return {...fermentable, max_ppg: calculatedPpg};
				} else return fermentable;
			});
			setFermentables(newFermentableArray);
			setOriginalGravity(calcOG(fermentables, recipe.fermentable_volume));
			setEbc(
				calcColor(fermentables, additives, recipe.fermentable_volume),
			);
			setIbu(calcIBU(recipe, BiternessFormula.TINSETH, preBoilGravity));
		}
	}, [recipe]);

	useEffect(() => {
		setAbv(calcAbv(originalGravity, finalGravity));
	}, [originalGravity, finalGravity]);

	useEffect(() => {
		if (recipe.yeasts.length !== 0) {
			setFinalGravity(
				calcFG(originalGravity, recipe.yeasts[0], recipe.mash_temp),
			);
		}
	}, [originalGravity]);

	useEffect(() => {
		if (ibu > 0 && originalGravity > 1) {
			setBugu((ibu * 100) / (originalGravity * 1000 - 1000));
		}
	}, [ibu, originalGravity]);

	useEffect(() => {
		if (recipe) {
			setBoilOff(boilOffCalc(recipe.boil_duration, recipe.kettle_size));
		}
	}, [recipe.boil_duration, recipe.kettle_size]);

	useEffect(() => {
		if (recipe) {
			let weight = totalWeight / 1000;
			let mashWater = weight * recipe.grist_ratio;
			let waterLoss = weight * 1.004;
			let result =
				recipe.fermentable_volume - (mashWater - waterLoss - boilOff);
			setSpargeVolume(result);
			setMashVolume(strikeWaterVolume + weight * 0.6);
			setStrikeWaterVolume(mashWater);
		}
	}, []);

	useEffect(() => {
		setMashVolume(strikeWaterVolume + totalWeight / 1000);
	}, [strikeWaterVolume]);

	useEffect(() => {
		if (recipe) {
			setSpargeVolume(
				recipe.fermentable_volume +
					boilOff -
					(totalWeight / 1000) * 1.04,
			);
		}
	}, []);

	return (
		<View style={baseStyles.mainContainer}>
			<View style={baseStyles.headerContainer}>
				<RecipeHeader
					imageUrl={'assets/icons/return.png'}
					title={recipe.name ?? 'Unamed Recipe'}
					dateAdded={recipe.date_added}
					description={recipe.notes}
				/>
			</View>
			<View style={baseStyles.bodyContainer}>
				<TabView
					selectedIndex={selectedIndex}
					onSelect={(index) => setSelectedIndex(index)}
					style={{}}
					indicatorStyle={{backgroundColor: baseColors.primary}}
				>
					<Tab title="Details">
						<Details
							finalGravity={finalGravity}
							mashVolume={mashVolume}
							strikeWaterVolume={strikeWaterVolume}
							spargeVolume={spargeVolume}
							preboilVolume={recipe.fermentable_volume + boilOff}
							recipe={recipe}
							ibu={ibu}
							bugu={bugu}
							abv={abv}
							ebc={ebc}
							originalGravity={originalGravity}
						/>
					</Tab>
					<Tab
						title={
							<Text style={styles.tabViewText}>Ingredients</Text>
						}
					>
						<Ingredients recipe={recipe} />
					</Tab>
					<Tab title="Process">
						<Process recipe={recipe} />
					</Tab>
				</TabView>
			</View>
			<View style={baseStyles.footerContainer}>
				<BottomBar
					onPress={handleNav}
					left={{uri: require('assets/icons/return.png')}}
					middle={{uri: require('assets/icons/save.png')}}
					right={{uri: require('assets/icons/keg.png')}}
				/>
			</View>
		</View>
	);
};

export const RenderTile = (props: RenderTilesProp) => {
	const {value, title} = props;
	return (
		<View style={styles.tileContainer}>
			<Tile value={value} title={title} />
		</View>
	);
};

export const Details = (props: DetailsProps) => {
	const {
		recipe,
		ibu,
		abv,
		ebc,
		finalGravity,
		originalGravity,
		bugu,
		preboilVolume,
		mashVolume,
		strikeWaterVolume,
		spargeVolume,
	} = props;
	return (
		<ScrollView>
			<TitleRow left={false} middle="Specifications" right="" />
			<View style={styles.tileRow}>
				<RenderTile value={abv.toString() + '%'} title="ABV" />
				<RenderTile value={originalGravity.toString()} title="O.G" />
				<RenderTile value={finalGravity.toString()} title="F.G" />
			</View>
			<View style={styles.tileRow}>
				<RenderTile
					value={(ibu * 100).toFixed(0).toString()}
					title="IBU"
				/>
				<RenderTile value={ebc.toString()} title="EBC" />
				<RenderTile value={bugu.toFixed(2).toString()} title="BU/GU" />
			</View>

			<TitleRow left={false} middle="Recipe Name" right="" />

			<View style={styles.nameInputContainer}>
				<TextInput
					onChange={() => {}}
					value="dwd"
					placeholder="Enter recipe name"
				/>
			</View>

			<TitleRow left={false} middle="Volumes" right="" />

			<View style={styles.recipeStatRowContainer}>
				<RecipeStatRow
					title="Batch volume"
					value={recipe.fermentable_volume.toString() + 'L'}
					icon={require('assets/icons/dot.png')}
				/>
				<RecipeStatRow
					title="Mash Volume"
					value={mashVolume + 'L'}
					icon={require('assets/icons/dot.png')}
				/>
				<RecipeStatRow
					title="Strike Water Volume"
					value={strikeWaterVolume + 'L'}
					icon={require('assets/icons/dot.png')}
				/>
				<RecipeStatRow
					title="Sparge water"
					value={spargeVolume + 'L'}
					icon={require('assets/icons/dot.png')}
				/>
				<RecipeStatRow
					title="Boilable volume"
					value={preboilVolume.toString() + 'L'}
					icon={require('assets/icons/dot.png')}
				/>
				<RecipeStatRow
					title="Total water"
					value={recipe.fermentable_volume.toString()}
					icon={require('assets/icons/dot.png')}
				/>
			</View>
			<TitleRow left={false} middle="General" right="" />
			<View style={styles.recipeStatRowContainer}>
				<RecipeStatRow
					title="Boil time"
					value={recipe.boil_duration.toString()}
					icon={require('assets/icons/dot.png')}
				/>
				<RecipeStatRow
					title="Brehouse efficiency"
					value={abv.toString() + '%'}
					icon={require('assets/icons/dot.png')}
				/>
				<RecipeStatRow
					title="Mash efficiency"
					value={ebc.toString()}
					icon={require('assets/icons/dot.png')}
				/>
				<RecipeStatRow
					title="Pre-Boil gravity"
					value={originalGravity.toString()}
					icon={require('assets/icons/dot.png')}
				/>
				<RecipeStatRow
					title="Boilable volume"
					value={preboilVolume.toString()}
					icon={require('assets/icons/dot.png')}
				/>
			</View>

			<Button
				title="Delete"
				buttonStyle={styles.deleteButton}
				containerStyle={styles.deleteButtonContainer}
			/>
			{/* <View>{renderIndex(recipe)}</View> */}
		</ScrollView>
	);
};

export const Ingredients = (props: IngredientProps) => {
	const {recipe} = props;
	const [showFermentableModal, setShowFermentableModal] = useState(false);
	const [showHopModal, setShowHopModal] = useState(false);
	const [showAdditionModal, setShowAdditionModal] = useState(false);
	const [showYeastModal, setShowYeastModal] = useState(false);
	const [updateFermentable, setUpdateFermentable] = useState<
		Fermentable | undefined
	>();
	const [updateYeast, setUpdateYeast] = useState<Yeast | undefined>();
	const [updateAdditive, setUpdateAdditive] = useState<
		Additive | undefined
	>();
	const [updateHop, setUpdateHop] = useState<Hop | undefined>();

	const handleShowAddFermentable = (
		show: boolean,
		isUpdate: boolean,
		index?: number,
	) => {
		if (isUpdate && index && !isNaN(index))
			setUpdateFermentable(recipe.fermentables[index]);
		else {
			setUpdateFermentable(undefined);
		}
		show ? setShowFermentableModal(true) : setShowFermentableModal(false);
	};

	const handleShowAddYeast = (
		show: boolean,
		isUpdate: boolean,
		index?: number,
	) => {
		isUpdate && index
			? setUpdateYeast(recipe.yeasts[index])
			: setUpdateYeast(undefined);
		show ? setShowYeastModal(true) : setShowYeastModal(false);
	};

	const handleShowAddAddition = (
		show: boolean,
		isUpdate: boolean,
		index?: number,
	) => {
		isUpdate && index
			? setUpdateAdditive(recipe.additives[index])
			: setUpdateAdditive(undefined);
		show ? setShowAdditionModal(true) : setShowAdditionModal(false);
	};

	const handleShowAddHop = (
		show: boolean,
		isUpdate: boolean,
		index?: number,
	) => {
		isUpdate && index
			? setUpdateHop(recipe.hops[index])
			: setUpdateHop(undefined);
		show ? setShowHopModal(true) : setShowHopModal(false);
	};

	return (
		<ScrollView>
			<TitleRow
				left={true}
				middle="Fermentables"
				right="4kg"
				onPress={handleShowAddFermentable}
			/>
			{recipe.fermentables.map((fermentable, index) => {
				return (
					<Ingredient
						key={index}
						icon={require('assets/icons/grain.png')}
						clickedRow={handleShowAddFermentable}
						index={index}
						title={fermentable.name}
						subText={fermentable.type + ' | ' + fermentable.brand}
						amount={fermentable.weight}
						ratio={20}
					/>
				);
			})}
			<TitleRow
				left={true}
				middle="Hops"
				right="4kg"
				onPress={handleShowAddHop}
			/>
			{recipe.hops.map((hop, index) => {
				return (
					<Ingredient
						key={index}
						icon={require('assets/icons/hop-ing.png')}
						clickedRow={handleShowAddHop}
						index={index}
						title={hop.name}
						subText={hop.type + ' | ' + hop.brand}
						amount={hop.weight}
						ratio={20}
					/>
				);
			})}
			<TitleRow
				left={true}
				middle="Yeast"
				right="4kg"
				onPress={handleShowAddYeast}
			/>
			{recipe.yeasts.map((yeast, index) => {
				return (
					<Ingredient
						key={index}
						icon={require('assets/icons/yeast.png')}
						clickedRow={handleShowAddYeast}
						index={index}
						title={yeast.name}
						subText={yeast.type + ' | ' + yeast.brand}
						amount={yeast.weight}
						ratio={20}
					/>
				);
			})}
			<TitleRow
				left={true}
				middle="Addition"
				right="4kg"
				onPress={handleShowAddAddition}
			/>
			{recipe.additives.map((additive, index) => {
				return (
					<Ingredient
						key={index}
						icon={require('assets/icons/salt.png')}
						clickedRow={handleShowAddAddition}
						index={index}
						title={additive.name}
						subText={additive.addition + ' | ' + additive.brand}
						amount={additive.weight}
						ratio={20}
					/>
				);
			})}

			{showFermentableModal ? (
				<FermentableModal
					fermentable={updateFermentable}
					recipe_id={recipe.recipe_id}
					onCancel={handleShowAddFermentable}
					isVisible={showFermentableModal}
				/>
			) : null}
			{showYeastModal ? (
				<YeastModal
					yeast={updateYeast}
					recipe_id={recipe.recipe_id}
					onCancel={handleShowAddYeast}
					isVisible={showYeastModal}
				/>
			) : null}
			{showAdditionModal ? (
				<AdditiveModal
					additive={updateAdditive}
					recipe_id={recipe.recipe_id}
					onCancel={handleShowAddAddition}
					isVisible={showAdditionModal}
				/>
			) : null}
			{showHopModal ? (
				<HopModal
					hop={updateHop}
					recipe_id={recipe.recipe_id}
					onCancel={handleShowAddHop}
					isVisible={showHopModal}
				/>
			) : null}
		</ScrollView>
	);
};

export const Process = (props: ProcessProps) => {
	const {recipe} = props;

	return (
		<ScrollView>
			<TitleRow left={false} middle="Mash Specs" />
			<View style={styles.recipeStatRowContainer}>
				<RecipeStatRow
					title="Batch volume"
					value={'dwd'}
					icon={require('assets/icons/dot.png')}
				/>
			</View>

			<TitleRow left={false} middle="Sparge Specs" />
			<View style={styles.recipeStatRowContainer}>
				<RecipeStatRow
					title="Batch volume"
					value={'dwd'}
					icon={require('assets/icons/dot.png')}
				/>
			</View>

			<TitleRow left={false} middle="Fermentation Specs" />
			<View style={styles.recipeStatRowContainer}>
				<RecipeStatRow
					title="Batch volume"
					value={'dwd'}
					icon={require('assets/icons/dot.png')}
				/>
			</View>

			<TitleRow left={false} middle="Boil Specs" />
			<View style={styles.recipeStatRowContainer}>
				<RecipeStatRow
					title="Batch volume"
					value={'dwd'}
					icon={require('assets/icons/dot.png')}
				/>
			</View>
		</ScrollView>
	);
};

export const Ingredient = (props: IngredientProp) => {
	const {title, subText, icon, amount, ratio, clickedRow, index} = props;
	return (
		<TouchableOpacity
			style={styles.ingredientContainer}
			onPress={() => clickedRow(true, true, index)}
		>
			<View style={styles.avatar}>
				<Avatar
					source={icon}
					size={baseStyles.windowSpecs.height / 20}
				/>
			</View>
			<View style={styles.textContainer}>
				<View>
					<Text style={styles.fermentableTitle}>{title}</Text>
				</View>
				<View>
					<Text>{subText}</Text>
				</View>
			</View>
			<View style={styles.detailsContainer}>
				<View>
					<Text style={styles.fermentableAmount}>
						{amount * 0.001 + ' kg'}
					</Text>
				</View>
				<View>
					<Text>{ratio}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export const styles = StyleSheet.create({
	tileContainer: {
		flex: 1,
		alignSelf: 'center',
	},
	tileRow: {
		flexDirection: 'row',
		flex: 1,
		marginTop: 20,
	},
	nameInputContainer: {
		flex: 1,
		width: '90%',
		alignSelf: 'center',
		marginTop: 20,
	},
	recipeStatRowContainer: {
		flex: 1,
		marginTop: 10,
		width: '90%',
		alignSelf: 'center',
	},
	deleteButton: {
		backgroundColor: 'red',
	},
	deleteButtonContainer: {
		width: '90%',
		marginTop: '5%',
		marginBottom: '3%',
		backgroundColor: 'red',
		alignSelf: 'center',
	},
	tabView: {
		flex: 8,
	},
	ingredientContainer: {
		flexDirection: 'row',
		width: '90%',
		flex: 1,
		alignSelf: 'center',
		marginTop: '3%',
	},
	avatar: {
		flex: 2,
	},
	textContainer: {
		flex: 8,
	},
	detailsContainer: {
		flex: 2,
		textAlign: 'right',
	},
	tabViewText: {
		color: baseColors.primary,
	},
	fermentableTitle: {},
	fermentableAmount: {
		fontWeight: '800',
	},
});
