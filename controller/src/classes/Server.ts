import Profile from './Profile';

export interface ServerResponse {
	error: {
		message: string;
	};
}

export interface UpdateRequest {
	profileId: string;
	timestamp: number;
	data: Profile;
}

export interface UpdateResponse {
	request: UpdateRequest;
	error: {
		message: string;
	};
}
