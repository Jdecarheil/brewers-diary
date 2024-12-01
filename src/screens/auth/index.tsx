import {StackScreenProps} from '@react-navigation/stack';
import {Avatar, Tab, Text} from '@rneui/base';
import {useState} from 'react';
import {ImageBackground, ScrollView, View} from 'react-native';
import {RootStackParamList} from '@screens/stack-navigator';
import {LoginScreen} from '@login-screen/index';
import {RegisterScreen} from '@registration-screen/index';
import {Nav} from '@constants/enum';
import SplashScreen from '@screens/splash/splash-screen';
import {ScaledSheet} from 'react-native-size-matters';
import {useTranslation} from 'react-i18next';
import {baseStyles} from '@styles/base';
import './global.css';
import {baseColors} from '@styles/constants';

export type AuthContainerProps = StackScreenProps<
	RootStackParamList,
	'AuthContainer'
>;

const AuthContainer = (props: AuthContainerProps) => {
	const [isFirstLoad, setIsFirstLoad] = useState(
		props.route.params.isFirstLoad,
	);
	const {t} = useTranslation();
	const [error, setError] = useState('');

	const [index, setIndex] = useState(
		props.route.params.auth === Nav.LOGIN ? 0 : 1,
	);

	const handleError = (value: string) => {
		setError(value);
	};

	const navChange = (nav: Nav) => {
		if (nav === Nav.GETSTARTED) props.navigation.push('GetStartedScreen');
		if (nav === Nav.LOGIN) setIndex(0);
		if (nav === Nav.FORGOT_PASSWORD)
			props.navigation.push('ForgotPasswordScreen');
	};

	const handleOnFinishSplash = (isAuthenticated: boolean) => {
		setIsFirstLoad(false);

		if (isAuthenticated) {
			navChange(Nav.GETSTARTED);
		} else {
			setIndex(0);
		}
	};

	if (isFirstLoad) {
		return <SplashScreen onFinish={handleOnFinishSplash} />;
	} else {
		return (
			<ScrollView
				contentContainerStyle={{flexGrow: 1}}
				keyboardShouldPersistTaps="handled"
			>
				<ImageBackground
					source={require('../../assets/backgrounds/default-background.jpg')}
					style={styles.imageBackground}
				>
					<View style={styles.headingContainer}>
						<Text style={baseStyles.authTitle}>
							{index === 0
								? t('screens.auth.login')
								: 'screens.auth.register'}
						</Text>
					</View>

					<View style={styles.avatarContainer}>
						<Avatar
							source={require('assets/icons/hop.png')}
							size={'xlarge'}
						/>
					</View>
					<Text style={styles.error}>{error}</Text>
					<View style={{flex: 6}}>
						{index === 0 ? (
							<LoginScreen
								navChange={navChange}
								handleError={handleError}
							/>
						) : (
							<RegisterScreen navChange={navChange} />
						)}
					</View>

					<View style={{flex: 1, alignItems: 'center'}}>
						<Tab
							variant="default"
							indicatorStyle={{
								backgroundColor: '#999999',
								height: 3,
							}}
							value={index}
							onChange={(value) => setIndex(value)}
							dense
							style={{width: '60%'}}
						>
							<Tab.Item variant="default">
								<Text>Sign In</Text>
							</Tab.Item>
							<Tab.Item>
								<Text>No account?</Text>
							</Tab.Item>
						</Tab>
					</View>
				</ImageBackground>
			</ScrollView>
		);
	}
};

export default AuthContainer;

export const styles = ScaledSheet.create({
	headingContainer: {
		flex: 4,
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageBackground: {
		width: '100%',
		height: '100%',
	},
	avatarContainer: {
		flex: 3,
		alignItems: 'center',
	},
	error: {
		color: baseColors.error,
		alignSelf: 'center',
	},
});
