import {NhostClient} from '@nhost/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const nhost = new NhostClient({
	graphqlUrl: process.env.NHOST_GRAPHQL_URL,
	authUrl: process.env.NHOST_AUTH_URL,
	storageUrl: process.env.NHOST_STORAGE_URL,
	subdomain: process.env.NHOST_SUBDOMAIN,
	region: process.env.NHOST_REGION,
	clientStorageType: 'react-native',
	clientStorage: AsyncStorage,
});

export {nhost};
