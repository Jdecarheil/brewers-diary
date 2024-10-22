import {Avatar} from '@rneui/base';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@screens/stack-navigator';
import {ScrollView, View} from 'react-native';
import {baseStyles} from '@styles/base';
import {NavBarButton, ToolType} from '@constants/enum';
import {BottomBar} from '@nav-components/bottom-bar';
import {Header} from '@header-components/header';
import {AbvTool} from './containers/abv';
import {BoilOffTool} from './containers/boil-off';

export type ToolScreenProps = StackScreenProps<
	RootStackParamList,
	'ToolScreen'
>;

export type ToolProps = {
	tool: ToolType;
};

export const Tool = (props: ToolProps) => {
	switch (props.tool) {
		case ToolType.ABV:
			return <AbvTool />;
		case ToolType.BOIL_OFF:
			return <BoilOffTool />;
	}
};

export const ToolScreen = (props: ToolScreenProps) => {
	const {route} = props;

	const handleBottomBarNav = (value: NavBarButton) => {
		if (value === NavBarButton.MIDDLE)
			props.navigation.push('ToolsListScreen');
	};

	return (
		<View style={baseStyles.mainContainer}>
			<ScrollView contentContainerStyle={{flexGrow: 1}}>
				<View style={baseStyles.headerContainer}>
					<Header title={route.params.toolType} />
				</View>

				<View style={baseStyles.bodyContainer}>
					<Tool tool={route.params.toolType} />
				</View>

				<View style={baseStyles.footerContainer}>
					<BottomBar
						onPress={handleBottomBarNav}
						middle={{uri: require('assets/icons/return.png')}}
					/>
				</View>
			</ScrollView>
		</View>
	);
};
