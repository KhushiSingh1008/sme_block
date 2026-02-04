import hre from "hardhat";

async function main() {
  console.log("Deploying SupplyChainSynthesizer to Polygon...");

  const SupplyChainSynthesizer = await hre.ethers.getContractFactory("SupplyChainSynthesizer");
  const contract = await SupplyChainSynthesizer.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("✅ SupplyChainSynthesizer deployed to:", address);
  console.log("\n📝 Add this to your .env files:");
  console.log("CONTRACT_ADDRESS=" + address);
  console.log("NEXT_PUBLIC_CONTRACT_ADDRESS=" + address);
  
  console.log("\n⏳ Waiting for block confirmations...");
  await contract.deploymentTransaction().wait(5);
  
  console.log("\n🔍 Verify on Polygonscan:");
  console.log("https://polygonscan.com/address/" + address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
