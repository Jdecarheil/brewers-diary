import {TextInput} from '@generic-components/text-input';
import {Text, View} from 'react-native';
import {styles} from '@recipe-editable-styles/new-item-modal';

export type ColorProps = {
	onChange: (value: string) => void;
	value: string;
};

export const ColorInput = (props: ColorProps) => {
	const {onChange, value} = props;
	return (
		<View style={styles.outerContainer}>
			<View style={styles.inputContainer}>
				<Text>Color</Text>
				<TextInput
					style={styles.input}
					value={value}
					onChange={onChange}
					placeholder="EBC"
				/>
			</View>
		</View>
	);
};
