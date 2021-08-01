import BigNumber from "bignumber.js";

export interface IAssetPriceChainItem {
    name: string;       // Unique asset name (eg: USDT)
    price: BigNumber;   // Price of asset
    factor?: BigNumber; // Factor by which to multiply underlying asset to get price
}

export interface IAssetPrice {
    price: BigNumber;
    chain: IAssetPriceChainItem[];
}

export interface ITransaction {
    blockNumber: string;
    timestamp: string; // unix timestamp (seconds)
    hash: string;
}

export interface IAssetPosition {
    id: string;
    baseId: string;
    shares: BigNumber;
    shareToken: string; // token name
    transaction: ITransaction;
    logo?: string;
}

export interface IAssetPositionCompleted extends IAssetPosition {
    transactionEntry: ITransaction;
}

export interface IAdapterHistory {
    name: string;                           // Adapter name
    ongoing: IAssetPosition[];              // Positions currently active
    completed: IAssetPositionCompleted[];   // Positions already closed (eg vault exited)
}

export interface IAdapterAsset {
    name: string;               // Unique asset name (eg: USDT)
    address: string;            // Ethereum address of the asset contract (case insensitive)
    startBlockNumber: number;   // Number of the block at which this asset started

    /**
     * Return the price of the asset
     * @param blockNumber if specified returns the value at that block, otherwise return current value
     */
    GetPrice(blockNumber?: number): Promise<IAssetPrice>;

    /**
     * Return the factor by which to multiple the underlying asset to get this asset price
     * @param blockNumber if specified returns the value at that block, otherwise return current value
     */
    GetUnderlyingFactor(blockNumber?: number): Promise<BigNumber>;
}

export interface IAdapter {
    name: string;

    /**
     * Return all the assets for this adapter
     */
    GetAllAssets(): Promise<IAdapterAsset[]>;

    /**
     * Return this adapter history for specific Ethereum addresses
     * @param addresses Ethereum addresses
     */
    GetActivity(addresses: string[]): Promise<IAdapterHistory>;
}
