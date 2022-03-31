import { ethers } from "ethers";
import Counter from  "../artifacts/contracts/Counter.sol/Counter.json";

function getEth() {
  const eth = window["ethereum"];
  if (!eth) {
    throw new Error("No Ethereum browser extension detected");
  }
  window["ethereum"].enable();
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
  
  const provider = new ethers.providers.Web3Provider(getEth()).getSigner();
  
  const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, Counter.abi, provider);
  
  const el = document.createElement("div");
  
  async function setCounter(count?) {
    el.innerHTML = count || await contract.getCount();
  }
  
  setCounter();
  
  const button = document.createElement("button");
  
  button.innerHTML = "Increment";
  
  button.addEventListener("click", async () => {
    await contract.count();
  });
  
  contract.on(contract.filters.CounterInc(), function(count) {
    setCounter(count);
  });
  
  document.body.appendChild(el);
  document.body.appendChild(button);
}

run();
