import {NhostClient} from '@nhost/nhost-js';
import {requestHeaders} from '@api/headers';
import {request} from '@api/request';

export async function deleteRecipe(client: NhostClient, recipe_id: number) {
	let user = client.auth.getUser();
	let user_id = user?.id;

	if (!user) {
		throw 'No user present when fetching recipes';
	}

	if (recipe_id === 0) {
		throw 'Recipe id not found';
	}

	try {
		const props = {
			url: `${process.env.NHOST_BASE}/${process.env.NHOST_REST_BASE}/recipes/${recipe_id}`,
			method: 'DELETE',
			headers: requestHeaders(client),
		};
		const result = await request(props);
		return result;
	} catch (e) {
		console.log('Error fetching recipes in request: ' + e);
	}
}
