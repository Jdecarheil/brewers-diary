import {ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {baseStyles} from '@styles/base';
import {baseColors, baseSizes} from '@styles/constants';

export type BaseModalProps = {
	children: ReactNode;
	onCancel: (value: boolean) => void;
	isVisible: boolean;
	title: string;
	testID: string;
};

export const BaseModal = (props: BaseModalProps) => {
	const {children, onCancel, title, testID} = props;

	return (
		<View style={styles.modalContainer}>
			<View style={styles.header}>
				<View style={styles.headerRow}>
					<View style={styles.titleContainer}>
						<Text
							style={styles.title}
							testID={`${testID}-base-modal-title`}
						>
							{title}
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => onCancel(true)}
						testID={`${testID}-base-modal-close`}
						style={styles.cancelContainer}
					>
						<Text
							style={styles.cancel}
							testID={`${testID}-base-modal-x`}
						>
							X
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.body}>{children}</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	header: {
		borderTopRightRadius: 15,
		borderTopLeftRadius: 15,
		flex: 0.6,
		justifyContent: 'center',
		backgroundColor: baseColors.primary,
	},
	body: {
		flex: 8,
		backgroundColor: baseColors.secondary,
	},
	headerRow: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	bottomSheetStyles: {
		backgroundColor: baseColors.secondary,
		flex: 0.7,
		zIndex: 1,
	},
	container: {
		flex: 1,
		position: 'absolute',
		top: 0,
		zIndex: 1,
		backgroundColor: baseColors.secondary,
	},
	title: {
		color: baseColors.secondary,
		fontSize: baseSizes.text_subtext,
		alignSelf: 'center',
	},
	cancel: {
		...baseStyles.cancelIcon,
		fontSize: baseSizes.text_subtext,
		alignSelf: 'flex-end',
		marginRight: 25,
	},
	titleContainer: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	cancelContainer: {
		alignItems: 'center',
		flex: 1,
		position: 'absolute',
		right: 0,
	},
	modalContainer: {
		width: baseStyles.windowSpecs.width,
		alignSelf: 'center',
		backgroundColor: 'transparent',
		height: baseStyles.windowSpecs.height / 1.3,
		bottom: 0,
		elevation: 20,
		position: 'absolute',
		zIndex: 999,
	},
});
