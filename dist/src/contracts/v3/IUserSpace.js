var contract = {
  "abi": [{
    "constant": true,
    "inputs": [{
      "name": "_userAddr",
      "type": "address"
    }],
    "name": "userWallets",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_user",
      "type": "address"
    }],
    "name": "createUserWallet",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }]
};
module.exports = contract;