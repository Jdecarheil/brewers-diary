import {TextInput} from '@generic-components/text-input';
import {Text, View} from 'react-native';
import {styles} from '@recipe-editable-styles/new-item-modal';

export type DurationInputProps = {
	onChange: (value: string) => void;
	value: string;
};

export const DurationInput = (props: DurationInputProps) => {
	const {value, onChange} = props;

	return (
		<View style={styles.outerContainer}>
			<View style={styles.inputContainer}>
				<Text>Duration (min)</Text>
				<TextInput
					style={styles.input}
					value={value}
					onChange={onChange}
					placeholder={'Duration'}
				/>
			</View>
		</View>
	);
};
