import "@nomiclabs/hardhat-ethers";

import { ethers } from "hardhat";
import { expect } from "chai";

describe("TestGas", function() {
    it("should test gas", async function() {
        const contractFactory = await ethers.getContractFactory("TestGas");
        const contract = await contractFactory.deploy();
        await contract.deployed();
        
        for (let i = 0; i < 10; i++) {
            await contract.test1();
            await contract.test2();
            await contract.test3();
            await contract.test4();
            await contract.test5();
        }
    });
});
