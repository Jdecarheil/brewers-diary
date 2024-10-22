import {Button, Text} from '@rneui/base';
import {EmailInput} from '@form-components/email-input';
import {PasswordInput} from '@form-components/password-input';
import {emailRegex} from '@lib/validators/form-inputs';
import {nhost} from '@config/nhost';
import {useState} from 'react';
import React from 'react';
import {Alert, View, useWindowDimensions} from 'react-native';
import {Nav} from '@constants/enum';
import {baseColors} from '@styles/constants';
import {useSignUpEmailPassword} from '@nhost/react';

export type RegisterScreenProps = {
	navChange: (nav: Nav) => void;
};

export const RegisterScreen = (props: RegisterScreenProps) => {
	const {navChange} = props;

	const [index, setIndex] = useState(1);
	const [email, setEmail] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [error, setError] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const vs = useWindowDimensions().width;

	const formDataValid = React.useMemo(() => {
		if (!emailRegex.test(email) || password.length < 3) {
			return false;
		} else {
			return true;
		}
	}, [email, password]);

	const handleRegister = async () => {
		if (formDataValid) {
			try {
				const {signUpEmailPassword} = useSignUpEmailPassword();
				await signUpEmailPassword(email, password, {
					displayName: displayName,
					metadata: {profile_id: null},
				});
				// const result = await nhost.auth.signUp({
				// 	email: email,
				// 	password: password,
				// });
				// if (result) {
				// 	navChange(Nav.LOGIN);
				// }
			} catch (e) {
				Alert.alert(
					'Error Registering Account',
					'Try using another email.',
				);
			}
		} else {
			Alert.alert('Invalid Form Fields');
		}
	};

	return (
		<>
			<View style={{flex: 4, justifyContent: 'center'}}>
				<View style={{alignItems: 'center'}}>
					<EmailInput
						email={email}
						error={error}
						setError={setError}
						setEmail={setEmail}
						placeholder="Enter an active email"
					/>
					<PasswordInput
						placeholder="Enter a password"
						setError={setError}
						setPassword={setPassword}
						error={error}
						password={password}
						label="Password"
						vs={vs}
					/>
					<PasswordInput
						placeholder="Confirm your password"
						setError={setError}
						setPassword={setConfirmPassword}
						error={error}
						password={confirmPassword}
						label="Password"
						vs={vs}
					/>
				</View>
			</View>

			<View
				style={{
					flex: 2,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Button
					title="Register"
					onPress={handleRegister}
					titleStyle={{color: 'white', marginHorizontal: 20}}
					buttonStyle={{
						backgroundColor: baseColors.primary,
						borderRadius: 10,
					}}
				/>
			</View>
		</>
	);
	return <Text></Text>;
};
