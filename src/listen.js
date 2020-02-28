const Web3 = require('web3');
const BasicEvent = require("./Basic.json");
const web3 = new Web3("ws://127.0.0.1:7545");

const addresses = require("./addresses.json");

const run = async () => {

  const contract = new web3.eth.Contract(BasicEvent.abi, addresses.contract, { from: addresses.from });

  // uncomment to fix -> one way how subscription for BasicEvent is fixed 
  // await contract.getPastEvents({
  //   fromBlock: 0,
  //   toBlock: 'latest'
  // });

  // uncomment to fix -> another way how to fix subscription for BasicEvent
  // await contract.methods.firesEvent(addresses.from, 1).send({ from: addresses.from });

  // uncomment to fix -> another way how to fix subscription for BasicEvent 
  // await web3.eth.getGasPrice(); // or getAccounts or getBlockNumber

  // listener irself
  let eventNum = 0;
  contract.events.BasicEvent({ fromBlock: 0 })
    .on('data', (event) => {
      console.log("event #" + eventNum + ", blockNumber: " + event.blockNumber + ", transactionHash: " + event.transactionHash);
      eventNum++;
    });
}

run()
  .then(() => {
    console.log("listening...")
  });