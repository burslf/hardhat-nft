const hre = require("hardhat");
const { abi } = require('../artifacts/contracts/HHNFT_flat.sol/HHNFT.json')
require('dotenv').config()

async function main() {
  const provider = hre.ethers.getDefaultProvider("https://speedy-nodes-nyc.moralis.io/fb1841515bcc2b1e0aed0509/eth/rinkeby")
  const signer = new hre.ethers.Wallet(process.env["PRIVATE_KEY"], provider)
  console.log(signer)
  const HHNFT = new hre.ethers.Contract("0xEBb9aB99dAa8Fd90b00BCeF0E95275e86dB8b499", abi, signer);
  // // const hhnft = await HHNFT.deploy();

  // // await hhnft.deployed();

  console.log("hhnft deployed to:", HHNFT.address);
  const owner = await HHNFT.signer.getAddress()
  console.log("DEPLOYED OWNER: ", owner)

  console.log("CONTRACT NAME", await HHNFT.name())

  await HHNFT.safeMint(owner, "ipfs://Qme69ynPw1HdJcJ5UVND6EWdxCcyBS7Y9hjPvhGD74JcUm/1")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
