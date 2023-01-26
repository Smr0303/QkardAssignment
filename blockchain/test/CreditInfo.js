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

describe("Registered User",async()=>{
    beforeEach(async()=>{
             /*Add User */
        const tx = await creditInfo.connect(user).addCreditInfo(0);
        const receipt = await tx.wait();
        //authorise by owner
        const tx1 = await creditInfo.connect(owner).authoriseUser(user.address);
        await tx1.wait();
    });
    it("updates Credit Info by user", async()=>{
        const  tx2  = await creditInfo.connect(user).updateCreditInfo(1);
         await tx2.wait();
         /****** */
         const person = await creditInfo.creditInfo(user.address);
        expect(person._type).to.be.equal(1);
    })

})



})