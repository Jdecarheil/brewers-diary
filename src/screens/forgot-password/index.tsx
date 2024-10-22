import {StackScreenProps} from '@react-navigation/stack';
import {Button, Tab, Text} from '@rneui/base';
import {EmailInput} from '@form-components/email-input';
import {nhost} from '@config/nhost';
import {useState} from 'react';
import React from 'react';
import {Alert, ImageBackground, View, useWindowDimensions} from 'react-native';
import {RootStackParamList} from '@screens/stack-navigator';

let emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export type ForgotPasswordScreenProps = StackScreenProps<
	RootStackParamList,
	'ForgotPasswordScreen'
>;

const ForgotPasswordScreen = (props: ForgotPasswordScreenProps) => {
	const [index, setIndex] = useState(1);
	const [email, setEmail] = useState('');
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
				const result = await nhost.auth.signUp({
					email: email,
					password: password,
				});
				Alert.alert('success');
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
		<ImageBackground
			source={require('../../assets/backgrounds/default-background.jpg')}
			style={{width: '100%', height: '100%'}}
		>
			<View
				style={{
					height: '20%',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text style={{color: '#999999'}} h4>
					Create an account
				</Text>
			</View>
			<View style={{height: '40%', justifyContent: 'center'}}>
				<View style={{alignItems: 'center'}}>
					<EmailInput
						email={email}
						placeholder=""
						error={error}
						setError={setError}
						setEmail={setEmail}
					/>
				</View>
			</View>
			<View
				style={{
					height: '30%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Button
					title="Register"
					buttonStyle={{backgroundColor: 'black'}}
					containerStyle={{
						width: 200,
						marginHorizontal: 50,
						marginVertical: 10,
					}}
					onPress={handleRegister}
					titleStyle={{color: 'white', marginHorizontal: 20}}
				/>
			</View>
			<View style={{marginTop: 0, height: '20%', alignItems: 'center'}}>
				<Tab
					variant="default"
					indicatorStyle={{
						backgroundColor: '#999999',
						height: 3,
					}}
					value={index}
					onChange={(value) => {}}
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
	);
	return <Text></Text>;
};

export default ForgotPasswordScreen;
