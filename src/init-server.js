const Web3 = require('web3');
const fs = require('fs');
const Basic = require("./Basic.json");

const web3 = new Web3("ws://127.0.0.1:7545");

// run ganache server
const ganache = require("ganache-cli");
const server = ganache.server();
server.listen(7545);

// app
const run = async () => {
  const accounts = await web3.eth.getAccounts();

  const basicOptions = {
    data: Basic.bytecode,
    gasPrice: '1',
    gas: 4000000
  };

  // deploy contract with web3
  const basic = await new web3.eth.Contract(Basic.abi, basicOptions)
  const contract = await basic
    .deploy()
    .send({
      from: accounts[0],
      gas: 1500000,
      gasPrice: 0
    });

  // fire 3 events
  // Fire 1st event
  await contract.methods.firesEvent(accounts[0], 1).send({ from: accounts[0] });

  // Fire 2nd event
  await contract.methods.firesEvent(accounts[0], 1).send({ from: accounts[0] });

  // Fire 3rd event
  await contract.methods.firesEvent(accounts[0], 1).send({ from: accounts[0] });

  // listener
  let eventNum = 0;
  contract.events.BasicEvent({ fromBlock: 0 })
    .on('data', (event) => {
      console.log("event #" + eventNum + ", blockNumber: " + event.blockNumber + ", transactionHash: " + event.transactionHash);
      eventNum++;
    });


  // addresses, needed for second listener
  // we will use file to store and read the addresses in second listener or sender
  const addresses = {
    "contract": contract.options.address,
    "from": accounts[0],
    "to": accounts[1]
  };
  fs.writeFileSync('./src/addresses.json', JSON.stringify(addresses), 'utf-8');
}

run()
  .then(() => {
    console.log("listening...")
  });