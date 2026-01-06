import { expect } from "chai";

import hre from "hardhat";
const { ethers, networkHelpers } = await hre.network.connect();

describe("Counter", function () {
  it("Should emit the Increment event when calling the inc() function", async function () {
    const counter = await ethers.deployContract("Counter");

    await expect(counter.inc()).to.emit(counter, "Increment").withArgs(1n);
  });

  it("Should allow the owner to increment and revert for non-owners", async function () {
    const counter = await ethers.deployContract("Counter");
    const nonOwnerAddress = "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

    // Impersonate the non-owner account
    await networkHelpers.impersonateAccount(nonOwnerAddress);

    // Fund the non-owner account with some ETH to pay for gas
    await networkHelpers.setBalance(nonOwnerAddress, ethers.parseEther("1.0"));

    // Get a signer for the non-owner account
    const nonOwnerSigner = await ethers.getSigner(nonOwnerAddress);

    // Call inc() as the owner - should succeed
    await expect(counter.inc()).to.emit(counter, "Increment").withArgs(1n);

    // Call inc() as a non-owner - should revert
    await expect(counter.connect(nonOwnerSigner).inc()).to.be.revertedWith(
      "only the owner can increment the counter",
    );
  });
});



