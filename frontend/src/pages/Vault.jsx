import { useEffect, useState } from 'react';
import ADMIN_ADDRESS from '../utils/adminWhitelist';
const Vault = ({
  isInstitute,
  selectedAddress,
  certificateContract,
  authorityContract,
}) => {
  const [documentData, setDocumentData] = useState([]);
  async function getAllCertificates(wallet) {
    const res = await certificateContract.getStudentCertificates(wallet);
    return res;
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

  useEffect(() => {
    const fetchData = async () => {
      if (certificateContract) {
        try {
          const certificates = await getAllCertificates(selectedAddress);
          let temp = [];
          for (const id of certificates) {
            const certificateVerificationResult = await verifyCertificate(id);
            const test = [...certificateVerificationResult];
            const instituteInfo = await getInstituteInfo(
              certificateVerificationResult[8]
            );
            const [name, location] = instituteInfo;
            test.push(name);
            test.push(location);
            temp.push(test);
          }
          setDocumentData(temp);
        } catch (error) {
          // Handle errors
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [certificateContract, selectedAddress]);

  //   if (isInstitute) {
  //     return (
  //       <div className="min-h-dvh text-4xl">
  //         <h1>Ooops... you are not a student.</h1>
  //       </div>
  //     );
  //   }
  return (
    <div className="min-h-dvh  flex flex-col gap-6 w-full max-w-[1500px]  p-8 ">
      <h1 className="text-4xl">Hi there, {selectedAddress}</h1>

      {documentData.length === 0 && (
        <div className="text-2xl">
          Sorry you don't have any certificates right now.
        </div>
      )}
      {documentData.length && (
        <div className="flex flex-col gap-6 ">
          {documentData.map((document) => {
            return (
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Vault;
