import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Hero", function () {
  
  
  async function createHeroContract() {
    const contractFactory = await ethers.getContractFactory("TestHero");
    const contract = await contractFactory.deploy();
    await contract.deployed();
    
    return contract;
  }
  
  let heroContract;
  
  before(async function() {
    heroContract = await createHeroContract();
  })
  
  it("Should fail at creating hero cause of payment", async function() {
    let e;
    
    try {
      await heroContract.createHero(0, {
        value: ethers.utils.parseEther("0.049")
      });
    } catch (error) {
      e = error;
    }
    
    expect(e.message.includes("Please send more money")).to.equal(true);
  })
  
  it("should get a zero hero array", async function() {
    const heroes = await heroContract.getHeroes();
    expect(heroes).to.deep.equal([]);
  })
  
  it("Should succeed at creating hero", async function() {
    heroContract.setRandom(69);
    await heroContract.createHero(0, {
      value: ethers.utils.parseEther("0.05")
    });
    
    const heroes = await heroContract.getHeroes();
    
    expect(heroes).to.have.lengthOf(1);
    
    const newHero = heroes[0];
    
    // [S, H, D, I, M]
    // [S, H, D, I, M]
    // [S, H, D, I]
    // [S, I, D, H]
    // [S, I, D]
    // [D, I, S]
    // [D, I]
    // [D, I]
    
    expect(await heroContract.getMagic(newHero)).to.equal(16);
    expect(await heroContract.getHealth(newHero)).to.equal(2);
    expect(await heroContract.getStrength(newHero)).to.equal(6);
    expect(await heroContract.getIntelligence(newHero)).to.equal(10);
    expect(await heroContract.getDexterity(newHero)).to.equal(14);
  })
})
