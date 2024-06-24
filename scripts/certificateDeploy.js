import hre from 'hardhat';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
async function main() {
  console.log('Deployment started!');
  const [depolyer] = await ethers.getSigners();
  const address = await depolyer.getAddress();
  console.log(`Deploying the contract with the account: ${address}`);
  const certificateContract = await hre.ethers.getContractFactory(
    'CertificateGeneration'
  );
  const contract = await certificateContract.deploy();
  await contract.deployed();
  console.log(
    `Certificate Generation Contract deployed to: ${contract.address}`
  );
  saveContractFiles(contract);
}
function saveContractFiles(contract) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  const contractDirectory = path.join(
    __dirname,
    '..',
    'frontend',
    'src',
    'contracts'
  );
  console.log(contractDirectory);
  if (!fs.existsSync(contractDirectory)) {
    fs.mkdirSync(contractDirectory);
  }
  fs.writeFileSync(
    path.join(contractDirectory, `certificate-address-${network.name}.json`),
    JSON.stringify({ CertificateGeneration: contract.address }, null, 2)
  );
  const CertificateArtifact = artifacts.readArtifactSync(
    'CertificateGeneration'
  );

  fs.writeFileSync(
    path.join(contractDirectory, 'CertificateGeneration.json'),
    JSON.stringify(CertificateArtifact, null, 2)
  );
}
main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
