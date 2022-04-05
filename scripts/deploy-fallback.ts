import "@nomiclabs/hardhat-ethers";
import { Contract, ContractFactory } from "ethers";

import { ethers } from "hardhat";

async function deploy() {
  const contractFactory: ContractFactory = await ethers.getContractFactory("Fallback");
  const contract: Contract = await contractFactory.deploy();
  await contract.deployed();
  
  console.log(contract.address);
  
  return contract;
}

async function fallback(contract: Contract) {
  contract = await ethers.getContractAt("IFallback", contract.address);
  contract.count();
}

deploy().then(fallback);
