import { useEffect, useState } from 'react';

export const Certificate = ({
  isInstitute,
  certificateContract,
  selectedAddress,
  authorityContract,
}) => {
  const [studentDetails, setStudentDetails] = useState({
    studentWallet: '',
    studentName: '',
    courseName: '',
    specialization: '',
    startDate: 0,
    endDate: 0,
    universityRegistrationNumber: 0,
  });
  const [instituteName, setInstituteName] = useState('');
  const [instituteLocation, setInstituteLocation] = useState('');

  const [loading, setLoading] = useState(false);

  async function getInstituteInfo(wallet) {
    try {
      const res = await authorityContract.getInstituteInfo(wallet);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (certificateContract) {
      // getAllCertificates('0x7b6AdC481987E6de2eEF26a10c7B82EB7E7704fb').then(
      //   (res) => {
      //     verifyCertificate(res[0]).then((res) => {
      //       console.log(res);
      //     });
      //   }
      // );
    }
  }, [certificateContract]);
  useEffect(() => {
    if (authorityContract) {
      getInstituteInfo(selectedAddress).then((res) => {
        const [name, location] = res;
        setInstituteName(() => name);
        setInstituteLocation(() => location);
      });
    }
  }, [authorityContract]);

  function handleChange(e) {
    setStudentDetails((p) => {
      return {
        ...p,
        [e.target.name]: e.target.value,
      };
    });
  }
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(() => true);
      const {
        studentWallet,
        studentName,
        courseName,
        specialization,
        startDate,
        endDate,
        universityRegistrationNumber,
      } = studentDetails;

      const res = await certificateContract.issueCertificate(
        studentWallet,
        studentName,
        courseName,
        specialization,
        startDate,
        endDate,
        universityRegistrationNumber
      );
      // console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(() => false);
    }
  }
  if (!isInstitute) {
    return (
      <div className="min-h-dvh text-4xl">
        <h1>Ooops... you are not an institute.</h1>
      </div>
    );
  }
  return (
    <div className="min-h-dvh p-4 flex flex-col gap-6">
      <p className="opacity-35 text-3xl">{instituteName}</p>
      <p className="opacity-35 text-3xl">{instituteLocation}</p>
      <p className="opacity-35">
        Institute Wallet {'->'} {selectedAddress}
      </p>
      <form
        onSubmit={handleSubmit}
        className="tracking-wide flex flex-col gap-6"
      >
        <h1 className="text-3xl">Issue Certificates</h1>
        <div>
          <label
            htmlFor="studentWallet"
            className="block mb-2 text-sm text-white"
          >
            Student Wallet Address
          </label>
          <input
            type="text"
            id="studentWallet"
            name="studentWallet"
            className=" outline-none  border border-s border-[#ffffff75]    text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500 focus:border-blue-500"
            placeholder="e.g. 0xea034b47f51d8471e8cbe7f3e41f1fe476475388"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="studentName"
            className="block mb-2 text-sm text-white"
          >
            Student Name
          </label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            className=" outline-none  border border-s border-[#ffffff75]    text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500 focus:border-blue-500"
            placeholder="e.g. Levi Ackerman"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="universityRegistrationNumber"
            className="block mb-2 text-sm text-white"
          >
            University Registration Number
          </label>
          <input
            type="number"
            id="universityRegistrationNumber"
            name="universityRegistrationNumber"
            className=" outline-none  border border-s border-[#ffffff75]    text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500 focus:border-blue-500"
            placeholder="e.g. 201001001135"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="courseName" className="block mb-2 text-sm text-white">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            className=" outline-none  border border-s border-[#ffffff75]    text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500 focus:border-blue-500"
            placeholder="e.g. B.Tech"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="specialization"
            className="block mb-2 text-sm text-white"
          >
            Specialization
          </label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            className=" outline-none  border border-s border-[#ffffff75]    text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500 focus:border-blue-500"
            placeholder="e.g. CSE/Computer Science"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block mb-2 text-sm text-white">
            Start Year
          </label>
          <input
            type="text"
            id="startDate"
            name="startDate"
            className=" outline-none  border border-s border-[#ffffff75]    text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500 focus:border-blue-500"
            placeholder="e.g. 2020"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block mb-2 text-sm text-white">
            End Date
          </label>
          <input
            type="text"
            id="endDate"
            name="endDate"
            className=" outline-none  border border-s border-[#ffffff75]    text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white ring-blue-500 focus:border-blue-500"
            placeholder="e.g. 2024"
            required
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-[#215CFF] to-[#0631a7] hover:bg-blue-800 border border-s border-[#759aff] focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Issue Certificate
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
      {/* <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label htmlFor="student_wallet">Student Wallet Address</label>
        <input
          type="text"
          id="student_wallet"
          name="studentWallet"
          className="outline outline-red-200"
          required
          onChange={handleChange}
        />
        <label htmlFor="student_name">Student Name</label>
        <input
          type="text"
          id="student_name"
          className="outline outline-red-200"
          name="studentName"
          required
          onChange={handleChange}
        />
        <label htmlFor="universityRegistrationNumber">
          Registration Number
        </label>
        <input
          type="number"
          id="universityRegistrationNumber"
          className="outline outline-red-200"
          name="universityRegistrationNumber"
          required
          onChange={handleChange}
        />
        <label htmlFor="course_name">Course Name</label>
        <input
          type="text"
          id="course_name"
          className="outline outline-red-200"
          name="courseName"
          required
          onChange={handleChange}
        />
        <label htmlFor="specialization">Specialization</label>
        <input
          type="text"
          id="specialization"
          className="outline outline-red-200"
          name="specialization"
          required
          onChange={handleChange}
        />
        <label htmlFor="startDate">Start Date</label>
        <input
          type="number"
          id="startDate"
          className="outline outline-red-200"
          name="startDate"
          required
          onChange={handleChange}
        />
        <label htmlFor="endDate">End Date</label>
        <input
          type="number"
          id="endDate"
          className="outline outline-red-200"
          name="endDate"
          required
          onChange={handleChange}
        />
        <button type="submit">submit</button>
      </form> */}
    </div>
  );
};
export default Certificate;
