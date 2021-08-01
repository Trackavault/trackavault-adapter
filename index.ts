import {ExampleAdapter} from "./example/example-service.adapater";

const UserAddress = "0xc0b09b78c00ebced69ed1b397f5fb6ad94938441";

const runTest = async function() {
    const MyExampleAdapter = new ExampleAdapter();
    const AllAssets = await MyExampleAdapter.GetAllAssets();

    console.log(`Found ${AllAssets.length} assets.`)
    for (const asset of AllAssets) {
        console.log(`Asset ${asset.name} at address ${asset.address}`);
    }

    const UserActivity = await MyExampleAdapter.GetActivity([UserAddress]);
    console.log(UserActivity);
}

runTest();