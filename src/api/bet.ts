import type { ListRunnerBook, MarketCatalogue } from '../type/bet';
import { request } from './request';

export const getMarketCatalogueRequest = (sort: string, tokenSession?: string) => {
	return request.get<{ result: MarketCatalogue[] }>(
		`/api/v1/bet/market-catalogue?sort=${sort}${
			tokenSession ? `&tokenSession=${tokenSession}` : ''
		}`,
		{
			validateStatus: () => true
		}
	);
};

export const getListRunnerBookRequest = (marketId: string, selectionId: number) => {
	return request.get<{ result: ListRunnerBook[] }>(
		`/api/v1/bet/list-runner-book?marketId=${marketId}&selectionId=${selectionId}`,
		{
			validateStatus: () => true
		}
	);
};
