import hre from 'hardhat';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
async function main() {
  console.log('Deployment started!');
  const [depolyer] = await ethers.getSigners();
  const address = await depolyer.getAddress();
  console.log(`Deploying the contract with the account: ${address}`);
  const instituteContract = await hre.ethers.getContractFactory(
    'CertificateAuthority'
  );
  const contract = await instituteContract.deploy();
  await contract.deployed();
  console.log(`CertificateAuthority Contract deployed to: ${contract.address}`);
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
    path.join(contractDirectory, `authority-address-${network.name}.json`),
    JSON.stringify({ CertificateAuthority: contract.address }, null, 2)
  );
  const CertificateAuthorityArtifact = artifacts.readArtifactSync(
    'CertificateAuthority'
  );

  fs.writeFileSync(
    path.join(contractDirectory, 'CertificateAuthority.json'),
    JSON.stringify(CertificateAuthorityArtifact, null, 2)
  );
}
main().catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
