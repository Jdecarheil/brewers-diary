import {showMessage} from 'react-native-flash-message';
// import {fetch as NetFetch} from '@react-native-community/netinfo';

type FetchApi = {
	url: string;
	method: string;
	headers?: any;
	cache?: string;
	credentials?: string;
	data?: {};
};

// export function checkConnection() {
// 	NetFetch().then((state) => {
// 		if (!state.isConnected) {
// 			showMessage({
// 				message: "You don't seem to have a connection to the internet",
// 			});
// 		}
// 	});
// }

export const ResponseError = (res: Response, headers: Headers) => {
	const errorMessage =
		'An error occured with request: ' +
		res.url +
		' with message ' +
		res.status +
		' message: ' +
		res.body +
		' headers: ' +
		{...headers, 'x-hasura-admin-secret': '*REDACTED*'};
	console.log(errorMessage); //Todo Sentry imp
};

export const showErrorMessageToUser = (message: string) => {
	showMessage({
		message: message,
		type: 'info',
	});
};

export const request = async (props: FetchApi) => {
	const {headers, method, url, data} = props;
	// checkConnection();

	try {
		const res = await fetch(url, {
			method: method,
			headers: new Headers({...headers}),
			body: data ? JSON.stringify(data) : undefined,
		});

		if (res.ok) return res.json();

		switch (res.status) {
			case 401:
				showErrorMessageToUser(
					'User not authenticated, try logging in again',
				);
				break;
			case 403:
				showErrorMessageToUser('User cannot access this resource');
				break;
			case 500 | 501 | 502 | 503 | 404:
				showErrorMessageToUser('Something went wrong');
				ResponseError(res, headers);
				break;
			default:
				showErrorMessageToUser('Something went wrong');
				ResponseError(res, headers);
		}
	} catch (e) {
		const error =
			'An unknown  error occured with fetch request to: <' +
			url +
			'> with headers: ' +
			{...headers, 'x-hasura-admin-secret': '*REDACTED*'} +
			e;

		console.log(error);
		//Todo Sentry imp
	}
};
