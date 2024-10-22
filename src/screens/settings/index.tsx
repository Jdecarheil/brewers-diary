import {Avatar, Switch} from '@rneui/base';
import React, {ReactNode, useState} from 'react';
import {ScrollView, Text, TouchableHighlight, View} from 'react-native';
import {baseColors, baseFonts, baseSizes} from '@styles/constants';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@screens/stack-navigator';
import {
	BeerColor,
	Languages,
	Nav,
	NavBarButton,
	Pressure,
	SettingType,
} from '@constants/enum';
import {useRecoilState} from 'recoil';
import {settingsAtomFamily} from '@lib/atoms/settings';
import {BottomBar} from '@nav-components/bottom-bar';
import {baseStyles} from '@styles/base';
import {Header} from '@header-components/header';
// import {TitleRow} from '@recipe-components/title-row';
import {ScaledSheet, s} from 'react-native-size-matters';
import {DialogBox} from '@generic-components/dialog';
import {useTranslation} from 'react-i18next';

export type SettingsScreenProps = StackScreenProps<
	RootStackParamList,
	'SettingsScreen'
>;

export type SettingsItemProps = {
	status: string;
	title: string;
	children?: ReactNode;
	onChange: () => void;
	onModal?: (value: boolean) => void;
};

export const SettingsScreen: React.FC<SettingsScreenProps> = (props) => {
	const [settings, setSettings] = useRecoilState(settingsAtomFamily(''));
	const [dialogItems, setDialogItems] = useState(['']);
	const [dialogHeading, setDialogHeading] = useState('');
	const [dialogActive, setDialogActive] = useState(false);
	const [dialogType, setDialogType] = useState<SettingType>();
	const pressures = Object.values(Pressure).map((pressure) => pressure);
	const beerColors = Object.values(BeerColor).map((color) => color);
	const languages = Object.values(Languages).map((language) => language);
	const {t} = useTranslation();

	const signOut = () => {
		props.navigation.push('AuthContainer', {
			auth: Nav.LOGIN,
			isFirstLoad: false,
		});
	};

	const handleNav = (value: NavBarButton) => {
		if (value === NavBarButton.LEFT)
			props.navigation.push('MyRecipesScreen');
		else if (value === NavBarButton.MIDDLE) {
			props.navigation.push('GetStartedScreen');
		}
	};

	const handleSettingsChange = (index: number) => {
		setDialogActive(false);
		switch (dialogType) {
			case SettingType.PRESSURE:
				setSettings({...settings, pressure: pressures[index]});
				break;
			case SettingType.COLOR:
				setSettings({...settings, color: beerColors[index]});
				break;
			case SettingType.LANGUAGE:
				setSettings({...settings, language: languages[index]});
				break;
			default:
				console.log('Setting type could not be found');
		}
	};

	const handleDialogActive = (value: boolean, items?: []) => {
		setDialogActive(value);
		items ? setDialogItems(items) : null;
	};

	const handleSettingSelection = (type: SettingType) => {
		setDialogHeading(type);
		setDialogType(type);
	};

	const deleteAccount = () => {
		props.navigation.push('AuthContainer', {
			auth: Nav.LOGIN,
			isFirstLoad: false,
		});
	};

	return (
		<View style={baseStyles.mainContainer}>
			<View style={baseStyles.headerContainer}>
				<Header title="Set Preferences" />
			</View>
			<View style={baseStyles.bodyContainer}>
				<ScrollView
					keyboardShouldPersistTaps="handled"
					contentContainerStyle={{flexGrow: 1}}
				>
					{/* <TitleRow middle="Units" /> */}
					<SettingsItem
						children={
							<Switch
								value={settings.metric}
								onValueChange={(value) =>
									setSettings({...settings, metric: value})
								}
							/>
						}
						status={settings.metric ? 'enabled' : 'disabled'}
						onChange={() => {}}
						title="Use Metric:"
					/>
					<SettingsItem
						status={settings.pressure}
						onModal={handleDialogActive}
						onChange={() => {
							setDialogItems(pressures),
								handleSettingSelection(SettingType.PRESSURE);
						}}
						title={SettingType.PRESSURE}
					/>
					<SettingsItem
						status={settings.color}
						onModal={handleDialogActive}
						onChange={() => {
							setDialogItems(beerColors),
								handleSettingSelection(SettingType.COLOR);
						}}
						title={SettingType.COLOR}
					/>

					{/* <TitleRow middle="Language" /> */}
					<SettingsItem
						status={settings.language}
						onModal={handleDialogActive}
						onChange={() => {
							setDialogItems(languages),
								handleSettingSelection(SettingType.LANGUAGE);
						}}
						title={SettingType.LANGUAGE}
					/>
					{
						<DialogBox
							children={
								dialogItems
									? dialogItems.map((item, index) => {
											return (
												<TouchableHighlight
													underlayColor={
														baseColors.tertiary
													}
													key={index}
													style={styles.dialogItem}
													onPress={() =>
														handleSettingsChange(
															index,
														)
													}
												>
													<Text
														style={
															styles.dialogTextItem
														}
													>
														{item}
													</Text>
												</TouchableHighlight>
											);
									  })
									: [<Text>Error getting settings</Text>]
							}
							isVisible={dialogActive}
							title={dialogHeading}
							onCancel={handleDialogActive}
							onPress1={() => {}}
						/>
					}
				</ScrollView>
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
	);
};

export const SettingsItem = (props: SettingsItemProps) => {
	const {status, title, children, onModal, onChange} = props;

	return (
		<View style={styles.settingsRow}>
			<View style={styles.infoContainer}>
				<Text>{title}</Text>
			</View>
			<View style={styles.statusContainer}>
				<Text>{status}</Text>
			</View>
			<View style={styles.identifierContainer}>
				{children ? (
					children
				) : onModal ? (
					<Avatar
						onPress={() => {
							onModal(true), onChange();
						}}
						source={require('assets/icons/chevron-down.png')}
						size={s(13)}
					/>
				) : null}
			</View>
		</View>
	);
};

export const styles = ScaledSheet.create({
	settingsRow: {
		flexDirection: 'row',
		width: '90%',
		alignSelf: 'center',
		marginTop: s(10),

		backgroundColor: baseColors.quinary,
		borderRadius: 8,
		minHeight: '6%',
	},
	statusContainer: {
		justifyContent: 'center',
		flex: 2,
		alignItems: 'center',
	},
	infoContainer: {
		flex: 4,
		justifyContent: 'center',
		marginLeft: 8,
	},
	identifierContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	dialogItem: {
		width: '100%',
		height: s(30),
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: baseColors.primary,
		marginTop: 8,
		borderWidth: 5,
		borderColor: baseColors.tertiary,
	},
	dialogTextItem: {
		color: baseColors.secondary,
		fontSize: baseSizes.text_details,
		marginLeft: 5,
		fontFamily: baseFonts.text_primary,
	},
});
