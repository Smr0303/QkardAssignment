const {ethers} = require("hardhat");
const {expect}=require("chai");

describe("CreditInfo",()=>{
    let owner,user,dummy1,dummy2;
    let creditInfo;
beforeEach(async()=>{
  [owner,user,dummy1,dummy2] = await ethers.getSigners();
   const  CreditInfo = await ethers.getContractFactory("CreditInfo");
   creditInfo = await CreditInfo.deploy(owner.address, 100000);
})
it("Is adding credit Info",async()=>{
    const tx = await creditInfo.connect(user).addCreditInfo(0);
    const receipt = await tx.wait();
    const tx1 = await creditInfo.connect(owner).authoriseUser(user.address);
    await tx1.wait();
    const [,,,,value]= await creditInfo.connect(user).accessCreditInfo(user.address);
    expect(value).to.be.equal(true);
})
it("Is authorising user",async()=>{
   const tx = await creditInfo.connect(owner).authoriseUser(user.address);
   await tx.wait();
   expect(await creditInfo.isAuthorised(user.address)).to.be.equal(true);
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
        const person = await creditInfo.connect(user).accessCreditInfo(user.address);
        expect(person._type).to.be.equal(1);
    });
    // it("updates Credit Info by ownerr", async()=>{
    //     const  tx2  = await creditInfo.connect(user).updateCreditInfo(1);
    //      await tx2.wait();
    //     const person = await creditInfo.connect(user).accessCreditInfo(user.address);
    //     expect(person._type).to.be.equal(1);
    // });
    it("Access Info by permission",async()=>{
        /*Accessing as owner */
        let info = await creditInfo.connect(owner).accessCreditInfo_Owner(user.address);
        expect(info);
        /*Accessing personal info */
        info = await creditInfo.connect(user).accessCreditInfo(user.address);
        expect(info);
    })

    it("Is calculating credit score",async()=>{
        
    })

})



})