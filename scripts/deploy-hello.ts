import "@nomiclabs/hardhat-ethers";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

async function deploy() {
  const contractFactory: ContractFactory = await ethers.getContractFactory("HelloWorld");
  const contract: Contract = await contractFactory.deploy();
  await contract.deployed();
  
  return contract;
}

async function sayHello(contract: Contract) {
  console.log(`Say Hello: ${await contract.sayHello()}`);
}

deploy().then(sayHello);
