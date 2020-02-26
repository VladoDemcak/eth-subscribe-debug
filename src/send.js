const Web3 = require('web3');
const BasicEvent = require("./Basic.json");
const web3 = new Web3("http://127.0.0.1:7545"); // we dont need ws so we will use standard http provider

const addresses = require("./addresses.json");

const run = async () => {

  const contract = new web3.eth.Contract(BasicEvent.abi, addresses.contract, { from: addresses.from });

  // fire new event
  const receipt = await contract.methods.firesEvent(addresses.from, 1).send();

  console.log(receipt)
  console.log("BasicEvent has been sent!")
}

run()