import {fetchMock} from 'src/__mocks__/request';
import {request, showErrorMessageToUser} from './request';
import {showMessage} from 'react-native-flash-message';

jest.mock('react-native-flash-message', () => ({
	showMessage: jest.fn() as jest.Mock,
}));

describe('request.ts', () => {
	const props = {
		url: 'http:example.com',
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			'x-hasura-admin-secret': '*REDACTED*',
			'x-hasura-user-id': 'example',
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('verifies status ok passed with correct response body', async () => {
		fetchMock.mockImplementationOnce(() => {
			return new Promise((resolve) => {
				resolve({
					ok: true,
					status: 200,
					json: () => {
						return '{sample: sample}';
					},
				});
			});
		});

		const response = await request(props);
		expect(response).toEqual('{sample: sample}');
	});

	test('verifies user notifed of 401 and returns empty body', async () => {
		showErrorMessageToUser as jest.Mock;
		fetchMock.mockImplementationOnce(() => {
			return new Promise((resolve) => {
				resolve({
					ok: false,
					status: 401,
				});
			});
		});

		const response = await request(props);
		expect(response).toEqual(undefined);
		expect(showMessage).toHaveBeenCalledTimes(1);
		expect(showMessage).toHaveBeenCalledWith({
			message: 'User not authenticated, try logging in again',
			type: 'info',
		});
	});

	test('verifies user notifed of 403 and returns empty body', async () => {
		fetchMock.mockImplementationOnce(() => {
			return new Promise((resolve) => {
				resolve({
					ok: false,
					status: 403,
				});
			});
		});

		const response = await request(props);
		expect(response).toEqual(undefined);
		expect(showMessage).toHaveBeenCalledTimes(1);
		expect(showMessage).toHaveBeenCalledWith({
			message: 'User cannot access this resource',
			type: 'info',
		});
	});

	test('verifies user notifed of server error', async () => {
		fetchMock.mockImplementationOnce(() => {
			return new Promise((resolve) => {
				resolve({
					ok: false,
					status: 500,
				});
			});
		});

		const response = await request(props);
		expect(response).toEqual(undefined);
		expect(showMessage).toHaveBeenCalledTimes(1);
		expect(showMessage).toHaveBeenCalledWith({
			message: 'Something went wrong',
			type: 'info',
		});
	});

	test('verifies user notifed of server error for all other cases', async () => {
		fetchMock.mockImplementationOnce(() => {
			return new Promise((resolve) => {
				resolve({
					ok: false,
					status: 600,
				});
			});
		});

		const response = await request(props);
		expect(response).toEqual(undefined);
		expect(showMessage).toHaveBeenCalledTimes(1);
		expect(showMessage).toHaveBeenCalledWith({
			message: 'Something went wrong',
			type: 'info',
		});
	});

	test('verifies error catching for request', async () => {
		fetchMock.mockImplementationOnce(() => {
			return new Promise((reject) => {
				reject({});
			});
		});
		await expect(request(props)).toEqual('');
		// expect(() => request(props)).toThrow();
	});
});
