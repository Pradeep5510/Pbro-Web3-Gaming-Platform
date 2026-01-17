// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./GamingToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


contract GameManager is Ownable, ReentrancyGuard {
    /// @notice PGT token contract
    GamingToken public immutable pgtToken;

    /// @notice Authorized backend / game operators
    mapping(address => bool) public gameOperators;

    /// @notice Max reward allowed per gameId
    mapping(uint256 => uint256) public maxRewardPerGame;

    /// @notice Events
    event GameOperatorAdded(address indexed operator);
    event GameOperatorRemoved(address indexed operator);
    event PlayerRewarded(
        address indexed player,
        uint256 indexed gameId,
        uint256 amount
    );

    constructor(address tokenAddress, address initialOwner)
        Ownable(initialOwner)
    {
        require(tokenAddress != address(0), "Invalid token address");
        pgtToken = GamingToken(tokenAddress);
    }

    // ------------------------
    // Modifiers
    // ------------------------

    modifier onlyOperator() {
        require(gameOperators[msg.sender], "Caller not game operator");
        _;
    }

    // ------------------------
    // Admin Functions
    // ------------------------

    /// @notice Add backend or game operator
    function addGameOperator(address operator) external onlyOwner {
        require(operator != address(0), "Invalid operator");
        gameOperators[operator] = true;
        emit GameOperatorAdded(operator);
    }

    /// @notice Remove backend or game operator
    function removeGameOperator(address operator) external onlyOwner {
        gameOperators[operator] = false;
        emit GameOperatorRemoved(operator);
    }

    /// @notice Configure reward limits per game
    function setMaxRewardPerGame(
        uint256 gameId,
        uint256 maxReward
    ) external onlyOwner {
        require(maxReward > 0, "Invalid max reward");
        maxRewardPerGame[gameId] = maxReward;
    }

    // ------------------------
    // Reward Logic
    // ------------------------

    /**
     * @notice Reward a player with PGT after a valid game
     * @param player Player wallet address
     * @param gameId Game identifier
     * @param amount Amount of PGT (18 decimals)
     */
    function rewardPlayer(
        address player,
        uint256 gameId,
        uint256 amount
    ) external onlyOperator nonReentrant {
        require(player != address(0), "Invalid player");
        require(amount > 0, "Invalid amount");

        uint256 maxReward = maxRewardPerGame[gameId];
        require(maxReward > 0, "Game not configured");
        require(amount <= maxReward, "Reward exceeds limit");

        // Mint PGT directly to player
        pgtToken.mint(player, amount);

        emit PlayerRewarded(player, gameId, amount);
    }
}
