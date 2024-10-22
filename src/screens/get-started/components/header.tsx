import {useNhostClient} from '@nhost/react';
import {profileAtomFamily} from '@lib/atoms/profile';
import {
	Image,
	ImageSourcePropType,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import {ScaledSheet, s} from 'react-native-size-matters';
import {useRecoilState} from 'recoil';
import {baseStyles} from '@styles/base';
import {baseFonts, baseSizes} from '@styles/constants';
import {useEffect, useState} from 'react';
import {StorageGetPresignedUrlResponse} from '@nhost/nhost-js';
import RNFetchBlob from 'rn-fetch-blob';

export type HeaderProps = {
	logout: () => void;
	settings: () => void;
	upload: () => void;
};

export type HeaderIconProps = {
	source: ImageSourcePropType;
	ariaLabel: string;
};

export const Header = (props: HeaderProps) => {
	const {settings, logout, upload} = props;
	const client = useNhostClient();
	const [profile] = useRecoilState(profileAtomFamily(''));
	const [profileImage, setProfileImage] = useState();

	useEffect(() => {
		let val: StorageGetPresignedUrlResponse;
		async function fetchProfileImage() {
			const meta_data: Record<string, unknown> | undefined =
				client.auth.getUser()?.metadata;
			if (meta_data) {
				val = await client.storage.getPresignedUrl({
					fileId: meta_data['profile_id'] as string,
				});

				if (val.presignedUrl)
					RNFetchBlob.fetch('GET', val.presignedUrl.url).then(
						(res) => {
							setProfileImage(res.base64());
						},
					);
			}
		}

		fetchProfileImage();
	}, []);

	return (
		<View style={styles.mainContainer}>
			<View style={styles.actionContainer}>
				<TouchableOpacity
					style={[styles.headerIcons, styles.headerIconLeft]}
					testID="header-icon-left"
					onPress={() => settings()}
				>
					<HeaderIcon
						ariaLabel={'settings-icon'}
						source={require('@assets/icons/settings.png')}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.middleContainer}>
				<TouchableOpacity
					onPress={() => upload()}
					testID="avatar-container"
					style={styles.avatarContainer}
				>
					<Image
						style={styles.avatar}
						aria-label={'user-image'}
						source={
							{uri: `data:image/jpeg;base64,${profileImage}`} ??
							require('@assets/images/default.png')
						}
					/>
				</TouchableOpacity>
				<View style={styles.titleContainer}>
					<Text style={styles.headerTitle} testID="header-user-name">
						{client.auth.getUser()?.displayName ?? 'Anonymous'}
					</Text>
				</View>
			</View>
			<View style={styles.actionContainer}>
				<TouchableOpacity
					style={[styles.headerIcons, styles.headerIconRight]}
					testID="header-icon-right"
					onPress={() => logout()}
				>
					<HeaderIcon
						ariaLabel={'logout-icon'}
						source={require('@assets/icons/logout.png')}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export const HeaderIcon = (props: HeaderIconProps) => {
	return (
		<Image
			source={props.source}
			aria-label={props.ariaLabel}
			style={styles.iconStyle}
		/>
	);
};

export const styles = ScaledSheet.create({
	avatar: {
		alignSelf: 'center',
		height: '100%',
		aspectRatio: 1,
		borderRadius: 180,
		borderWidth: 2,
		bottom: 0,
		borderColor: 'gray',
		zIndex: 4,
	},
	middleContainer: {
		flex: 2,
	},
	iconStyle: {
		width: '100%',
		height: '100%',
	},
	actionContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	titleContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	avatarContainer: {
		flex: 2,
		marginTop: 15,
		justifyContent: 'center',
	},
	headerTitle: {
		...baseStyles.headerTitle,
		fontSize: baseSizes.text_subtext,
		fontFamily: baseFonts.text_primary,
	},
	mainContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	headerIcons: {
		flex: 0.2,
		alignSelf: 'center',
		aspectRatio: 1,
	},
	headerIconLeft: {
		alignItems: 'flex-start',
		left: s(30),
	},
	headerIconRight: {
		alignItems: 'flex-end',
		right: s(30),
	},
});
