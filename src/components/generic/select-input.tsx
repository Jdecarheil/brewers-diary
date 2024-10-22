import {StyleSheet} from 'react-native';
import {IndexPath, Layout, Select, SelectItem} from '@ui-kitten/components';
import React from 'react';

export type SelectInputProps = {
	items: string[];
	selectedIndex: (index: IndexPath | IndexPath[]) => void;
	currentIndex: IndexPath | IndexPath[];
	style?: {};
	size: string;
};

export const SelectInput = (props: SelectInputProps) => {
	const {items, selectedIndex, currentIndex, style, size} = props;

	return (
		<Layout style={styles.container} level="1">
			<Select
				selectedIndex={currentIndex}
				style={style}
				size={size}
				value={items[parseInt(currentIndex.toString()) - 1]}
				onSelect={(index) => selectedIndex(index)}
			>
				{items.map((item) => {
					return (
						<SelectItem
							style={{backgroundColor: 'white'}}
							title={item}
						/>
					);
				})}
			</Select>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
	},
});
