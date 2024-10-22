import {NhostClient} from '@nhost/nhost-js';

export const requestHeaders = (client: NhostClient, additionalHeaders?: {}) => {
	return {
		'content-type': 'application/json',
		'x-hasura-admin-secret': '!i5$3@17*TdkZ$JKyXQ^bGExVO#Ji33Q',
		'x-hasura-user-id': client.auth.getUser()?.id,
		...additionalHeaders,
	};
};
