import {ButtonComponent as Button} from '@generic-components/button';
import {StyleSheet, Text, View} from 'react-native';

import {baseStyles} from '@styles/base';
import {baseColors, baseFonts, baseSizes} from '@styles/constants';
import {TouchableOpacity} from 'react-native';

export type LogoutAlert = {
	showLogout: (value: boolean) => void;
	showLogin: () => void;
};

export const LogoutAlert = (props: LogoutAlert) => {
	return (
		<View style={styles.logoutAlertContainer}>
			<View style={styles.textContainer}>
				<Text style={styles.logoutAlertTitle}>Logout?</Text>
				<Text style={styles.logoutAlertSubtext}>
					Your recipes will be saved for when you come back.
				</Text>
			</View>
			<Button
				title="Login to another account"
				onPress={() => props.showLogin()}
				buttonStyle={styles.logoutButton}
				containerStyle={styles.buttonContainer}
			/>
			<View style={styles.linkTextContainer}>
				<TouchableOpacity onPress={() => props.showLogout(false)}>
					<Text style={styles.linkText}>{'Cancel'}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

// export const deleteAlert = (client: NhostClient, deleteAccount: () => void) => {
//   try {
//     Alert.alert(
//       'Are you sure you want to delete this account?',
//       'This will erase all of your data associated with this account',
//       [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Cancel Pressed'),
//           style: 'cancel',
//         },
//         {
//           text: 'Yes',
//           onPress: () => {
//             // client.auth.();
//             // signOut();
//           },
//         },
//       ],
//     );
//   } catch (error) {
//     console.log('Error logging user out');
//   }
// };

const styles = StyleSheet.create({
	logoutAlertContainer: {
		width: baseStyles.windowSpecs.width / 1.2,
		alignSelf: 'center',
		top: baseStyles.windowSpecs.height / 3.8,
		bottom: baseStyles.windowSpecs.height / 3.8,
		borderRadius: 8,
		elevation: 8,
		position: 'absolute',
		backgroundColor: baseColors.secondary,
		zIndex: 999,
	},
	buttonContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textContainer: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logoutAlertTitle: {
		color: baseColors.secondary,
		alignSelf: 'center',
		fontSize: baseSizes.text_h1,
		fontFamily: baseFonts.text_primary,
		fontWeight: '700',
	},
	logoutAlertSubtext: {
		alignSelf: 'center',
		marginTop: 20,
		textAlign: 'center',
		width: '80%',
		fontSize: baseSizes.text_subtext,
	},
	logoutButton: {
		backgroundColor: baseColors.primary,
		color: 'white',
		borderRadius: 20,
		width: '80%',
	},
	linkTextContainer: {
		color: baseColors.primary,
		justifyContent: 'center',
		flex: 1,
	},
	linkText: {
		...baseStyles.baseText,
		fontSize: baseSizes.text_subtext,
		fontWeight: '700',
		alignSelf: 'center',
		bottom: 40,
	},
});
