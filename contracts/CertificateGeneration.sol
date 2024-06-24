// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CertificateGeneration {
    
    // Struct to store certificate details
    struct Certificate {
        address studentWallet;
        string studentName; // New field for student name
        string courseName;
        string specialization;
        uint startYear;
        uint endYear;
        uint universityRegistrationNumber;
        address issuedBy;
        string certificateId; // Changed to string for hexadecimal value
    }
    
    // Mapping to store certificates
    mapping(string => Certificate) public certificates;
    
    // Mapping to store list of certificate IDs for each student
    mapping(address => string[]) public studentCertificates;
    
    // Event to log certificate issuance
    event CertificateIssued(string indexed certificateId, address studentWallet, string studentName, string courseName, string specialization, uint startYear, uint endYear, uint universityRegistrationNumber, address issuedBy);
    
    address public instituteWallet;
    
    constructor() {
        instituteWallet = msg.sender;
    }
    
    // Function to generate a unique certificate ID by hashing student information
    function generateCertificateId(address _studentWallet, string memory _studentName, string memory _courseName, string memory _specialization, uint _startYear, uint _endYear, uint _universityRegistrationNumber, address _issuedBy) internal view returns (string memory) {
        string memory studentInfo = string(abi.encodePacked(
         _studentWallet,
         _studentName,
         _courseName,
         _specialization,
         _startYear,
         _endYear,
         _universityRegistrationNumber,
         _issuedBy
        ));

        bytes32 randomHash = keccak256(abi.encodePacked(blockhash(block.number - 1), msg.sender)); // Use blockhash and sender for randomness
        string memory randomString = toHex(randomHash);
        studentInfo = string(abi.encodePacked(studentInfo, randomString));
        return toHex(keccak256(abi.encodePacked(studentInfo)));
    }


    
    // Function to issue a certificate (accessible from any wallet)
    function issueCertificate(address _studentWallet, string memory _studentName, string memory _courseName, string memory _specialization, uint _startYear, uint _endYear, uint _universityRegistrationNumber) external returns (string memory) {
        string memory certificateId = generateCertificateId(_studentWallet, _studentName, _courseName, _specialization, _startYear, _endYear, _universityRegistrationNumber, msg.sender);
        certificates[certificateId] = Certificate(_studentWallet, _studentName, _courseName, _specialization, _startYear, _endYear, _universityRegistrationNumber, msg.sender, certificateId);
        studentCertificates[_studentWallet].push(certificateId); // Add certificate ID to student's list
        emit CertificateIssued(certificateId, _studentWallet, _studentName, _courseName, _specialization, _startYear, _endYear, _universityRegistrationNumber, msg.sender);
        return certificateId;
    }
    
    // Function to verify a certificate using its unique ID
    function verifyCertificate(string memory _certificateId) public view returns (string memory, address, string memory, string memory, string memory, uint, uint, uint, address) {
        Certificate memory cert = certificates[_certificateId];
        require(bytes(cert.certificateId).length != 0, "Certificate not found");
        return (_certificateId, cert.studentWallet, cert.studentName, cert.courseName, cert.specialization, cert.startYear, cert.endYear, cert.universityRegistrationNumber, cert.issuedBy);
    }

    
    // Function to convert bytes32 to hexadecimal string
    function toHex(bytes32 value) internal pure returns (string memory) {
        bytes memory buffer = new bytes(64);
        for (uint i = 0; i < 32; i++) {
            uint8 left = uint8(value[i] >> 4);
            uint8 right = uint8(value[i] & 0x0f);
            buffer[i * 2] = left < 10 ? bytes1(left + 48) : bytes1(left + 87); // 48 is the ASCII code for '0', and 87 is the ASCII code for 'a' - 10
            buffer[i * 2 + 1] = right < 10 ? bytes1(right + 48) : bytes1(right + 87);
        }
        return string(buffer);
    }
    
    // Function to get all certificates belonging to a specific student wallet address
    function getStudentCertificates(address _studentWallet) external view returns (string[] memory) {
        return studentCertificates[_studentWallet];
    }
}
