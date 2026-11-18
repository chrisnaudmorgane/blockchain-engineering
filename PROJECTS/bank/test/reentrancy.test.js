require("@nomicfoundation/hardhat-chai-matchers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VulnerableBank", () => {
    let attackReal, Alice, Bob, bank, realBank, attackVulnerable;

    beforeEach(async() => {
        [Alice, Bob] = await ethers.getSigners();

        const Bank = await ethers.getContractFactory("VulnerableBank");

        bank = await Bank.deploy();

        await bank.waitForDeployment();
        
        await bank.connect(Alice).deposit({ value: ethers.parseEther("3")});

        const RealBank = await ethers.getContractFactory("Bank");
        
        realBank = await RealBank.deploy();

        await realBank.waitForDeployment();

        await realBank.connect(Alice).deposit({ value: ethers.parseEther("3")});

        const Attack = await ethers.getContractFactory("Attack", Bob);

        attackReal = await Attack.deploy(realBank.getAddress());

        await attackReal.waitForDeployment();

        const Attack_1 = await ethers.getContractFactory("Attack", Bob);

        attackVulnerable = await Attack_1.deploy(bank.getAddress());

        await attackVulnerable.waitForDeployment();
    });

    it("drains VulnerableBank", async() => {

        await attackVulnerable.connect(Bob).attack({ value: ethers.parseEther("3") });

        expect(await ethers.formatEther(await ethers.provider.getBalance(bank.getAddress()))).to.be.equal("0.0");

        expect(await ethers.formatEther(await ethers.provider.getBalance(attackVulnerable.getAddress()))).to.be.equal("6.0");

        await expect(bank.connect(Alice).withdraw(ethers.parseEther("3"))).to.be.revertedWith("Transfer failed");
    });

    it("cannot drain Bank", async() => {

        await expect(attackReal.connect(Bob).attack({ value: ethers.parseEther("3") })).to.be.revertedWith("Transfer failed");

        expect(await ethers.formatEther(await ethers.provider.getBalance(realBank.getAddress()))).to.be.equal("3.0");
    });

})
