import {request} from '@api/request';
import {requestHeaders} from '@api/headers';

import {NhostClient} from '@nhost/nhost-js';

export async function addRecipe(client: NhostClient) {
	let user = client.auth.getUser();
	let user_id = user?.id;

	if (!user) {
		throw 'No user present when fetching recipes';
	}

	try {
		const props = {
			url: `${process.env.NHOST_BASE}/${process.env.NHOST_REST_BASE}/recipes`,
			method: 'POST',
			data: {uid: user_id},
			headers: requestHeaders(client),
		};
		const result = await request(props);
		return result;
	} catch (e) {
		console.log('Error adding new recipe in: ' + e);
	}
}
