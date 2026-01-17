import { expect } from "chai";
import hardhat from "hardhat";

const { ethers } = hardhat;


describe("GamingToken (PGT)", function () {
  let token;
  let owner, gameManager, user;

  const ONE_BILLION = ethers.parseEther("1000000000");
  const TEN_BILLION = ethers.parseEther("10000000000");

  beforeEach(async () => {
    [owner, gameManager, user] = await ethers.getSigners();

    const GamingToken = await ethers.getContractFactory("GamingToken");
    token = await GamingToken.deploy(owner.address);
    await token.waitForDeployment();
  });

  it("should mint initial supply to owner", async () => {
    expect(await token.totalSupply()).to.equal(ONE_BILLION);
    expect(await token.balanceOf(owner.address)).to.equal(ONE_BILLION);
  });

  it("should allow owner to add game contract", async () => {
    await token.addGameContract(gameManager.address);
    expect(await token.gameContracts(gameManager.address)).to.equal(true);
  });

  it("should NOT allow unauthorized mint", async () => {
    await expect(
      token.mint(user.address, ethers.parseEther("10"))
    ).to.be.revertedWith("Not authorized game contract");
  });

  it("should mint tokens via authorized game contract", async () => {
    await token.addGameContract(gameManager.address);

    await token
      .connect(gameManager)
      .mint(user.address, ethers.parseEther("100"));

    expect(await token.balanceOf(user.address)).to.equal(
      ethers.parseEther("100")
    );
  });

  it("should NOT exceed max supply", async () => {
    await token.addGameContract(gameManager.address);

    const excess = TEN_BILLION - ONE_BILLION + 1n;

    await expect(
      token.connect(gameManager).mint(user.address, excess)
    ).to.be.revertedWith("Max supply exceeded");
  });
});
