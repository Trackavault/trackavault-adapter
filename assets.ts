import {Asset} from "./adapter.asset";
import {IAssetPrice, IAssetPriceChainItem} from "./adapter.interface";
import BigNumber from "bignumber.js";

export interface IAssets {
    /**
     * Return an asset if it exists
     * @param address the ethereum address of the asset
     */
    asset(address: string): Asset;

    /**
     * Return whether an asset exists
     * @param address the ethereum address of the asset
     */
    has(address: string): boolean;
}

class MockAsset extends Asset {
    constructor(name: string, address: string) {
        super(name, address);
    }

    GetPrice(blockNumber?: number): Promise<IAssetPrice> {
        return Promise.resolve({
            price: new BigNumber("1.0"),
            chain: [],
        });
    }

    GetUnderlyingFactor(blockNumber?: number): Promise<BigNumber> {
        return Promise.resolve(new BigNumber("1.0"));
    }

}

class MockAssets implements IAssets {
    private readonly assets: { [key: string]: Asset };

    constructor() {
        // Here add the asset you need to test with
        // Example USDC
        this.assets = {};
        this.assets['0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'.toLowerCase()] = new MockAsset("USDC", "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");
    }

    asset(address: string): Asset {
        return this.assets[address.toLowerCase()];
    }

    has(address: string): boolean {
        return this.assets.hasOwnProperty(address.toLowerCase());
    }
}

export const AssetsSingleton = new MockAssets();
