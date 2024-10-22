import {Divider} from '@rneui/base';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '@screens/stack-navigator';
import {Image, Text, View} from 'react-native';
import {useState} from 'react';
import {NavRowContainer} from '@nav-components/nav-row-container';
import {baseStyles} from '@styles/base';
import {LogoutAlert} from '@screens/settings/helpers/alerts';
import {Nav, RecipeType, UploadImageType} from '@constants/enum';
import {UploadImageModal} from '@screens/get-started/components/upload-image-modal';
import {Header} from '@screens/get-started/components/header';
import {useNhostClient} from '@nhost/react';
import {baseColors, baseSizes} from '@styles/constants';
import {ScaledSheet} from 'react-native-size-matters';
import '@lib/localization/i18n';
import {FlagImage} from '@screens/get-started/components/flag-image';

export type GetStartedScreenProps = StackScreenProps<
	RootStackParamList,
	'GetStartedScreen'
>;

export type NavRowProps = {
	navigation: GetStartedScreenProps;
};

const GetStartedScreen = (props: GetStartedScreenProps) => {
	const [showLogout, setShowLogout] = useState(false);
	const [showImageUpload, setShowImageUpload] = useState(false);
	const client = useNhostClient();

	const showLogoutAlert = (value: boolean) => {
		setShowLogout(value);
	};

	const changeImageUploadStatus = (value: boolean) => {
		setShowImageUpload(!value);
	};

	const handleShowLogin = () => {
		client.auth.signOut();
		props.navigation.push('AuthContainer', {
			auth: Nav.LOGIN,
			isFirstLoad: false,
		});
	};

	return (
		<View style={baseStyles.mainContainer}>
			<View style={[baseStyles.headerContainer, {flex: 1.5}]}>
				<Header
					logout={() => setShowLogout(true)}
					upload={() => setShowImageUpload(true)}
					settings={() => props.navigation.push('SettingsScreen')}
				/>
			</View>

			<View style={baseStyles.bodyContainer}>
				<NavRows navigation={props} />
			</View>

			{showImageUpload ? (
				<UploadImageModal
					changeImageUploadStatus={changeImageUploadStatus}
					type={UploadImageType.PROFILE}
					isVisible={showImageUpload}
				/>
			) : null}
			{showLogout ? (
				<LogoutAlert
					showLogout={showLogoutAlert}
					showLogin={() => handleShowLogin()}
				/>
			) : null}
			<Footer />
		</View>
	);
};

export const NavRows = (props: NavRowProps) => {
	return (
		<>
			<NavRowContainer
				title="My Collection"
				testID="my-collection"
				subTitle="View your current recipes"
				icon={
					<Image
						source={require('@assets/icons/recipe.png')}
						aria-label="recipe-icon"
						style={styles.icons}
					/>
				}
				onPress={() => {
					props.navigation.navigation.push('RecipeListScreen', {
						type: RecipeType.PRIVATE,
					});
				}}
			/>

			<Divider />

			<NavRowContainer
				title="Global Recipes"
				subTitle="View brews available to the public"
				testID="global-recipes"
				icon={
					<Image
						source={require('@assets/icons/database.png')}
						aria-label="global-recipe-icon"
						style={styles.icons}
					/>
				}
				onPress={() =>
					props.navigation.navigation.push('RecipeListScreen', {
						type: RecipeType.PUBLIC,
					})
				}
			/>

			<Divider />

			<NavRowContainer
				title="Brew Sessions"
				testID="sessions"
				subTitle="View previous or current session batches"
				icon={
					<Image
						source={require('@assets/icons/beer.png')}
						aria-label="sessions-icon"
						style={styles.icons}
					/>
				}
				onPress={() =>
					props.navigation.navigation.push('BrewingSessionsScreen', {
						recipe: undefined,
					})
				}
			/>

			<Divider />

			<NavRowContainer
				title="Tools"
				testID="tools"
				subTitle="Tools to aid with brew days"
				icon={
					<Image
						source={require('@assets/icons/tools.png')}
						aria-label="tools-icon"
						style={styles.icons}
					/>
				}
				onPress={() =>
					props.navigation.navigation.push('ToolsListScreen')
				}
			/>

			<Divider />

			<NavRowContainer
				title="Inventory"
				testID="inventory"
				subTitle="View your available ingredients"
				icon={
					<Image
						source={require('@assets/icons/inventory.png')}
						aria-label="inventory-icon"
						style={styles.icons}
					/>
				}
				onPress={() => props.navigation.navigation.push('StockScreen')}
			/>

			<Divider />

			<NavRowContainer
				title="About"
				testID="about"
				subTitle="Information about this app"
				icon={
					<Image
						source={require('@assets/icons/about.png')}
						aria-label="about-icon"
						style={styles.icons}
					/>
				}
				onPress={() => props.navigation.navigation.push('StockScreen')}
			/>

			<Divider />

			<NavRowContainer
				title="Help"
				testID="help"
				subTitle="Resources to help you"
				icon={
					<Image
						source={require('@assets/icons/help.png')}
						aria-label="help-icon"
						style={styles.icons}
					/>
				}
				onPress={() => props.navigation.navigation.push('HelpScreen')}
			/>
		</>
	);
};

export const Footer = () => {
	const pkg = require('../../../package.json');
	const client = useNhostClient();

	return (
		<View style={[styles.footerContainer, {flex: 0.5}]}>
			<View style={styles.rowContainer}>
				<Text
					style={styles.footerText}
					testID="footer-account-type-text"
				>
					{client.auth.getUser()?.defaultRole ?? 'Standard User'}
				</Text>
			</View>
			<View style={styles.rowContainer}>
				<FlagImage />
			</View>
			<View style={styles.rowContainer}>
				<Text style={styles.footerText} testID="footer-version-text">
					Version - {pkg.version}
				</Text>
			</View>
		</View>
	);
};

export const styles = ScaledSheet.create({
	footerText: {
		fontSize: baseSizes.text_spec_text,
		color: baseColors.secondary,
		borderWidth: 0.7,
		borderColor: 'white',
		padding: '4%',
	},
	icons: {
		height: '35%',
		aspectRatio: 1,
	},
	footerContainer: {
		...baseStyles.footerContainer,
		flex: 0.6,
		flexDirection: 'row',
	},
	rowContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default GetStartedScreen;
