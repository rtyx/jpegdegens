import { ethers } from "ethers";

function getEth() {
  const eth = window["ethereum"];
  if (!eth) {
    throw new Error("No Ethereum browser extension detected");
  }
  return eth;
}

async function hasAccounts () {
  const eth = getEth();
  const accounts = await eth.request({ method: "eth_accounts" });
  return accounts.length > 0;
}

async function requestAccounts() {
  const eth = getEth();
  return await eth.request({method: "eth_accounts"});
}

async function run() {
  console.log("Running");
  if (!await hasAccounts() && !await requestAccounts()) {
    throw new Error("No accounts detected");
  }
  
  const contract = new ethers.Contract("0x5fbdb2315678afecb367f032d93f642f64180aa3", ["function sayHello() public pure returns (string memory)"], new ethers.providers.Web3Provider(getEth()));
  
  document.body.innerHTML = await contract.sayHello();
  
}

run();
