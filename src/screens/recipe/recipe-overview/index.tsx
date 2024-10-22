import {StackScreenProps} from '@react-navigation/stack';
import {Avatar} from '@rneui/base';
import {TextInput} from '@generic-components/text-input';
import {RecipeHeader} from '@header-components/recipe-header';
import {BottomBar} from '@nav-components/bottom-bar';
import {RecipeStatRow} from '@recipe-components/recipe-stat-row';
import {TitleRow} from '@recipe-components/title-row';
import {NavBarButton, RecipeType} from '@constants/enum';
import {calcOG} from '@lib/calculators/gravity';
import {additionToText, stateToText} from '@lib/parser/enum';
import {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet, s} from 'react-native-size-matters';
import {RootStackParamList} from '@screens/stack-navigator';
import {baseStyles} from '@styles/base';
import {baseColors, baseSizes, icon_styles} from '@styles/constants';
import {Fermentable} from '@global-types/fermentable';
import {Hop} from '@global-types/hop';
import {Yeast} from '@global-types/yeast';

export type RecipeOverviewScreenProps = StackScreenProps<
	RootStackParamList,
	'RecipeOverviewScreen'
>;

export type RenderFermentableDetailsProps = {
	fermentables: Fermentable[];
};

export type RenderHopsDetailsProps = {
	hops: Hop[];
};

export type RenderYeastDetailsProps = {
	yeast: Yeast[];
};

export const RecipeOverviewScreen: React.FC<RecipeOverviewScreenProps> = (
	props,
) => {
	const [recipe, setRecipe] = useState(props.route.params.recipe);
	const [ibu, setIbu] = useState(0);
	const [originalGravity, setOriginalGravity] = useState(0);

	useEffect(() => {
		setIbu(calcOG(recipe.fermentables, recipe.fermentable_volume));
	});

	const handleNav = (value: NavBarButton) => {
		if (value === NavBarButton.LEFT)
			props.navigation.push('RecipeListScreen', {
				type: RecipeType.PUBLIC,
			});
		else if (value === NavBarButton.MIDDLE) {
		}
	};

	return (
		<View style={baseStyles.mainContainer}>
			<RecipeHeader
				imageUrl="https://randomuser.me/api/portraits/men/36.jpg"
				title={recipe.name}
				dateAdded={recipe.date_added}
				description={recipe.notes}
			/>
			<View style={baseStyles.bodyContainer}>
				<ScrollView style={{flex: 1}}>
					<Text style={styles.brewTypeText}>Brew Type</Text>
					<View style={styles.checkBoxContainer}></View>
					<TitleRow left={false} middle="Essentials" right="" />

					<View style={styles.recipeStatRowContainer}>
						<RecipeStatRow
							title="Batch volume"
							value={''}
							icon={require('assets/icons/dot.png')}
						/>
						<RecipeStatRow
							title="IBU"
							value={ibu.toString()}
							icon={require('assets/icons/dot.png')}
						/>
						<RecipeStatRow
							title="Mash volume"
							value={''}
							icon={require('assets/icons/dot.png')}
						/>
						<RecipeStatRow
							title="Sparge water"
							value={''}
							icon={require('assets/icons/dot.png')}
						/>
						<RecipeStatRow
							title="Boilable volume"
							value={''}
							icon={require('assets/icons/dot.png')}
						/>
						<RecipeStatRow
							title="Total water"
							value={recipe.fermentable_volume.toString()}
							icon={require('assets/icons/dot.png')}
						/>

						<TitleRow left={false} middle="Fermentables" right="" />
						<RenderFermentableDetails
							fermentables={recipe.fermentables}
						/>

						<TitleRow left={false} middle="Hops" right="" />
						<RenderHopsDetails hops={recipe.hops} />

						<TitleRow left={false} middle="Yeast" right="" />
						<RenderYeastDetails yeast={recipe.yeasts} />

						<TitleRow left={false} middle="Additives" right="" />
						<RenderAdditionDetails yeast={recipe.yeasts} />

						<View style={styles.inputContainer}>
							<Text>Notes about recipe</Text>
							<TextInput
								editable={false}
								style={styles.input}
								onChange={() => {}}
								multiline={true}
								value={recipe.notes}
							/>
						</View>

						<TitleRow left={false} middle="Additives" right="" />
						<RenderAdditionDetails yeast={recipe.yeasts} />

						<Text style={styles.ratingText}>Rating</Text>
						<View style={styles.ratingContainer}>
							{recipe.reviews ? (
								new Array(recipe.reviews ? recipe.reviews : 0)
									.fill('')
									.map((_, index) => (
										<Avatar
											source={require('assets/icons/beer.png')}
											size={icon_styles.icon_nav_size}
										/>
									))
							) : (
								<Text>No ratings yet</Text>
							)}
						</View>

						<TitleRow left={false} middle="Rating" right="" />
						<View></View>
						<TitleRow left={false} middle="Rating" right="" />
						<View></View>
						<TitleRow left={false} middle="Rating" right="" />
						<View></View>
					</View>
				</ScrollView>
			</View>
			<View style={baseStyles.footerContainer}>
				<BottomBar
					onPress={handleNav}
					left={{uri: require('assets/icons/return.png')}}
					middle={{uri: require('assets/icons/download.png')}}
					right={{uri: require('assets/icons/star.png')}}
				/>
			</View>
		</View>
	);
};

