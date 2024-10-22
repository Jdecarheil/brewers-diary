import {request} from '@api/request';
import {requestHeaders} from '@api/headers';

import {NhostClient} from '@nhost/nhost-js';

export async function updateProfile(
	client: NhostClient,
	file_id: string | undefined,
): Promise<boolean> {
	let user = client.auth.getUser();
	let user_id = user?.id;

	if (!user) {
		throw 'No user present when fetching recipes';
	}

	try {
		const props = {
			url: `${process.env.NHOST_BASE}/${process.env.NHOST_REST_BASE}/users`,
			method: 'PATCH',
			data: {id: user_id, file_id: file_id},
			headers: requestHeaders(client),
		};
		const result = await request(props);
		return result.ok ?? false;
	} catch (e) {
		console.log('Error adding new recipe in: ' + e);
		return false;
	}
}
