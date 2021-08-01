import {IAdapter, IAdapterHistory} from "./adapter.interface";
import {Asset} from "./adapter.asset";

export abstract class Adapter implements IAdapter {
    public readonly name: string;

    protected constructor(name: string) {
        this.name = name;
    }

    public abstract GetAllAssets(): Promise<Asset[]>;
    public abstract GetActivity(addresses: string[]): Promise<IAdapterHistory>;
}