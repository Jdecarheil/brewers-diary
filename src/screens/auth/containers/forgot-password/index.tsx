import React, {useState} from 'react';
import {Text} from '@rneui/base';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {ButtonComponent as Button} from '@generic-components/button';
import {PasswordInput} from '@form-components/password-input';
import {EmailInput} from '@form-components/email-input';
import {TouchableOpacity} from 'react-native';
import {useNhostClient, useSignInEmailPassword} from '@nhost/react';
import {Nav} from '@constants/enum';
import {baseColors} from '@styles/constants';

export type ForgotPasswordScreenProps = {
	navChange: (action: Nav) => void;
};

export const ForgotPasswordScreen = (props: ForgotPasswordScreenProps) => {
	const {navChange} = props;

	const [inputError, setInputError] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	const client = useNhostClient();
	const {signInEmailPassword, isLoading, isSuccess, isError, error} =
		useSignInEmailPassword();
	const handleLogin = async () => {
		try {
			signInEmailPassword(email, password);

			if (isSuccess) {
				navChange(Nav.GETSTARTED);
			}

			if (isError) {
				console.log('error', error);
			}
			if (isLoading) {
				console.log('loaDING');
			}
		} catch (error) {
			Alert.alert('error signing in' + error);
		}
	};

	return (
		<ScrollView>
			<View
				style={{
					flex: 4,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
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

			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<TouchableOpacity>
					<Text style={styles.forgotPassword}>Forgot password?</Text>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flex: 2,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Button
					title="Login"
					onPress={handleLogin}
					titleStyle={{color: 'white', marginHorizontal: 20}}
					buttonStyle={{
						backgroundColor: baseColors.primary,
						borderRadius: 10,
					}}
				/>
			</View>
		</ScrollView>
	);
};

export const styles = StyleSheet.create({
	forgotPassword: {
		color: baseColors.text_tertiary,
	},
});
