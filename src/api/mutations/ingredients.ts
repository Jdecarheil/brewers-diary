import {NhostClient} from '@nhost/nhost-js';
import {requestHeaders} from '@api/headers';
import {request} from '@api/request';

export async function ingredients(
	client: NhostClient,
	data: {},
	endpoint: string,
	method: string,
) {
	let user = client.auth.getUser();

	if (!user) {
		throw 'No user present when fetching recipes';
	}

	try {
		const props = {
			url: `${process.env.NHOST_BASE}/${process.env.NHOST_REST_BASE}/${endpoint}`,
			method: method,
			headers: requestHeaders(client),
			data: {data},
		};
		const result = await request(props);
		return result;
	} catch (e) {
		console.log('Error fetching recipes in request: ' + e);
	}
}
