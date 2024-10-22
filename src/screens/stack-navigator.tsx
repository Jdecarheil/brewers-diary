import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RecipeScreen} from '@screens/recipe/recipe-editable';
import GetStartedScreen from '@screens/get-started/index';
import {BrewingSessionsScreen} from '@screens/brewing-sessions';
import {StockScreen} from '@screens/stock';
import {Nav, RecipeType, ToolType} from '@constants/enum';
import {Recipe} from '@global-types/recipe';
import {SettingsScreen} from '@screens/settings';
import ForgotPasswordScreen from '@screens/forgot-password';
import {RecipeListScreen} from '@screens/recipe/recipe-list';
import AuthContainer from '@screens/auth';
import {RecipeOverviewScreen} from '@screens/recipe/recipe-overview';
import {ToolScreen} from '@screens/tools/tool';
import {ToolsListScreen} from '@screens/tools/tools-list';
import {useRecoilState} from 'recoil';
import {settingsAtomFamily} from '@lib/atoms/settings';
import i18next from 'i18next';
import '@lib/localization/i18n';
import {HelpScreen} from '@screens/help';

export type RecipeScreenParams = {
	recipe?: Recipe;
};

export type RootStackParamList = {
	MyRecipesScreen: undefined;
	RecipeListScreen: {type: RecipeType};
	RecipeScreen: {recipe: Recipe};
	AuthContainer: {auth: Nav; isFirstLoad: boolean | undefined};
	GetStartedScreen: undefined;
	SplashScreen: undefined;
	SettingsScreen: undefined;
	BrewingSessionsScreen: {recipe: Recipe | undefined};
	ToolsListScreen: undefined;
	ToolScreen: {toolType: ToolType};
	StockScreen: undefined;
	PublicRecipesScreen: undefined;
	ForgotPasswordScreen: undefined;
	RecipeOverviewScreen: {recipe: Recipe};
	HelpScreen: undefined;
};

type StackNavigatorProps = {};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator: React.FC<StackNavigatorProps> = (props) => {
	const [settings] = useRecoilState(settingsAtomFamily(''));

	useEffect(() => {
		const loadLang = async () => {
			try {
				if (settings.language) {
					i18next.changeLanguage(settings.language);
				}
			} catch (error) {
				console.log('Error retrieving language settings', error);
			}
		};
		loadLang();
	}, [settings]);

	return (
		<>
			<Stack.Navigator
				initialRouteName="AuthContainer"
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen
					name="SettingsScreen"
					component={SettingsScreen}
				/>
				<Stack.Screen
					name="BrewingSessionsScreen"
					component={BrewingSessionsScreen}
				/>
				<Stack.Screen
					name="RecipeOverviewScreen"
					component={RecipeOverviewScreen}
				/>
				<Stack.Screen
					name="ToolsListScreen"
					component={ToolsListScreen}
				/>
				<Stack.Screen name="HelpScreen" component={HelpScreen} />
				<Stack.Screen name="ToolScreen" component={ToolScreen} />
				<Stack.Screen name="StockScreen" component={StockScreen} />
				<Stack.Screen
					name="RecipeListScreen"
					component={RecipeListScreen}
				/>
				<Stack.Screen
					name="AuthContainer"
					component={AuthContainer}
					initialParams={{isFirstLoad: true}}
				/>
				<Stack.Screen
					name="ForgotPasswordScreen"
					component={ForgotPasswordScreen}
				/>
				<Stack.Screen
					name="GetStartedScreen"
					component={GetStartedScreen}
				/>
				<Stack.Screen name="RecipeScreen" component={RecipeScreen} />
			</Stack.Navigator>
		</>
	);
};

export default StackNavigator;
