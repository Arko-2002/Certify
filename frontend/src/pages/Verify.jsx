import { useState } from 'react';

const Verify = ({ certificateContract, authorityContract }) => {
  const [certificateId, setCertificateId] = useState('');
  const [document, setDocument] = useState([]);
  function handleChange(e) {
    setCertificateId(() => e.target.value);
  }
  async function handleSubmit(e) {
    try {
      try {
        e.preventDefault();
        const ver = verifyCertificate(certificateId);
        const res = await ver;
        const test = [...res];
        const instituteInfo = await getInstituteInfo(res[8]);
        const [name, location] = instituteInfo;
        test.push(name);
        test.push(location);
        setDocument(() => test);
      } catch (error) {}
    } catch (error) {}
  }
  async function verifyCertificate(certificateId) {
    const res = await certificateContract.verifyCertificate(certificateId);
    return res;
  }
  async function getInstituteInfo(wallet) {
    try {
      const res = await authorityContract.getInstituteInfo(wallet);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="min-h-dvh p-4 flex flex-col gap-6 w-full max-w-[1500px]">
      <h1 className="text-4xl">Verify Documents.</h1>
      <form
        onSubmit={handleSubmit}
        className="tracking-wide flex flex-col gap-6"
      >
        <div>
          <label
            htmlFor="studentWallet"
            className="block mb-2 text-2xl text-white"
          >
            Please provide{' '}
            <span className="text-[#d2ff56]">Certificate ID </span>for
            verification
          </label>
          <input
            type="text"
            id="studentWallet"
            name="studentWallet"
            className=" outline-none  border border-s border-[#ffffff75]    text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500 focus:border-blue-500"
            placeholder="e.g. de4c69c5bc81fe629e546c621d83ab4cfe199dad67c0df4d5858fd52e49aa534"
            required
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-gradient-to-r from-[#215CFF] to-[#0631a7] hover:bg-blue-800 border border-s border-[#759aff] focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Verify Certificate
        </button>
      </form>
      {document.length ? (
        <div
          key={document[0]}
          className="bg-gray-700 bg-opacity-35 border border-s border-[#ffffff75] rounded-md p-4 flex flex-col gap-2"
        >
          <p>Certificate ID: {document[0]}</p>
          <p>Student Name: {document[2]}</p>
          <p>Univeristy Registration Number: {String(document[7])}</p>
          <p>Course Name: {document[3]}</p>
          <p>Specialization: {document[4]}</p>
          <p>Start Year: {String(document[5])}</p>
          <p>End Year: {String(document[6])}</p>
          <p>Issued by: {document[8]}</p>
          <p>Institute Name: {document[9]}</p>
          <p>Institute Location: {document[10]}</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default Verify;
