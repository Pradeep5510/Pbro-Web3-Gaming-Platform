import hardhat from "hardhat";

const { ethers } = hardhat;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("🚀 Deploying contracts with account:");
  console.log("   ", deployer.address);
  console.log("   Balance:", ethers.formatEther(
    await deployer.provider.getBalance(deployer.address)
  ));

  // --------------------------------------------------
  // 1. Deploy GamingToken (PGT)
  // --------------------------------------------------
  const GamingToken = await ethers.getContractFactory("GamingToken");
  const gamingToken = await GamingToken.deploy(deployer.address);
  await gamingToken.waitForDeployment();

  const tokenAddress = await gamingToken.getAddress();
  console.log("✅ Pbro Gaming Token (PGT) deployed at:", tokenAddress);

  // --------------------------------------------------
  // 2. Deploy GameManager
  // --------------------------------------------------
  const GameManager = await ethers.getContractFactory("GameManager");
  const gameManager = await GameManager.deploy(
    tokenAddress,
    deployer.address
  );
  await gameManager.waitForDeployment();

  const gameManagerAddress = await gameManager.getAddress();
  console.log("✅ GameManager deployed at:", gameManagerAddress);

  // --------------------------------------------------
  // 3. Wire GameManager → GamingToken
  // --------------------------------------------------
  const tx = await gamingToken.addGameContract(gameManagerAddress);
  await tx.wait();

  console.log("🔗 GameManager authorized to mint PGT");

  // --------------------------------------------------
  // 4. Optional: Configure initial game
  // --------------------------------------------------
  const GAME_ID = 1;
  const MAX_REWARD = ethers.parseEther("500");

  const configTx = await gameManager.setMaxRewardPerGame(
    GAME_ID,
    MAX_REWARD
  );
  await configTx.wait();

  console.log(
    `🎮 Game ${GAME_ID} configured with max reward ${ethers.formatEther(
      MAX_REWARD
    )} PGT`
  );

  console.log("\n🎉 Deployment completed successfully!");
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
