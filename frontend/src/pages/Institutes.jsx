import { useEffect, useState } from 'react';
import ADMIN_ADDRESS from '../utils/adminWhitelist';
import SingleInstitute from '../components/SingleInstitute';

const Institutes = ({ selectedAddress, contract }) => {
  const [institueDetails, setInstituteDetails] = useState({
    name: '',
    location: '',
    walletAddress: '',
    logo: 'https://static.thenounproject.com/png/990460-200.png',
  });
  const [loading, setLoading] = useState(false);
  const [totalInstitues, setTotalInstitutes] = useState(0);
  const [institutesData, setInstitutesData] = useState([]);
  async function getAllInstitutes() {
    try {
      const institutes = await contract.getAllInstitutesForGovernment();
      console.log(institutes);
      const [walletAddress, name, location] = institutes;

      setTotalInstitutes(() => institutes[0].length);
      let temp = [];
      for (let i = 0; i < institutes[0].length; i++) {
        const obj = {};
        obj['walletAddress'] = walletAddress[i];
        obj['name'] = name[i];
        obj['location'] = location[i];
        temp.push(obj);
      }
      setInstitutesData(() => temp);
    } catch (e) {}
  }

  console.log(institutesData);

  useEffect(() => {
    if (contract) {
      // getSingleInstitue('0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');

      getAllInstitutes();
      // console.log(contract);
      // verifyInstitute('0x70997970C51812dc3A010C7d01b50e0d17dc79C8').then(
      //   (ans) => {
      //     console.log(ans);
      //   }
      // );
    }
  }, [contract]);
  // console.log(contract);
  function handleChange(e) {
    setInstituteDetails((p) => {
      return {
        ...p,
        [e.target.name]: e.target.value,
      };
    });
  }
  async function handleSubmit(e) {
    try {
      setLoading(() => true);
      e.preventDefault();
      const { walletAddress, name, location, logo } = institueDetails;
      await contract.createInstitute(
        walletAddress,
        name,
        location,
        walletAddress,
        logo
      );
      window.location.reload();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(() => false);
    }
  }

  if (String(selectedAddress) !== ADMIN_ADDRESS) {
    return (
      <div className="min-h-dvh text-4xl">
        <h1>Ooops... you are not the govt.</h1>
      </div>
    );
  }
  return (
    <>
      <div className="min-h-dvh p-4 flex flex-col gap-6">
        <p className="opacity-35">
          Government Wallet {'->'} {selectedAddress}
        </p>
        <h1 className="text-3xl">
          Total Institutes {'->'} {totalInstitues}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="tracking-wide flex flex-col gap-6"
        >
          <h1 className="text-3xl">Create Institutes</h1>
          <div>
            <label
              htmlFor="walletAddress"
              className="block mb-2 text-sm text-white"
            >
              Institute Wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              name="walletAddress"
              className=" outline-none  border border-s border-[#ffffff75]    text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 0xea034b47f51d8471e8cbe7f3e41f1fe476475388"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="name" className="block mb-2 text-sm text-white">
              Institute Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className=" outline-none  border border-s border-[#ffffff75]    text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Techno India University"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="location" className="block mb-2 text-sm text-white">
              Institute Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className=" outline-none  border border-s border-[#ffffff75]  text-sm rounded-lg  block w-full p-2.5 bg-gray-700  placeholder-gray-400 text-white ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Kolkata"
              required
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-gradient-to-r from-[#215CFF] to-[#0631a7] hover:bg-blue-800 border border-s border-[#759aff] focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Institute
          </button>
        </form>
        {loading && (
          <div className="lds-ring self-center">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {totalInstitues &&
          institutesData.map((institute) => {
            return (
              <SingleInstitute
                name={institute.name}
                walletAddress={institute.walletAddress}
                location={institute.location}
                key={institute.walletAddress}
              />
            );
          })}
        {/* <form onSubmit={handleSubmit}>
        <label htmlFor="institute_wallet">Institute Wallet Address</label>

        <input
          type="text"
          id="institute_wallet"
          name="walletAddress"
          className="outline outline-red-200"
          required
          onChange={handleChange}
        />
        <label htmlFor="institute_name">Institute Name</label>
        <input
          type="text"
          id="institute_name"
          className="outline outline-red-200"
          name="name"
          required
          onChange={handleChange}
        />
        <label htmlFor="institute_location">Institute Location</label>
        <input
          type="text"
          id="institute_location"
          className="outline outline-red-200"
          name="location"
          required
          onChange={handleChange}
        />
        <button type="submit">submit</button>
      </form> */}
      </div>
    </>
  );
};
export default Institutes;
