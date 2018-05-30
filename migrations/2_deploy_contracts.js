var NotarizeTx = artifacts.require("NotarizeTx");

module.exports = function(deployer) {
  const _buyer = "0x0fb27815ec4d078e1bc4e0a3dfbba2bdfe06495e"
  const _seller = "0xeef51fd5cb4b3309939e4382bd5179ce3423f0f9"
  const _id = "sksj3642ams6odnsoc32549102xfasf0"
  const _date = "2/4/18"
  const _value = 1
  const _hash = "sksj3642ams6odnsoc32549102xfasf1"
  const _status = "purchased"
  const _shipping = "d"
  deployer.deploy(NotarizeTx, _buyer, _seller, _id, _date, _value, _hash, _status, _shipping,{gasLimit:100000000000000})
};
