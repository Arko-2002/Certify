// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CertificateAuthority {
    
    // Struct to store institute details
    struct Institute {
        string name;
        string location;
        address walletAddress;
        string logo; // New field for institute logo
        bool exists;
    }
    
    // Mapping to store institutes
    mapping(address => Institute) public institutes;
    
    // Array to keep track of institute addresses
    address[] public institutesList;
    
    // Event to log creation of institute
    event InstituteCreated(address indexed instituteAddress, string name, string location, address walletAddress, string logo);
    
    // Event to log update of institute details
    event InstituteUpdated(address indexed instituteAddress, string name, string location, address walletAddress, string logo);
    
    // Event to log deletion of institute
    event InstituteDeleted(address indexed instituteAddress);
    
    // Modifier to check if the sender is the government
    modifier onlyGovernment() {
        require(msg.sender == government, "Only government can call this function");
        _;
    }
    
    address public government;
    uint public totalInstitutes; // Variable to keep track of total number of institutes
    
    // Constructor to set government address
    constructor() {
        government = msg.sender;
    }
    
    // Function to create an institute
    function createInstitute(address _instituteAddress, string memory _name, string memory _location, address _walletAddress, string memory _logo) external onlyGovernment {
        require(!institutes[_instituteAddress].exists, "Institute already exists");
        institutes[_instituteAddress] = Institute(_name, _location, _walletAddress, _logo, true);
        institutesList.push(_instituteAddress); // Add institute address to the list
        totalInstitutes++; // Increment total institutes count
        emit InstituteCreated(_instituteAddress, _name, _location, _walletAddress, _logo);
    }
    
    // Function to update institute details
    function updateInstitute(address _instituteAddress, string memory _name, string memory _location, address _walletAddress, string memory _logo) external onlyGovernment {
        require(institutes[_instituteAddress].exists, "Institute does not exist");
        institutes[_instituteAddress].name = _name;
        institutes[_instituteAddress].location = _location;
        institutes[_instituteAddress].walletAddress = _walletAddress;
        institutes[_instituteAddress].logo = _logo;
        emit InstituteUpdated(_instituteAddress, _name, _location, _walletAddress, _logo);
    }
    
    // Function to delete an institute
    function deleteInstitute(address _instituteAddress) external onlyGovernment {
        require(institutes[_instituteAddress].exists, "Institute does not exist");
        delete institutes[_instituteAddress];
        totalInstitutes--; // Decrement total institutes count
        
        // Remove the institute address from the list
        for (uint i = 0; i < institutesList.length; i++) {
            if (institutesList[i] == _instituteAddress) {
                institutesList[i] = institutesList[institutesList.length - 1];
                institutesList.pop();
                break;
            }
        }
        
        emit InstituteDeleted(_instituteAddress);
    }

    // Function to verify if an address belongs to an institute
    function verifyIsInstitute(address _walletAddress) public view returns (bool) {
        return institutes[_walletAddress].exists;
    }

    // Function to get information of a single institute given its wallet address
    function getInstituteInfo(address _walletAddress) public view returns (string memory, string memory, address, string memory) {
        require(institutes[_walletAddress].exists, "Institute does not exist");
        
        Institute memory institute = institutes[_walletAddress];
        
        return (institute.name, institute.location, institute.walletAddress, institute.logo);
    }
    
    // Function to return all institutes if called by the government wallet
    function getAllInstitutesForGovernment() external view onlyGovernment returns (address[] memory, string[] memory, string[] memory, address[] memory, string[] memory) {
        address[] memory instituteAddresses = new address[](totalInstitutes);
        string[] memory names = new string[](totalInstitutes);
        string[] memory locations = new string[](totalInstitutes);
        address[] memory walletAddresses = new address[](totalInstitutes);
        string[] memory logos = new string[](totalInstitutes);
        
        for (uint i = 0; i < totalInstitutes; i++) {
            Institute memory institute = institutes[institutesList[i]];
            instituteAddresses[i] = institutesList[i];
            names[i] = institute.name;
            locations[i] = institute.location;
            walletAddresses[i] = institute.walletAddress;
            logos[i] = institute.logo;
        }
        
        return (instituteAddresses, names, locations, walletAddresses, logos);
    }
}
