import { expect } from "chai";
import hardhat from "hardhat";

const { ethers } = hardhat;

describe("GameManager", function () {
  let token, gameManager;
  let owner, operator, player;

  const GAME_ID = 1;
  const MAX_REWARD = ethers.parseEther("500");
  const REWARD = ethers.parseEther("100");

  beforeEach(async () => {
    [owner, operator, player] = await ethers.getSigners();

    const GamingToken = await ethers.getContractFactory("GamingToken");
    token = await GamingToken.deploy(owner.address);
    await token.waitForDeployment();

    const GameManager = await ethers.getContractFactory("GameManager");
    gameManager = await GameManager.deploy(
      await token.getAddress(),
      owner.address
    );
    await gameManager.waitForDeployment();

    await token.addGameContract(await gameManager.getAddress());
    await gameManager.setMaxRewardPerGame(GAME_ID, MAX_REWARD);
  });

  it("should allow owner to add game operator", async () => {
    await gameManager.addGameOperator(operator.address);
    expect(await gameManager.gameOperators(operator.address)).to.equal(true);
  });

  it("should NOT allow non-operator to reward", async () => {
    await expect(
      gameManager.rewardPlayer(player.address, GAME_ID, REWARD)
    ).to.be.revertedWith("Caller not game operator");
  });

  it("should reward player with PGT", async () => {
    await gameManager.addGameOperator(operator.address);

    await gameManager
      .connect(operator)
      .rewardPlayer(player.address, GAME_ID, REWARD);

    expect(await token.balanceOf(player.address)).to.equal(REWARD);
  });

  it("should NOT allow reward above limit", async () => {
    await gameManager.addGameOperator(operator.address);

    await expect(
      gameManager
        .connect(operator)
        .rewardPlayer(player.address, GAME_ID, ethers.parseEther("1000"))
    ).to.be.revertedWith("Reward exceeds limit");
  });
});
