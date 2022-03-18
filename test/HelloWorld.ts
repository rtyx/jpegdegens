import "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hello World", () => {
  it("should say hi", async () => {
    const contractFactory = await ethers.getContractFactory("HelloWorld");
    const helloWorld = await contractFactory.deploy();
    await helloWorld.deployed();
    
    expect(await helloWorld.sayHello()).to.equal("Hello, world!");
  });
})


