Super simple example to reproduce https://github.com/ethereum/web3.js/issues/3389

This example uses:
- [Basic](https://github.com/ethereum/web3.js/blob/b7cdb9a7ac4d19bf583790dc7999f396686e5d12/test/sources/Basic.json) smart contract from `web3.js/test/sources/Basic.json`
- `genache-cli` 
- web3js subscription for `BasicEvent` events


We are going to use 3 terminals:
1. terminal for starting blockchain command line version of Ganache -> `genache-cli`. Here we emit 3 `BasicEvent`s and create subscription `fromBlock: 0`
2. terminal for listener on `BasicEvents`s as subscription `fromBlock: 0`
3. terminal for sending new `BasicEvent`

### terminal 1 
open terminal #1 and start `ganache-cli` which is listening on port `7545`
```
npm run server
```

### terminal 2 
open terminal #2 and start listener
```
npm run listen
```


### terminal 3
open terminal #3 and fire a new BasicEvent

```
npm run send
```


## Below is output of this simple app.
The problem
![01](https://user-images.githubusercontent.com/5232606/75345779-4f2de280-5895-11ea-81c4-ee594d507f86.png)

sending new events
![02](https://user-images.githubusercontent.com/5232606/75345788-51903c80-5895-11ea-9bf5-1b690cf061e6.png)


When I uncomment getPastEvents in `listen.js`
![03](https://user-images.githubusercontent.com/5232606/75345793-53f29680-5895-11ea-9e85-01f768c7b616.png)
 it works correctly.
![04](https://user-images.githubusercontent.com/5232606/75345796-55bc5a00-5895-11ea-9c39-5aaf7db6b23d.png)


