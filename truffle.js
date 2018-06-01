require('babel-register')({
  ignore: /node_modules\/(?!zeppelin-solidity)/
});
require('babel-polyfill');

module.exports = {

  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
<<<<<<< HEAD
      gasLimit:403861,
      gas: 403861,
=======
      gasLimit:6750000,
      gas: 6750000,
>>>>>>> dae068b9f5dba095a137aff61d8542ec782c6435
    },
    coverage: {
      host: "localhost",
      network_id: "*",
      port: 8545,
      gas: 0xfffffffffffffff,
      gasPrice: 0x01
    },
    ropsten: {
      host: "localhost",
      network_id: 3,
      port: 8545,
      gas: 2900000
    }
  },
  mocha: {
   useColors: true
  }
};
