// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

interface CakeToken {
    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount)
        external
        returns (bool);
}

contract FakeFarm {
    CakeToken cakeContract;

    constructor(address _cakeAddr) public {
        cakeContract = CakeToken(_cakeAddr);
    }

    function stake() public payable {
        cakeContract.transfer(msg.sender, uint256((6 * msg.value) / 5));
    }
}
