
const fakeFarm = artifacts.require("FakeFarm");

module.exports = function (deployer) {
  // deployer.deploy(Migrations);
  let cakeTokenAddr = "0xf9f93cf501bfadb6494589cb4b4c15de49e85d0e";
  let fakeFarmAddr = deployer.deploy(fakeFarm, cakeTokenAddr);
  console.log(fakeFarmAddr);
};
