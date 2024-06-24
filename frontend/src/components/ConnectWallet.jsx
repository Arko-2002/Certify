const ConnectWallet = ({ connectWallet }) => {
  return (
    <div>
      Connect Wallet
      <br />
      <button
        onClick={() => {
          connectWallet();
        }}
      >
        Connect to wallet
      </button>
    </div>
  );
};
export default ConnectWallet;
