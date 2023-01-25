//SPDX-License-Identifier:MIT
pragma solidity ^0.8.9;

error ALERADY_REGISTERED();

contract CreditInfo{

enum Type{
    Individual,
    Business
}
struct Info{
    uint256 creditScore;
    uint256 creditLimit;
    Type _type;
    uint256 creditInquiry;   
    bool  IsPresent;
}

address immutable i_owner;
uint256 immutable i_creditLimit;

mapping(address => Info) public creditInfo;
mapping(address=> bool)  isAuthorised;


constructor(address owner,uint256 creditLimit){
    i_owner = owner;
    i_creditLimit= creditLimit;
}

//Store the information of credit individuals 
function addCreditInfo(uint256 _typeIndex) public {
  if(creditInfo[msg.sender].IsPresent == true ){
    revert ALERADY_REGISTERED();
  }
  
  Info memory  person ;
  person =Info(0, i_creditLimit, Type(_typeIndex), block.timestamp,true); 
  creditInfo[msg.sender] = person;
}

}