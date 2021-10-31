const Pool = artifacts.require("Pool");
const fakeFarm = artifacts.require("FakeFarm");


module.exports = function (deployer) {
  // deployer.deploy(Migrations);
  var pancakeAddr = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";
  let cakeTokenAddr = "0xf9f93cf501bfadb6494589cb4b4c15de49e85d0e";
  // let fakeFarmAddr = "0x0000000000000000000000000000000000000000";
  let fakeFarmAddr = deployer.deploy(fakeFarm, cakeTokenAddr);
  console.log(fakeFarmAddr);
  let poolAddr = deployer.deploy(Pool, pancakeAddr, cakeTokenAddr, fakeFarmAddr);
  console.log(poolAddr);
};
