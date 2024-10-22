import {IndexPath} from '@ui-kitten/components';
import {SelectInput} from '@generic-components/select-input';
import {Text, View} from 'react-native';
import {styles} from '@recipe-editable-styles/new-item-modal';

export type CrushProps = {
	items: string[];
	index: IndexPath | IndexPath[];
	size: string;
	title: string;
	handleCrushChange: (index: IndexPath | IndexPath[]) => void;
};

export const CrushInput = (props: CrushProps) => {
	const {items, index, handleCrushChange} = props;

	return (
		<View style={styles.outerContainer}>
			<View style={styles.inputContainer}>
				<Text>Crush</Text>
				<SelectInput
					size="large"
					items={items}
					currentIndex={index}
					selectedIndex={handleCrushChange}
				/>
			</View>
		</View>
	);
};
