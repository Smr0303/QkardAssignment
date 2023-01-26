//SPDX-License-Identifier:MIT
pragma solidity ^0.8.9;

error ALERADY_REGISTERED();
error NOT_AUTHORISED_BY_OWNER();
error NOT_OWNER();
error NOT_REGISTERED();

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

mapping(address => Info)  creditInfo;
mapping(address=> bool)  public isAuthorised;
mapping(address=> uint256) public paymentHistory;



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

function updateCreditInfo(uint256 _typeIndex)public {
if((isAuthorised[msg.sender] == false) ){
    revert NOT_AUTHORISED_BY_OWNER();
}
if(creditInfo[msg.sender].IsPresent == false){
  revert NOT_REGISTERED();
}
Info memory person = creditInfo[msg.sender] ;
person._type = Type(_typeIndex);
creditInfo[msg.sender] = person;
}

function authoriseUser (address _address) public {
if((msg.sender != i_owner) ){
    revert NOT_OWNER();
}
isAuthorised[_address] = true;
}


function updateCreditInfo_Owner(address _address,uint256 _creditScore ,uint256 _creditLimit,uint256 _typeIndex)public{
if((msg.sender != i_owner) ){
    revert NOT_OWNER();
}
Info memory  person ;
person =Info(_creditScore,_creditLimit, Type(_typeIndex), block.timestamp,true); 
creditInfo[_address] = person;
}


function accessCreditInfo(address _address) public view returns(Info memory) {
if((isAuthorised[msg.sender] == false)){
    revert NOT_AUTHORISED_BY_OWNER();
}
if(creditInfo[_address].IsPresent == false){
  revert NOT_REGISTERED();
}
return creditInfo[_address];
}

function accessCreditInfo_Owner(address _address) public view returns(Info memory) {
if((msg.sender != i_owner)){
    revert NOT_OWNER();
}
if(creditInfo[_address].IsPresent == false){
  revert NOT_REGISTERED();
}
return creditInfo[_address];
}

function calculateCreditscore(address _address) public {
  if(msg.sender != i_owner){
    revert NOT_OWNER();
  }

  Info memory  person = creditInfo[_address];
  uint256 _creditScore;
  if(paymentHistory[_address] == 0){
   _creditScore = 0;
  }
  else{
   _creditScore=((person.creditLimit/paymentHistory[_address])*10);
  }
  person.creditScore = _creditScore;
  creditInfo[_address] = person;
}

function updatePaymentHistory(address _address,uint256 _paymentHistory) public{
if(msg.sender != i_owner){
    revert NOT_OWNER();
  }
paymentHistory[_address] = _paymentHistory;
}
}
