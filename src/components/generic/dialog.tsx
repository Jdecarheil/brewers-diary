import {Dialog} from '@rneui/base';
import {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {baseColors} from '@styles/constants';

export type DialogBoxProps = {
	isVisible: boolean;
	onPress1: () => void;
	onCancel: (value: boolean) => void;
	children: ReactNode[];
	title: string;
};

export const DialogBox = (props: DialogBoxProps) => {
	const {isVisible, onPress1, onCancel, children, title} = props;

	return (
		<Dialog
			isVisible={isVisible}
			onBackdropPress={() => onCancel(false)}
			overlayStyle={styles.overlayStyle}
		>
			<Dialog.Title title={title} />
			{children}
		</Dialog>
	);
};

export const styles = StyleSheet.create({
	overlayStyle: {
		backgroundColor: baseColors.secondary,
		borderWidth: 1,
		alignItems: 'center',
	},
});
