// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GamingToken is ERC20, Ownable {
    /// @notice Max supply = 10 billion tokens
    uint256 public constant MAX_SUPPLY = 10_000_000_000 * 10**18;

    /// @notice Mapping of authorized game contracts
    mapping(address => bool) public gameContracts;

    /// @notice Events
    event GameContractAdded(address indexed gameContract);
    event GameContractRemoved(address indexed gameContract);
    event TokensMinted(address indexed to, uint256 amount);

    constructor(address initialOwner) ERC20("Pbro Gaming Token", "PGT") Ownable(initialOwner) {
        /// @notice Initial supply = 1 billion tokens
        uint256 initialSupply = 1_000_000_000 * 10**18;
        _mint(initialOwner, initialSupply);
    }

    /// @notice Modifier to allow only authorized game contracts
    modifier onlyGameContract() {
        require(gameContracts[msg.sender], "Not authorized game contract");
        _;
    }

    /// @notice Add a game contract (only owner)
    function addGameContract(address _gameContract) external onlyOwner {
        require(_gameContract != address(0), "Invalid address");
        gameContracts[_gameContract] = true;
        emit GameContractAdded(_gameContract);
    }

    /// @notice Remove a game contract (only owner)
    function removeGameContract(address _gameContract) external onlyOwner {
        gameContracts[_gameContract] = false;
        emit GameContractRemoved(_gameContract);
    }

    /// @notice Mint tokens to a player (only game contracts)
    function mint(address to, uint256 amount) external onlyGameContract {
        require(to != address(0), "Invalid recipient");
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");

        _mint(to, amount);
        emit TokensMinted(to, amount);
    }
}
