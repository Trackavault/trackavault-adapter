import {IAdapterAsset, IAssetPrice} from "./adapter.interface";
import BigNumber from "bignumber.js";

export abstract class Asset implements IAdapterAsset {
    public name: string;
    public address: string;
    public startBlockNumber: number = 0;

    /**
     * @param name Name of the asset
     * @param address Ethereum address of the asset contract (case insensitive)
     */
    protected constructor(name: string, address: string) {
        this.name = name;
        this.address = address;
    }

    public abstract GetPrice(blockNumber?: number): Promise<IAssetPrice>;
    public abstract GetUnderlyingFactor(blockNumber?: number): Promise<BigNumber>;
}