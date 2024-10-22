import {Avatar} from '@rneui/base';
import {StyleSheet, Text, View} from 'react-native';
import {s} from 'react-native-size-matters';
import {baseStyles} from '@styles/base';

export type HeaderProps = {
	title: string;
};

export const Header = (props: HeaderProps) => {
	const {title} = props;

	return (
		<View style={baseStyles.mainContainer}>
			<View style={styles.innerBody}>
				<Avatar
					source={require('assets/icons/hops.png')}
					size={s(40)}
				/>
				<Text style={baseStyles.h1Title}>{title}</Text>
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	innerBody: {
		top: 20,
		alignItems: 'center',
	},
});
