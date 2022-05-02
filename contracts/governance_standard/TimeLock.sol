// we want to wait for a  new vote to be 'executed'

// everyone who holds the governance token has to pay 5 tokens

// give time to user to "get out" if they don't like a governance update

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract TimeLock is TimelockController {
  // minDelay: How long you have to wait before executing
  // proposer is the list of addresses that can propose
  // executors: Who can execute when a proposal passes
  constructor(
    uint256 minDelay,
    address[] memory proposers,
    address[] memory executors
  ) TimelockController(minDelay, proposers, executors) {}
}
