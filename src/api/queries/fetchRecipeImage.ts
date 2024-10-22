import {NhostClient} from '@nhost/nhost-js';
import {requestHeaders} from '@api/headers';
import {request} from '@api/request';

export async function fetchRecipeImage(client: NhostClient, id: string) {
	let user = client.auth.getUser();
	let user_id = user?.id;
	let body = new FormData();
	body.append('photo', {
		uri: 'assets/icons',
		name: 'ignore',
		fileName: 'return.png',
		type: 'image/png',
	});
	body.append('Content-Type', 'image/png');
	const {presignedUrl, error} = await client.storage.getPresignedUrl({
		fileId: '95251a8d-df16-4a41-87b8-fbb2cc1bdaa5',
	});
	// const uriRes = await client.storage.upload({formData: body})

	// search.recipe_id ? additionalQuery = `&recipe_id=${search.recipe_id}` : null;

	if (!user) {
		throw 'No user present when fetching recipes';
	}
	try {
		const props = {
			url: presignedUrl?.url ?? '',
			method: 'GET',
			headers: requestHeaders(client),
		};
		const result = await request(props);
		return result;
	} catch (e) {
		console.log('Error fetching recipes in request: ' + e);
	}
}