export const RenderFermentableDetails = (
	props: RenderFermentableDetailsProps,
) => {
	const {fermentables} = props;
	const [totalWeight, setTotalWeight] = useState(0);

	useEffect(() => {
		let total = 0;
		fermentables.map((fermentable) => {
			total += fermentable.weight;
		});
		setTotalWeight(total);
	}, [fermentables]);

	return fermentables.map((fermentable, index) => {
		return (
			<RecipeStatRow
				key={index}
				title={
					fermentable.name +
					' | ' +
					fermentable.brand +
					' | ' +
					fermentable.weight / 1000 +
					' kg' +
					' | ' +
					fermentable.category +
					' | ' +
					fermentable.max_ppg +
					' | ' +
					parseFloat(
						((fermentable.weight / totalWeight) * 100).toString(),
					).toFixed(2) +
					'%'
				}
				value={''}
				icon={require('assets/icons/dot.png')}
			/>
		);
	});
};

export const RenderHopsDetails = (props: RenderHopsDetailsProps) => {
	const {hops} = props;
	const [totalWeight, setTotalWeight] = useState(0);

	useEffect(() => {
		let total = 0;
		hops.map((hops) => {
			total += hops.weight;
		});
		setTotalWeight(total);
	}, [hops]);

	return hops.map((hop, index) => {
		return (
			<RecipeStatRow
				key={index}
				title={
					hop.name +
					' | ' +
					hop.brand +
					' | ' +
					hop.weight +
					'g' +
					' | ' +
					hop.alpha_acid +
					'% AA' +
					' | ' +
					additionToText(hop.addition) +
					' | ' +
					parseFloat(
						((hop.weight / totalWeight) * 100).toString(),
					).toFixed(2) +
					'%' +
					' | '
				}
				value={''}
				icon={require('assets/icons/dot.png')}
			/>
		);
	});
};

export const RenderYeastDetails = (props: RenderYeastDetailsProps) => {
	const {yeast} = props;
	const [totalWeight, setTotalWeight] = useState(0);

	useEffect(() => {
		let total = 0;
		yeast.map((yeast) => {
			total += yeast.weight;
		});
		setTotalWeight(total);
	}, [yeast]);

	return yeast.map((yeast, index) => {
		return (
			<RecipeStatRow
				key={index}
				title={
					yeast.name +
					' | ' +
					yeast.brand +
					' | ' +
					yeast.weight +
					'g' +
					' | ' +
					yeast.attenuation +
					'%' +
					' | ' +
					stateToText(yeast.state) +
					' | ' +
					parseFloat(
						((yeast.weight / totalWeight) * 100).toString(),
					).toFixed(2) +
					'%' +
					' | '
				}
				value={''}
				icon={require('assets/icons/dot.png')}
			/>
		);
	});
};

export const RenderAdditionDetails = (props: RenderYeastDetailsProps) => {
	const {yeast} = props;
	const [totalWeight, setTotalWeight] = useState(0);

	useEffect(() => {
		let total = 0;
		yeast.map((yeast) => {
			total += yeast.weight;
		});
		setTotalWeight(total);
	}, [yeast]);

	return yeast.map((yeast, index) => {
		return (
			<RecipeStatRow
				key={index}
				title={
					yeast.name +
					' | ' +
					yeast.brand +
					' | ' +
					yeast.weight +
					'g' +
					' | ' +
					yeast.attenuation +
					'%' +
					' | ' +
					stateToText(yeast.state) +
					' | ' +
					parseFloat(
						((yeast.weight / totalWeight) * 100).toString(),
					).toFixed(2) +
					'%' +
					' | '
				}
				value={''}
				icon={require('assets/icons/dot.png')}
			/>
		);
	});
};

export const styles = ScaledSheet.create({
	recipeStatRowContainer: {},
	inputContainer: {
		width: '90%',
		alignSelf: 'center',
		marginBottom: '4%',
		marginTop: '4%',
	},
	input: {
		backgroundColor: baseColors.input,
	},
	ratingContainer: {
		width: '90%',
		flexDirection: 'row',
		alignSelf: 'center',
		alignContent: 'center',
		paddingTop: '2%',
	},
	ratingText: {
		color: baseColors.primary,
		fontSize: baseSizes.text_details,
		alignSelf: 'center',
	},
	brewTypeText: {
		width: '90%',
		alignSelf: 'center',
	},
	checkBoxContainer: {
		width: '90%',
		flexDirection: 'row',
		alignSelf: 'center',
	},
});
