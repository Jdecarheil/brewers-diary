import {ButtonComponent} from '@generic-components/button';
import {BaseModal} from '@generic-components/modal-base';
import {Image, StyleSheet, Text, View} from 'react-native';
import {baseStyles} from '@styles/base';
import {baseColors} from '@styles/constants';
import {UploadImageType} from '@constants/enum';
import {useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {useNhostClient} from '@nhost/react';
import {uploadImage} from '@api/mutations/upload-image';
import {FormUploadData} from '@global-types/user-config';
import {openImagePicker} from '@utils/image-picker';
import {updateProfile} from '@api/mutations/update_profile';

export type UploadImageModalProps = {
	changeImageUploadStatus: (value: boolean) => void;
	isVisible: boolean;
	type: UploadImageType;
};

export type ImageModalProps = {
	type: UploadImageType;
	onCancel: (value: boolean) => void;
};

export const UploadImageModal = (props: UploadImageModalProps) => {
	const {changeImageUploadStatus, isVisible, type} = props;
	return (
		<BaseModal
			title="Upload new profile image"
			testID="upload-profile-image"
			isVisible={isVisible}
			children={
				<ImageModal type={type} onCancel={changeImageUploadStatus} />
			}
			onCancel={changeImageUploadStatus}
		/>
	);
};

export const ImageModal = (props: ImageModalProps) => {
	const {onCancel} = props;
	const [selectedImage, setSelectedImage] = useState<
		FormUploadData | undefined
	>();
	const client = useNhostClient();
	const [error, setError] = useState('');

	const handleImageUpload = async () => {
		if (selectedImage) {
			const res = await uploadImage(client, selectedImage);
			const file_id = res?.fileMetadata?.processedFiles[0].id;

			if (file_id) {
				client.auth.refreshSession();
				const update_response = await updateProfile(client, file_id);
				if (!update_response) {
					const deleteProfileImage = await client.storage.delete({
						fileId: file_id,
					});
					if (deleteProfileImage.error) {
						console.log(deleteProfileImage.error);
					}
				}
			}

			if (res?.error) {
				setError('Something went wrong uploading your image');
			} else {
				onCancel(true);
			}
		} else setError('You have not selected an image');
	};

	const openImageSelection = async () => {
		const res = await openImagePicker();

		if (res.errorMessage) setError(res.errorMessage);
		else if (res.assets) {
			setError('Selected file: ' + res.assets[0].fileName);
			if (
				res.assets[0].uri &&
				res.assets[0].fileName &&
				res.assets[0].type
			)
				setSelectedImage({
					uri: res.assets[0].uri,
					name: res.assets[0].fileName,
					type: res.assets[0].type,
				});
		}
	};

	return (
		<View style={styles.imageModal}>
			<View style={styles.imageContainer}>
				<View style={styles.imageBackset}>
					<Image
						style={styles.image}
						aria-label="upload-image"
						source={require('@assets/icons/image-upload.png')}
					/>
				</View>
			</View>
			<View style={styles.selectFileButtonContainer}>
				<Text style={styles.error}>{error}</Text>
				<ButtonComponent
					buttonStyle={styles.fileButton}
					titleStyle={styles.fileButtonTitleStyle}
					containerStyle={styles.selectFileButtonContainerStyle}
					title="Select File"
					onPress={openImageSelection}
				/>
			</View>
			<View style={styles.subtextContainer}>
				<Text style={styles.text}>
					{props.type === UploadImageType.PROFILE
						? 'Uploaded images are subject to the terms and conditions in About'
						: 'Images are checked before submitting to the global collection of recipes'}
				</Text>
			</View>
			<View style={styles.saveButtonContainer}>
				<ButtonComponent
					buttonStyle={styles.saveButton}
					onPress={handleImageUpload}
					containerStyle={styles.saveButtonContainerStyle}
					title="Save"
				/>
			</View>
		</View>
	);
};

export const styles = StyleSheet.create({
	imageModal: {
		flex: 1,
	},
	imageContainer: {
		...baseStyles.setMiddleContainer,
		flex: 3,
	},
	image: {
		width: baseStyles.windowSpecs.width / 3,
		height: baseStyles.windowSpecs.width / 3,
	},
	imageBackset: {
		backgroundColor: baseColors.quaternary,
		padding: '2%',
		borderWidth: 3,
		borderRadius: 20,
		borderColor: baseColors.tertiary,
	},
	subtextContainer: {
		...baseStyles.setMiddleContainer,
		width: baseStyles.windowSpecs.width / 1.2,
		alignSelf: 'center',
	},
	error: {
		marginBottom: '4%',
	},
	text: {
		textAlign: 'center',
		color: baseColors.input_placeholder,
	},
	saveButtonContainer: {
		...baseStyles.setMiddleContainer,
	},
	saveButton: {
		backgroundColor: baseColors.primary,
	},
	saveButtonContainerStyle: {
		width: baseStyles.windowSpecs.width / 1.2,
		borderRadius: 10,
	},
	selectFileButtonContainer: {
		...baseStyles.setMiddleContainer,
	},
	fileButton: {
		backgroundColor: baseColors.tertiary,
		color: baseColors.primary,
	},
	selectFileButtonContainerStyle: {
		width: baseStyles.windowSpecs.width / 2,
		borderRadius: 10,
	},
	fileButtonTitleStyle: {
		color: baseColors.primary,
	},
});
