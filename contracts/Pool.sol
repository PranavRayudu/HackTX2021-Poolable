pragma solidity >=0.4.22 <0.8.0;

interface PancakeRouter {
    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);
}

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

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);
}

interface FakeFarm {
    function stake() external returns (uint256);
}

contract Pool {
    uint256 totalAmt;
    address counterAddr;
    address WBNBAddr;
    address cakeAddr;
    PancakeRouter swapper;
    CakeToken cakeContract;
    FakeFarm fakeFarm;
    uint256 baseYield;

    address public owner;

    mapping(address => uint256) public stakingAmts;
    uint256 numPpl;
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        // Underscore is a special character only used inside
        // a function modifier and it tells Solidity to
        // execute the rest of the code.
        _;
    }

    constructor(
        address _routerAddr,
        address _cakeTokenAddr,
        address _fakeFarmAddr
    ) public {
        owner = msg.sender;
        swapper = PancakeRouter(_routerAddr);
        // cakeContract = CakeToken(0xf9f93cf501bfadb6494589cb4b4c15de49e85d0e);
        cakeContract = CakeToken(_cakeTokenAddr);
        fakeFarm = FakeFarm(_fakeFarmAddr);
        WBNBAddr = 0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd;
        cakeAddr = 0xF9f93cF501BFaDB6494589Cb4b4C15dE49E85D0e;
        numPpl = 0;
        baseYield = 5;
    }

    function setSwapper(address _contract) public {
        swapper = PancakeRouter(_contract);
    }

    function deposit() public payable {
        address[] memory path = new address[](2);
        path[0] = WBNBAddr;
        path[1] = cakeAddr;
        uint256[] memory amts = swapper.swapExactETHForTokens{value: msg.value}(
            msg.value,
            path,
            address(this),
            1667183841
        );

        //increase user's amt by x cake units

        // if(stakingAmts[msg.sender] == null){

        // } else{

        stakingAmts[msg.sender] += amts[0];
        // }
        totalAmt += amts[0];
        // cakeContract.transfer(recipient, amount);
    }

    function lottery() public onlyOwner {
        fakeFarm.stake();

        uint256 newTotal = cakeContract.balanceOf(address(this));
        // for(uint256 i = 0; i<stakingAmts.)
    }

    function withdraw() public {
        // do lottery, pick wallets of participants proportional to deposit
    }

    function test() public pure returns (string memory) {
        return "poo";
    }
}
