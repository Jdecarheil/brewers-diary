export interface ClientStorage {
	setItem?: (key: string, value: string) => void;
	getItem?: (key: string) => any;
	removeItem?: (key: string) => void;
	set?: (options: {key: string; value: string}) => void;
	get?: (options: {key: string}) => any;
	remove?: (options: {key: string}) => void;
	setItemAsync?: (key: string, value: string) => void;
	getItemAsync?: (key: string) => any;
	deleteItemAsync?: (key: string) => void;
}

export interface UserConfig {
	baseURL: string;
	useCookies?: boolean;
	refreshIntervalTime?: number | null;
	clientStorage?: ClientStorage;
	clientStorageType?: string;
	autoLogin?: boolean;
	ssr?: boolean;
}

export type FormUploadData = {
	uri: string;
	type: string;
	name: string;
};
