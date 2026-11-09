// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

contract Lottery {
    address public manager;
    address[] public players;

    constructor () {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.1 ether, "Not enough eth");
        players.push(msg.sender);
    }
}