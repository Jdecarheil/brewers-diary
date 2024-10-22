import {Avatar, Divider} from '@rneui/base';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@screens/stack-navigator';
import {View} from 'react-native';
import {NavRowContainer} from '@nav-components/nav-row-container';
import {baseStyles} from '@styles/base';
import {NavBarButton, RecipeType, ToolType} from '@constants/enum';
import {BottomBar} from '@nav-components/bottom-bar';
import {Header} from '@header-components/header';
import {icon_styles} from '@styles/constants';

export type ToolsScreenProps = StackScreenProps<
	RootStackParamList,
	'ToolsListScreen'
>;

export const ToolsListScreen = (props: ToolsScreenProps) => {
	const handleNav = (value: NavBarButton) => {
		if (value === NavBarButton.MIDDLE)
			props.navigation.push('GetStartedScreen');
	};

	return (
		<View style={baseStyles.mainContainer}>
			<View style={baseStyles.headerContainer}>
				<Header title="Brewing Tools" />
			</View>

			<View style={baseStyles.bodyContainer}>
				<NavRowContainer
					title="Abv Calculator"
					subTitle="Measure the alcohol content in your brew"
					icon={
						<Avatar
							source={require('assets/icons/percent.png')}
							size={icon_styles.icon_nav_size}
						/>
					}
					onPress={() => {
						props.navigation.push('ToolScreen', {
							toolType: ToolType.ABV,
						});
					}}
				/>

				<Divider />

				<NavRowContainer
					title="Boil off rate"
					subTitle="View active brews happening now"
					icon={
						<Avatar
							source={require('assets/icons/pot.png')}
							size={icon_styles.icon_nav_size}
						/>
					}
					onPress={() =>
						props.navigation.push('ToolScreen', {
							toolType: ToolType.BOIL_OFF,
						})
					}
				/>

				<Divider />

				<NavRowContainer
					title="Estimate potential"
					subTitle="Calculators for your next batch"
					icon={
						<Avatar
							source={require('assets/icons/tools.png')}
							size={icon_styles.icon_nav_size}
						/>
					}
					onPress={() => ({})}
				/>

				<Divider />

				<NavRowContainer
					title="Tools"
					subTitle="View recipes from other users"
					icon={
						<Avatar
							source={require('assets/icons/database.png')}
							size={icon_styles.icon_nav_size}
						/>
					}
					onPress={() =>
						props.navigation.push('RecipeListScreen', {
							type: RecipeType.PUBLIC,
						})
					}
				/>

				<Divider />

				<NavRowContainer
					title="Inventory"
					subTitle="View your available ingredients"
					icon={
						<Avatar
							source={require('assets/icons/inventory.png')}
							rounded
							size={icon_styles.icon_nav_size}
						/>
					}
					onPress={() => props.navigation.push('StockScreen')}
				/>

				<Divider />

				<NavRowContainer
					title="About"
					subTitle="View your available ingredients"
					icon={
						<Avatar
							source={require('assets/icons/inventory.png')}
							rounded
							size={icon_styles.icon_nav_size}
						/>
					}
					onPress={() => props.navigation.push('StockScreen')}
				/>

				<Divider />

				<NavRowContainer
					title="Help"
					subTitle="View your available ingredients"
					icon={
						<Avatar
							source={require('assets/icons/inventory.png')}
							rounded
							size={icon_styles.icon_nav_size}
						/>
					}
					onPress={() => props.navigation.push('StockScreen')}
				/>
			</View>

			<View style={baseStyles.footerContainer}>
				<BottomBar
					onPress={handleNav}
					middle={{uri: require('assets/icons/home.png')}}
				/>
			</View>
		</View>
	);
};
