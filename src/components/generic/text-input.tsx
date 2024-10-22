import {TextInput as InputText, StyleSheet} from 'react-native';
import {baseColors} from '@styles/constants';

export type TextInputProps = {
	onChange: (value: string) => void;
	value: string;
	placeholder?: string;
	style?: {};
	multiline?: boolean;
	editable?: boolean;
};

export const TextInput = (props: TextInputProps) => {
	const {onChange, value, placeholder, style, multiline, editable} = props;

	return (
		<InputText
			editable={editable}
			multiline={multiline ?? false}
			style={[styles.textInput, style]}
			onChangeText={(text) => onChange(text)}
			value={value}
			placeholder={placeholder}
		/>
	);
};

export const styles = StyleSheet.create({
	textInput: {
		borderWidth: 1,
		borderColor: baseColors.tertiary,
		borderRadius: 8,
		paddingLeft: 14,
		color: baseColors.input_placeholder,
	},
});
