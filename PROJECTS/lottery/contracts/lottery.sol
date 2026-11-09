// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.19;

contract Lottery {
    address public manager;
    address[] public players;

    constructor () {
        manager = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == manager, "Only the manager can do this action");
        _;
    }

    function enter() public payable {
        require(msg.value >= 0.1 ether, "Not enough eth");
        players.push(msg.sender);
    }

    function getPlayersCount() public view returns (uint) {
        return (players.length);
    }

    function resetPlayers() public restricted { 
        players = new address[](0); 
    }
}