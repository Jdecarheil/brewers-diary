import {FormUploadData} from '@global-types/user-config';
import {NhostClient, StorageUploadFileParams} from '@nhost/nhost-js';

export async function uploadImage(client: NhostClient, data: FormUploadData) {
	let user = await client.auth.getUser();

	if (!user) {
		throw 'No users present w hen attempting to upload profile picture';
	}

	const form = new FormData();

	form.append('file', {uri: data.uri, name: data.name, type: data.type});
	try {
		const res = await client.storage.upload({
			formData: form,
			bucketId: 'default',
		});

		return res;
	} catch (e) {
		console.log('Error uploading image to storage' + e);
	}
}
