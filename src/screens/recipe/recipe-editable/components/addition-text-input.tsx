import {Input} from '@ui-kitten/components';

export type AdditionTextInputProps = {
	placeholder: string;
	vs: number;
	label: string;
	value: string;
	onChange: (value: string) => void;
	caption?: string;
};

const AdditionTextInput = (props: AdditionTextInputProps) => {
	const {placeholder, label, onChange, caption, value} = props;

	return (
		<Input
			label={label}
			placeholder={placeholder}
			value={value}
			caption={caption}
			onChangeText={(nextValue) => onChange(nextValue)}
		/>
	);
};

export default AdditionTextInput;
