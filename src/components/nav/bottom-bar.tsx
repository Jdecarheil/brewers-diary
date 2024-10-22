import {ImageSourcePropType, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {baseStyles} from '@styles/base';
import {NavBarButton} from '@constants/enum';
import {Avatar} from '@rneui/base';
import {s} from 'react-native-size-matters';

export type BottomBarProps = {
	left?: {uri: ImageSourcePropType; size?: number};
	middle?: {uri: ImageSourcePropType; size?: number};
	right?: {uri: ImageSourcePropType; size?: number};
	onPress?: (value: NavBarButton) => void;
};

export const BottomBar = (props: BottomBarProps) => {
	const {left, middle, right, onPress} = props;

	return (
		<View style={styles.container}>
			{onPress ? (
				<>
					<View style={styles.subContainer}>
						{left ? (
							<TouchableOpacity
								onPress={() => onPress(NavBarButton.LEFT)}
							>
								<Avatar
									source={left.uri}
									size={s(27) ?? left.size}
								/>
							</TouchableOpacity>
						) : null}
					</View>
					<View style={styles.subContainer}>
						{middle ? (
							<TouchableOpacity
								onPress={() => onPress(NavBarButton.MIDDLE)}
							>
								<Avatar
									source={middle.uri}
									size={s(27) ?? middle.size}
								/>
							</TouchableOpacity>
						) : null}
					</View>
					<View style={styles.subContainer}>
						{right ? (
							<TouchableOpacity
								onPress={() => onPress(NavBarButton.RIGHT)}
							>
								<Avatar
									source={right.uri}
									iconStyle={{elevation: 20}}
									size={s(27) ?? right.size}
								/>
							</TouchableOpacity>
						) : null}
					</View>
				</>
			) : null}
		</View>
	);
};

export const styles = StyleSheet.create({
	container: {
		...baseStyles.setMiddleContainer,
		flexDirection: 'row',
	},
	subContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
