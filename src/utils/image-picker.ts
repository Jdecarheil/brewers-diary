import {FormUploadData} from '@global-types/user-config';
import {
	ImagePickerResponse,
	MediaType,
	launchImageLibrary,
} from 'react-native-image-picker';

export async function openImagePicker(): Promise<ImagePickerResponse> {
	const options = {
		mediaType: 'photo' as MediaType,
		includeBase64: false,
		maxHeight: 2000,
		maxWidth: 2000,
	};

	return launchImageLibrary(options, (response) => {
		let pickerResponse: ImagePickerResponse = {
			assets: [],
			didCancel: false,
			errorMessage: '',
		};

		if (response.didCancel) {
			console.log('User cancelled image picker');

			pickerResponse = {
				...response,
				errorMessage: 'User cancelled image picker',
			};
			return pickerResponse;
		} else if (response.errorMessage) {
			console.log('Image picker error: ', response.errorMessage);
			pickerResponse = {
				...response,
				errorMessage: 'Image picker error' + response.errorMessage,
			};
			return pickerResponse;
		} else {
			if (response.assets && response.assets?.[0]) {
				let uri = response.assets[0].uri;
				let type = response.assets[0].type;
				let name = response.assets[0].fileName;
				let size = response.assets[0].fileSize;

				if (!uri || !type || !name || !size) {
					pickerResponse = {
						...response,
						errorMessage: 'Image did not load properly',
					};
					return pickerResponse;
				} else if (type !== ('image/jpeg' || 'image/png')) {
					pickerResponse = {
						...response,
						errorMessage: 'Images must be in png or jpeg format',
					};
					return pickerResponse;
				} else if (size > 2000000) {
					pickerResponse = {
						...response,
						errorMessage: 'File size is too big, max 2mb',
					};
					return pickerResponse;
				} else {
					pickerResponse = {
						...response,
					};
					return pickerResponse;
				}
			} else {
				pickerResponse = {
					...response,
					errorMessage: 'Something went wrong with file selection',
				};

				return pickerResponse;
			}
		}
	});
}
