import Input from '@generic-components/input';
import {Avatar} from '@rneui/base';
import {baseStyles} from '@styles/base';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ScaledSheet, s} from 'react-native-size-matters';

export type EmailInputProps = {
	email: string;
	error: string;
	setError: (value: string) => void;
	setEmail: (value: string) => void;
	placeholder: string;
};

export const EmailInput = (props: EmailInputProps) => {
	const {email, setEmail, error, setError, placeholder} = props;

	return (
		<Input
			errorMessage={error}
			containerStyle={{width: '80%'}}
			label="Email"
			rightIcon={
				<TouchableOpacity
					onPress={() => setEmail('')}
					style={baseStyles.inputIconContainer}
				>
					<Image
						source={require('assets/icons/clear.png')}
						style={baseStyles.inputIcon}
					/>
				</TouchableOpacity>
			}
			leftIcon={
				<Image
					source={require('assets/icons/email.png')}
					style={baseStyles.inputIcon}
				/>
			}
			onChangeText={(value) => setEmail(value)}
			onKeyPress={() => setError('')}
			value={email}
			placeholder={placeholder}
		/>
	);
};
