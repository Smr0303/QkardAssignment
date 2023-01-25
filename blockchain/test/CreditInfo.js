const {ethers} = require("hardhat");
const {expect}=require("chai");

describe("CreditInfo",()=>{
    let owner,user;
    let creditInfo;
beforeEach(async()=>{
  [owner,user] = await ethers.getSigners();
   const  CreditInfo = await ethers.getContractFactory("CreditInfo");
   creditInfo = await CreditInfo.deploy(owner.address, 100000);
})
it("Is adding credit Info",async()=>{
    const tx = await creditInfo.connect(user).addCreditInfo(0);
    const receipt = await tx.wait();
    const [,,,,value]= await creditInfo.creditInfo(user.address);
    expect(value).to.be.equal(true);
})
})