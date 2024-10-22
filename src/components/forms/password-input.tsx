import {Avatar, Input} from '@rneui/base';
import {baseStyles} from '@styles/base';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ScaledSheet, s} from 'react-native-size-matters';

export type PasswordInputProps = {
	password: string;
	error: string;
	label: string;
	placeholder: string;
	setError: (value: string) => void;
	setPassword: (value: string) => void;
	vs: number;
};

export const PasswordInput = (props: PasswordInputProps) => {
	const {password, setPassword, error, setError, label, placeholder, vs} =
		props;
	return (
		<Input
			containerStyle={{width: '80%'}}
			errorMessage={error}
			label={label}
			secureTextEntry={true}
			rightIcon={
				<TouchableOpacity
					onPress={() => setPassword('')}
					style={baseStyles.inputIconContainer}
				>
					<Image
						source={require('@assets/icons/clear.png')}
						style={baseStyles.inputIcon}
					/>
				</TouchableOpacity>
			}
			leftIcon={
				<Image
					source={require('@assets/icons/key.png')}
					style={baseStyles.inputIcon}
				/>
			}
			onChangeText={(value) => setPassword(value)}
			onKeyPress={() => setError('')}
			value={password}
			placeholder={placeholder}
		/>
	);
};
