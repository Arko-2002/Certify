import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';

import Home from './pages/Home';
import Verify from './pages/Verify';
import Institutes from './pages/Institutes';
import Certificate from './pages/Certificate';

import WalletNotDetected from './components/WalletNotDetected';
import ConnectWallet from './components/ConnectWallet';

import authorityAddress from './contracts/authority-address-localhost.json';
import certificateAuthorityArtifact from './contracts/CertificateAuthority.json';

import certificateAddress from './contracts/certificate-address-localhost.json';
import certificateGenerationArtifact from './contracts/CertificateGeneration.json';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Vault from './pages/Vault';

function App() {
  const [selectedAddress, setSelectedAddress] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [certificateContract, setCertificateContract] = useState(undefined);
  const [isInstitute, setIsInstitute] = useState(false);

  //checks if the connecte wallet is Institute or not.
  useEffect(() => {
    if (contract) {
      verifyInstitute(selectedAddress).then((check) => {
        if (check) {
          setIsInstitute(() => true);
        } else {
          setIsInstitute(() => false);
        }
      });
    }
  }, [contract, selectedAddress]);

  async function verifyInstitute(wallet) {
    const isInstitute = await contract.verifyIsInstitute(wallet);

    return isInstitute;
  }
  const connectWallet = async () => {
    try {
      const [address] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      initDapp(address);
      window.ethereum.on('accountsChanged', ([newAddress]) => {
        if (!newAddress) {
          setSelectedAddress(() => undefined);
          return;
        }
        initDapp(newAddress);
      });
    } catch (error) {}
  };
  async function initDapp(address) {
    setSelectedAddress(() => address);

    const results = await Promise.allSettled([
      initContract(),
      initCertificateContract(),
    ]);

    results.forEach((result) => {
      if (result.status === 'rejected') {
        console.error('Promise rejected:', result.reason);
      }
    });
  }
  async function initContract() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      authorityAddress.CertificateAuthority,
      certificateAuthorityArtifact.abi,
      await provider.getSigner(0)
    );
    setContract(contract);
    return contract;
  }
  async function initCertificateContract() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(
      certificateAddress.CertificateGeneration,
      certificateGenerationArtifact.abi,
      await provider.getSigner(0)
    );
    setCertificateContract(contract);
    return contract;
  }
  if (!window.ethereum) {
    return <WalletNotDetected />;
  }
  if (!selectedAddress) {
    return <ConnectWallet connectWallet={connectWallet} />;
  }
  return (
    <div className="w-full h-dvh flex  flex-col  items-center gap-6">
      <Navbar selectedAddress={selectedAddress} />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/verify"
          element={
            <Verify
              certificateContract={certificateContract}
              authorityContract={contract}
            />
          }
        ></Route>

        <Route
          path="/institutes"
          element={
            <Institutes selectedAddress={selectedAddress} contract={contract} />
          }
        ></Route>
        <Route
          path="/certificate"
          element={
            <Certificate
              authorityContract={contract}
              certificateContract={certificateContract}
              isInstitute={isInstitute}
              selectedAddress={selectedAddress}
            />
          }
        ></Route>
        <Route
          path="/vault"
          element={
            <Vault
              isInstitute={isInstitute}
              selectedAddress={selectedAddress}
              certificateContract={certificateContract}
              authorityContract={contract}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
