import "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hello World", () => {
  it("should say hi", async () => {
    const contractFactory = await ethers.getContractFactory("HelloWorld");
    const contract = await contractFactory.deploy();
    await contract.deployed();
    
    expect(await contract.sayHello()).to.equal("Hello, world!");
  });
})


