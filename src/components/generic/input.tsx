import {IconNode, IconType, Input} from '@rneui/base';

type InputComponentProps = {
	containerStyle?: Object;
	inputContainerStyle?: Object;
	errorMessage?: string;
	errorStyle?: Object;
	inputStyle?: Object;
	onChangeText?: (value: string) => void;
	onKeyPress?: () => void;
	value: string;
	label: string;
	labelStyle?: Object;
	leftIcon?: IconNode;
	leftIconContainerStyle?: Object;
	rightIcon?: IconNode;
	rightIconContainerStyle?: Object;
	placeHolderTextColor?: string;
	placeholder?: string;
	secureTextEntry?: boolean;
	iconType?: IconType;
};

const InputComponent = (props: InputComponentProps) => {
	const {
		containerStyle,
		errorStyle,
		labelStyle,
		placeHolderTextColor,
		onChangeText,
		onKeyPress,
	} = props;
	return (
		<Input
			containerStyle={containerStyle ?? {width: '80%'}}
			errorStyle={errorStyle ?? {color: '#999999'}}
			inputContainerStyle={{}}
			labelStyle={labelStyle ?? {color: '#999999'}}
			placeholderTextColor={placeHolderTextColor ?? '#999999'}
			onChangeText={onChangeText}
			onKeyPress={onKeyPress}
			{...props}
		/>
	);
};

export default InputComponent;
