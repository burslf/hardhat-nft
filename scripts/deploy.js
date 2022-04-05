const hre = require("hardhat");

async function main() {
  const HHNFT = await hre.ethers.getContractFactory("contracts/HHNFT_flat.sol:HHNFT");
  const hhnft = await HHNFT.deploy();
  
  await hhnft.deployed();

  console.log("hhnft deployed to:", hhnft.address);
  console.log("DEPLOYED OWNER: ", await hhnft.signer.getAddress())

  console.log("CONTRACT NAME", await hhnft.name())
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
