import {StackScreenProps} from '@react-navigation/stack';
import {Avatar} from '@rneui/base';
import {Tab, TabView} from '@ui-kitten/components';
import {RecipeHeader} from '@header-components/recipe-header';
import {BottomBar} from '@nav-components/bottom-bar';
import {NavBarButton, RecipeType} from '@constants/enum';
import {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ScaledSheet, s} from 'react-native-size-matters';
import {RootStackParamList} from '@screens/stack-navigator';
import {baseStyles} from '@styles/base';
import {baseColors} from '@styles/constants';

export type StockScreenProps = StackScreenProps<
	RootStackParamList,
	'StockScreen'
>;

export const StockScreen: React.FC<StockScreenProps> = (props) => {
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
				{/* <RecipeHeader
					imageUrl={'assets/icons/return.png'}
					title={recipe.name ?? 'Unamed Recipe'}
					dateAdded={recipe.date_added}
					description={recipe.notes}
				/> */}
			</View>
			<View style={baseStyles.bodyContainer}>
				<TabView
					selectedIndex={selectedIndex}
					onSelect={(index) => setSelectedIndex(index)}
					style={{}}
					indicatorStyle={{backgroundColor: baseColors.primary}}
				>
					<Tab title="Fermentables">
						<Details />
					</Tab>
					<Tab title="Hops">
						<Text>ececf</Text>
					</Tab>
					<Tab title="Additives">
						<Text>ececf</Text>
					</Tab>
					<Tab title="Yeasts">
						<Text>ececf</Text>
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
		</ScrollView>
	);
};

export const Details = () => {
	return <Text></Text>;
};

export const styles = ScaledSheet.create({});
