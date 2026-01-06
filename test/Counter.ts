import { expect } from "chai";
import hre from "hardhat";

const { ethers } = await hre.network.connect();

describe("Counter", function () {
  it("Test 1: incBy(5) debe aumentar el contador a 5", async function () {
    const counter = await ethers.deployContract("Counter");

    await counter.incBy(5n);

    expect(await counter.x()).to.equal(5n);
  });

  it("Test 2: incBy(0) debe fallar (revert)", async function () {
    const counter = await ethers.deployContract("Counter");

    await expect(counter.incBy(0n)).to.revert(ethers);

  });
});
