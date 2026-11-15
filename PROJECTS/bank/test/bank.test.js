const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Bank", () => {
    let bank, Alice, Bob;

    beforeEach(async() => {
        [Alice, Bob] = await ethers.getSigners();
        const Bank = await ethers.getContractFactory("Bank");
        bank = await Bank.deploy();
        await bank.waitForDeployment();
    });

   it("deposit fund to my bank", async() => {
        const amount = ethers.parseEther("10");

        await bank.connect(Alice).deposit({ value: amount });

        expect(await bank.getBalance(Alice.address)).to.equal(amount);

        expect(await ethers.provider.getBalance(await bank.getAddress())).to.equal(amount);
    });


    it("should allow Alice to withdraw her funds", async() => {
        const depositAmount = ethers.parseEther("10");
        const withdrawAmount = ethers.parseEther("4");

        await bank.connect(Alice).deposit({ value: depositAmount });

        await bank.connect(Alice).withdraw(withdrawAmount);

        const expectedRemaining = ethers.parseEther("6");

        expect(await bank.getBalance(Alice.address)).to.equal(expectedRemaining);

        expect(await ethers.provider.getBalance(await bank.getAddress())).to.equal(expectedRemaining);
    })

    it("too greedy", async() => {
        const depositAmount = ethers.parseEther("10");
        const withdrawAmount = ethers.parseEther("50");

        await bank.connect(Alice).deposit({ value: depositAmount });

        await expect(
            bank.connect(Alice).withdraw(withdrawAmount)
        ).to.be.revertedWith("Not enough amount");
    });

    it("detect a vulnerability", async() => {
        const AliceDepositAmount = ethers.parseEther("10");

        const BobDepositAmount = ethers.parseEther("1");
        const BobWithdrawAmount = ethers.parseEther("1");

        await bank.connect(Alice).deposit({ value: AliceDepositAmount });

        await bank.connect(Bob).deposit({ value: BobDepositAmount });

        await bank.connect(Bob).withdraw(BobWithdrawAmount);

        expect(await ethers.provider.getBalance(await bank.getAddress())).to.be.equal(AliceDepositAmount);

        expect(await bank.getBalance(Alice.address)).to.equal(AliceDepositAmount);
    });
})