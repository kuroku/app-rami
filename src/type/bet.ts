export interface MarketCatalogue {
	userBet: {
		marketId: string;
		competitionId: string;
		selectionId: string;
		percentage: number;
		amount: number;
		_id: string;
		auto: boolean;
	};
	status?: string;
	marketId: string;
	marketName: string;
	marketStartTime: Date;
	description: {
		persistenceEnabled: boolean;
		bspMarket: boolean;
		marketTime: Date;
		suspendTime: Date;
		bettingType: string;
		turnInPlayEnabled: boolean;
		marketType: string;
		regulator: string;
		marketBaseRate: number;
		discountAllowed: boolean;
		wallet: string;
		rules: string;
		rulesHasDate: boolean;
		priceLadderDescription: {
			type: string;
		};
	};
	totalMatched: number;
	runners: Array<{
		selectionId: number;
		runnerName: string;
		handicap: number;
		sortPriority: number;
		status: string | null;
		metadata: {
			runnerId: string;
		};
	}>;
	competition: {
		id: string;
		name: string;
	};
}

export interface ListRunnerBook {
	marketId: string;
	isMarketDataDelayed: boolean;
	status: 'OPEN' | 'CLOSED' | 'INACTIVE';
	betDelay: number;
	bspReconciled: boolean;
	complete: boolean;
	inplay: boolean;
	numberOfWinners: number;
	numberOfRunners: number;
	numberOfActiveRunners: number;
	totalMatched: number;
	totalAvailable: number;
	crossMatching: boolean;
	runnersVoidable: boolean;
	version: number;
	runners: Array<{
		selectionId: number;
		handicap: number;
		status: string;
		totalMatched: number;
		ex: {
			availableToBack: Array<{
				price: number;
				size: number;
			}>;
			availableToLay: Array<{
				price: number;
				size: number;
			}>;
			tradedVolume: [];
		};
	}>;
}
