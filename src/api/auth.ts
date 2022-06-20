import type { MarketCatalogue } from 'src/type/bet';
import type { User } from 'src/type/user';
import { request } from './request';

export const findAuthenticationByEmailRequest = (email: string) => {
	return request.post<{ user: User }>(
		'/api/v1/user/findAuthByEmailIfExist',
		{ email },
		{ validateStatus: () => true }
	);
};

export const loginRequest = (email: string, password: string) => {
	return request.post<User>(
		'/api/v1/user/login',
		{ email, password },
		{ validateStatus: () => true }
	);
};

export const registerRequest = ({ name, lastname, email, password }: User) => {
	return request.post<User>(
		'/api/v1/user/register',
		{ name, lastname, email, password },
		{ validateStatus: () => true }
	);
};

export const betRequest = (
	tokenSession: string,
	body: {
		marketId: string;
		selectionId: number;
		percentage: number;
		amount: number;
		runners: Array<{
			selectionId: number;
			runnerName: string;
		}>;
		competition: {
			id: string;
			name: string;
		};
		_id: string | null;
	}
) => {
	return request.post<User>(
		'/api/v1/user/bet',
		{ ...body, tokenSession },
		{ validateStatus: () => true }
	);
};

export const getHistoryRequest = (tokenSession: string) => {
	return request.post<{ result: MarketCatalogue[] }>(
		'/api/v1/user/history',
		{ tokenSession },
		{ validateStatus: () => true }
	);
};

export const postAutoBetRequest = (
	tokenSession: string,
	body: { typeBet: string; amount: number }
) => {
	return request.post<{ result: MarketCatalogue[] }>(
		'/api/v1/user/auto-bet',
		{ tokenSession, ...body },
		{ validateStatus: () => true }
	);
};
