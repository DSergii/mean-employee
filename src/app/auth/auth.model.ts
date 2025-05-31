export interface AuthModel {
	email: string;
	password: string;
}

export interface AuthResponseModel {
	message: string;
	result: AuthModel;
}
