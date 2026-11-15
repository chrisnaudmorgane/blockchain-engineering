
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

contract Bank {
    mapping (address => uint256) soldes;

    function deposit() public payable {
        soldes[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(amount <= soldes[msg.sender], "Not enough amount");
        
        soldes[msg.sender] -= amount;

        (bool success, ) = payable(msg.sender).call{value: amount} ("");

        require(success, "Transfer failed");
    }

    function getBalance(address user) public view returns (uint256) {
        return soldes[user];
    }
}
