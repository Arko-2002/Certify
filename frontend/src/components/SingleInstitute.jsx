const SingleInstitute = ({ name, walletAddress, location }) => {
  return (
    <div className="border border-s border-[#ffffff75]  bg-gray-700 p-2 rounded-md ">
      <p>Name: {name}</p>
      <p>Location: {location}</p>
      <p>Wallet Address: {walletAddress}</p>
    </div>
  );
};

export default SingleInstitute;
