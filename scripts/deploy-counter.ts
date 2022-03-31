import "@nomiclabs/hardhat-ethers";
import { Contract, ContractFactory } from "ethers";

import { ethers } from "hardhat";

async function deploy() {
  const contractFactory: ContractFactory = await ethers.getContractFactory("Counter");
  const contract: Contract = await contractFactory.deploy();
  await contract.deployed();
  
  console.log(contract.address);
  
  return contract;
}

async function count(contract: Contract) {
  await contract.count();
  console.log("Counter", await contract.getCount());
}

deploy().then(count);
