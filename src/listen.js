const Web3 = require('web3');
const BasicEvent = require("./Basic.json");


const wsProvider = new Web3.providers.WebsocketProvider("ws://127.0.0.1:7545", {
  reconnect: { auto: true, delay: 3000 },// 3sec delay
});

wsProvider.on('connect', () => {
  console.log(new Date().toUTCString() + '. ws connected.')
})

const web3 = new Web3(wsProvider);

const addresses = require("./addresses.json");

const run = async () => {

  const contract = new web3.eth.Contract(BasicEvent.abi, addresses.contract, { from: addresses.from });

  // listener itself
  let eventNum = 0;
  contract.events.BasicEvent({ fromBlock: 0 })
    .on('data', (event) => {
      console.log(new Date().toUTCString() + ". event #" + eventNum + ", blockNumber: " + event.blockNumber + ", transactionHash: " + event.transactionHash);
      eventNum++;
    });

  while (true) {
    await new Promise((resolve) => setTimeout(() => {
      web3.currentProvider.connection.close(4000);
      console.log(new Date().toUTCString() + '. closed ws. should reconnect in 3sec')
      resolve();
    }, 10000)); // 10 sec
  }
}

run()
  .then(() => {
    console.log("listening...")
  });