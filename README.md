Super simple example to reproduce https://github.com/ethereum/web3.js/issues/3389

This example uses:
- [Basic](https://github.com/ethereum/web3.js/blob/b7cdb9a7ac4d19bf583790dc7999f396686e5d12/test/sources/Basic.json) smart contract from `web3.js/test/sources/Basic.json`
- `genache-cli` 
- web3js subscription for event


We are going to use 3 consoles:
1. console for starting blockchain command line version of Ganache -> `genache-cli`. Here we emit 3 `BasicEvent`s and create subscription `fromBlock: 0`
2. console for listener on `BasicEvents`s as subscription `fromBlock: 0`
3. console for sending new `BasicEvent`

### console #1 
open console #1 and start `ganache-cli` which is listening on port `7545`
```
npm run server
```

### console #2 
open console #2 and start listener
```
npm run listen
```


### console #3
open console #3 and fire a new BasicEvent
```
npm run send
```


