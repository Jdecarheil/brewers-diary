import React, {useState} from 'react';
import {Text} from '@rneui/base';
import {Alert, StyleSheet, View} from 'react-native';
import {ButtonComponent as Button} from '@generic-components/button';
import {PasswordInput} from '@form-components/password-input';
import {EmailInput} from '@form-components/email-input';
import {TouchableOpacity} from 'react-native';
import {useSignInEmailPassword} from '@nhost/react';
import {AuthErrors, Nav} from '@constants/enum';
import {baseColors} from '@styles/constants';

export type LoginScreenProps = {
	navChange: (action: Nav) => void;
	handleError: (value: string) => void;
};

export const LoginScreen = (props: LoginScreenProps) => {
	const {navChange, handleError} = props;

	const [inputError, setInputError] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const {signInEmailPassword} = useSignInEmailPassword();

	const handleLogin = async () => {
		try {
			const {isSuccess, error} = await signInEmailPassword(
				email,
				password,
			);

			if (isSuccess) {
				navChange(Nav.GETSTARTED);
			}
			console.log(error);
			if (error) {
				switch (error.error) {
					case AuthErrors.INVALID_EMAIL:
						handleError('Incorrect email');
						break;
					case AuthErrors.INVALID_EMAIL_PASSWORD:
						handleError('Incorrect email or password');
						break;
					case AuthErrors.ALREADY_LOGGED_IN:
						navChange(Nav.GETSTARTED);
						break;
				}
			}
		} catch (error) {
			Alert.alert('error signing in' + error);
		}
	};

	return (
		<View style={styles.mainContainer}>
			<View style={styles.inputsContainer}>
				<EmailInput
					placeholder="Enter your email"
					email={email}
					error={inputError}
					setError={setInputError}
					setEmail={setEmail}
				/>
				<PasswordInput
					placeholder="Enter your password"
					setError={setInputError}
					setPassword={setPassword}
					error={inputError}
					password={password}
					label="Password"
					vs={40}
				/>
			</View>

			<View style={styles.actionContainer}>
				<View style={styles.forgotPasswordContainer}>
					<TouchableOpacity
						onPress={() => navChange(Nav.FORGOT_PASSWORD)}
					>
						<Text style={styles.forgotPassword}>
							Forgot password?
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.buttonContainer}>
					<Button
						title="Login"
						onPress={handleLogin}
						titleStyle={styles.buttonTitle}
						buttonStyle={styles.buttonStyle}
					/>
				</View>
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
	forgotPassword: {
		color: baseColors.text_tertiary,
	},
	actionContainer: {
		flex: 3,
	},
	inputsContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	forgotPasswordContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonTitle: {
		color: 'white',
		marginHorizontal: 20,
	},
	buttonStyle: {
		backgroundColor: baseColors.primary,
		borderRadius: 10,
	},
});
