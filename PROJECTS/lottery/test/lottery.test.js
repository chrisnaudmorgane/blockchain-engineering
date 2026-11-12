const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lottery", () => {
    let lottery, manager, player1, player2;

    beforeEach(async () => {
        [manager, player1, player2] = await ethers.getSigners();
        const Lottery = await ethers.getContractFactory("Lottery");
        lottery = await Lottery.deploy();
        await lottery.waitForDeployment();
    });

    it("sets the deployer as manager", async () => {
        expect(await lottery.manager()).to.equal(manager.address);
    });

    it("starts with no players", async () => {
        expect(await lottery.getPlayersCount()).to.equal(0);
    });

    it("lets a player enter with 0.1 ETH", async () => {
        await lottery.connect(player1).enter({ value: ethers.parseEther("0.1") });
        expect(await lottery.getPlayersCount()).to.equal(1);
    });

    it("rejects less than 0.1 ETH", async () => {
        await expect(
            lottery.connect(player1).enter({ value: ethers.parseEther("0.05") })
        ).to.be.revertedWith("Not enough eth");
    });

    it("only the manager can pick a winner", async() => {
        await expect(lottery.connect(player1).pickWinner()).to.be.revertedWith("Only the manager can do this action");
    });

    it("pays the winner and resets players", async() => {
        await lottery.connect(player1).enter({ value: ethers.parseEther("0.1") });
        
        const balanceBefore = await ethers.provider.getBalance(player1.address)
        
        await lottery.connect(manager).pickWinner();

        const balanceAfter = await ethers.provider.getBalance(player1.address);

        expect(balanceAfter).to.be.equal(balanceBefore + ethers.parseEther("0.1"));
        
        expect(await lottery.getPlayersCount()).to.equal(0);
        
        expect(await ethers.provider.getBalance(await lottery.getAddress())).to.be.equal(0);
    });
});
