// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hero {
    enum Class { Mage, Healer, Barbarian }

    mapping(address => uint[]) addressToHeroes;

    function generateRandom() public virtual view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp)));
    }

    function getHeroes() public view returns (uint[] memory) {
        return addressToHeroes[msg.sender];
    }

    function getStrength(uint hero) public pure returns (uint) {
        return (hero >> 2) & 0x1F;
    }

    function getHealth(uint hero) public pure returns (uint) {
        return (hero >> 7) & 0x1F;
    }


    function getDexterity(uint hero) public pure returns (uint) {
        return (hero >> 12) & 0x1F;
    }

    function getIntelligence(uint hero) public pure returns (uint) {
        return (hero >> 17) & 0x1F;
    }

    function getMagic(uint hero) public pure returns (uint) {
        return (hero >> 22) & 0x1F;
    }

    function getClass(uint hero) public pure returns (Class) {
        return Class(hero >> 32);
    }


    function createHero(Class class) public payable {
        require(msg.value >= 0.05 ether, "Please send more money");

        uint[] memory stats = new uint[](5);
        stats[0] = 2; // strength
        stats[1] = 7; // health
        stats[2] = 12; // dexterity
        stats[3] = 17; // intelligence
        stats[4] = 22; // magic

        uint length = stats.length;
        uint hero = uint(class);

        do {
            uint position = generateRandom() % length;
            uint value = generateRandom() % (13 + length) + 1;

            hero |= value << stats[position];

            length--;
            stats[position] = stats[length];
        } while (length > 0);

        addressToHeroes[msg.sender].push(hero);
    }
}
