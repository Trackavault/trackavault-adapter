import {Adapter} from "../adapter";
import {Asset} from "../adapter.asset";
import {IAdapterHistory, IAssetPosition, IAssetPositionCompleted} from "../adapter.interface";
import {ExampleAsset} from "./example-service.asset";

export class ExampleAdapter extends Adapter {
    constructor() {
        super("ExampleAdapter");
    }

    GetAllAssets(): Promise<Asset[]> {
        // Retrieve all the services assets from the blockchain or a graph
        return Promise.resolve([
            new ExampleAsset("USDC-MEGAPOOOL-1", "0x0000000000", "var1", false),
        ]);
    }


    GetActivity(addresses: string[]): Promise<IAdapterHistory> {
        return Promise.resolve({
            name: this.name,
            ongoing: [],
            completed: [],
        });
    }
}