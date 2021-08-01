# Trackavault adapter example

This repository can be cloned to integrate a new service to Trackavault.
The example folder represents a simple adapter and its associated assets.


To test, clone the repo and run:
```
npm install
npm run dev
```

## AssetsSingleton
The AssetsSingleton allow you to access every asset already tracked by Trackavault.
You can assume that most tokens tracked by providers like CoinGecko or CoinMarketCap are supported, as well as any assets from services already integrated in Trackavault.

## Use External sources
You can use external sources such as: 
- Web3 requests
- subgraph requests (apollo integration supported)
- Web requests (via Axios)

But please keep your requests at a minimum.
