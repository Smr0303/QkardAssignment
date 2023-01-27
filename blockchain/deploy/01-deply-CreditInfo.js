const {network} = require("hardhat");
module.exports =async({getNamedAccounts, deployments})=>{
const {deploy,log}=await deployments;
const {deployer} = await getNamedAccounts();

log("----Starting Deployment--------");

const CreditInfo = await deploy("CreditInfo",{
    from:deployer,
    log:true,
    args:[deployer,10000],
    blockConfirmations:3
});

log("------Deployed -------");
log(CreditInfo.address);
}

/*
deploying "CreditInfo" (tx: 0x2cd7441d57286cac6378d1690532f16a57e222a5552073b25604194fb9030af9)
...: deployed at 0xCB03fA855281280c12A01129D74139bc3267aa3A with 1204889 gas
*/