import {NhostClient} from '@nhost/nhost-js';
import {requestHeaders} from '@api/headers';
import {request} from '@api/request';

export async function fetchRecipes(
	client: NhostClient,
	search: {recipe_id?: number; name?: string; isPublic: boolean},
) {
	let user_id = client.auth.getUser()?.id;
	let queryParams;
	let endpoint;

	if (search.isPublic) {
		queryParams = '?public=1';
		endpoint = 'public-recipes';
	} else {
		queryParams = '?uid=' + user_id;
		endpoint = 'recipes';
	}

	if (!user_id) {
		throw 'No user present when fetching recipes';
	}

	const props = {
		url:
			`${process.env.NHOST_BASE}/${process.env.NHOST_REST_BASE}/${endpoint}` +
			queryParams,
		method: 'GET',
		headers: requestHeaders(client),
	};

	const result = await request(props);

	return result;
}
