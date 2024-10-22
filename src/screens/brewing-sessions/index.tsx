import {StackScreenProps} from '@react-navigation/stack';
import {Tab, TabView} from '@ui-kitten/components';
import {RecipeHeader} from '@header-components/recipe-header';
import {BottomBar} from '@nav-components/bottom-bar';
import {NavBarButton, RecipeType} from '@constants/enum';
import {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {RootStackParamList} from '@screens/stack-navigator';
import {baseStyles} from '@styles/base';
import {baseColors} from '@styles/constants';

export type BrewingSessionsScreenProps = StackScreenProps<
	RootStackParamList,
	'BrewingSessionsScreen'
>;

export const BrewingSessionsScreen: React.FC<BrewingSessionsScreenProps> = (
	props,
) => {
	const recipe = props.route.params.recipe;
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleNav = (value: NavBarButton) => {
		if (value === NavBarButton.LEFT)
			props.navigation.push('RecipeListScreen', {
				type: RecipeType.PRIVATE,
			});
		else if (value === NavBarButton.MIDDLE) '';
	};

	return (
		<ScrollView
			contentContainerStyle={{flexGrow: 1}}
			keyboardShouldPersistTaps="handled"
		>
			<View style={baseStyles.headerContainer}>
				<RecipeHeader
					imageUrl={'assets/icons/return.png'}
					title={'Unamed Recipe'}
					dateAdded={'Unamed Recipe'}
					description={'Unamed Recipe'}
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
						<Details />
					</Tab>
					<Tab title="Mashing">
						<Text>ececf</Text>
					</Tab>
					<Tab title="Sparge">
						<Text>ececf</Text>
					</Tab>
					<Tab title="Fermentation">
						<Text>ececf</Text>
					</Tab>
				</TabView>
			</View>
			<View style={baseStyles.footerContainer}>
				<BottomBar
					onPress={handleNav}
					left={{uri: require('assets/icons/return.png')}}
					middle={{uri: require('assets/icons/home.png')}}
					right={{uri: require('assets/icons/keg.png')}}
				/>
			</View>
		</ScrollView>
	);
};

export const Details = () => {
	return <Text></Text>;
};

export const styles = ScaledSheet.create({});
