import {Asset} from "../adapter.asset";
import {IAssetPrice} from "../adapter.interface";
import {AssetsSingleton} from "../assets";
import BigNumber from "bignumber.js";

export class ExampleAsset extends Asset {
    public readonly myVariable: string;
    public readonly anotherVariable: boolean;

    constructor(name: string, address: string, var1: string, var2: boolean) {
        super(name, address);
        this.myVariable = var1;
        this.anotherVariable = var2;
    }

    public async GetPrice(blockNumber?: number): Promise<IAssetPrice> {
        // Let's imagine this asset is a pool based on USDC
        const USDCAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
        const underlyingAsset = AssetsSingleton.asset(USDCAddress);

        // Retrieve the factor by which to multiply the underlying asset and the underlying asset price
        const [underlyingFactor, underlyingPrice] = await Promise.all([
            this.GetUnderlyingFactor(blockNumber),
            underlyingAsset.GetPrice(blockNumber),
        ]);
        const price = underlyingPrice.price.times(underlyingFactor);

        return {
            chain: underlyingPrice.chain.concat([{
                factor: underlyingFactor,
                name: underlyingAsset.name,
                price: underlyingPrice.price,
            }]),
            price,
        } as IAssetPrice;
    }

    public async GetUnderlyingFactor(blockNumber?: number): Promise<BigNumber> {
        // Retrieve the underlying factor here
        return new BigNumber("1.0");
    }
}