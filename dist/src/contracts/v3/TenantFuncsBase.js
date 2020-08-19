var contract = {
  "abi": [{
    "constant": true,
    "inputs": [],
    "name": "creator",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "_candidate",
      "type": "address"
    }],
    "name": "isAdmin",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_ident",
      "type": "bytes32"
    }, {
      "name": "_ord",
      "type": "uint8"
    }],
    "name": "setAndGetBit",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "_ident",
      "type": "bytes32"
    }, {
      "name": "_ord",
      "type": "uint8"
    }],
    "name": "getBit",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_ident",
      "type": "bytes32"
    }, {
      "name": "_ord",
      "type": "uint8"
    }],
    "name": "setAndGetBitInternal",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "version",
    "outputs": [{
      "name": "",
      "type": "bytes32"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "versionAPI",
    "outputs": [{
      "name": "",
      "type": "bytes32"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "newCreator",
      "type": "address"
    }],
    "name": "transferCreatorship",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_ident",
      "type": "bytes32"
    }, {
      "name": "_ord",
      "type": "uint8"
    }],
    "name": "incrementCounter",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "owner",
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
      "name": "_encToken",
      "type": "bytes"
    }],
    "name": "checkAndSet",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "key",
      "type": "bytes"
    }],
    "name": "getMeta",
    "outputs": [{
      "name": "",
      "type": "bytes"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "contentSpace",
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
      "name": "_encAuthToken",
      "type": "bytes"
    }, {
      "name": "_amount",
      "type": "uint256"
    }, {
      "name": "_to",
      "type": "address"
    }],
    "name": "transferToken",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_encToken",
      "type": "bytes"
    }, {
      "name": "",
      "type": "uint256"
    }, {
      "name": "_to",
      "type": "address"
    }],
    "name": "applyGroups",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "_ident",
      "type": "bytes32"
    }, {
      "name": "_ord",
      "type": "uint8"
    }],
    "name": "getCounter",
    "outputs": [{
      "name": "",
      "type": "uint32"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "key",
      "type": "bytes"
    }, {
      "name": "value",
      "type": "bytes"
    }],
    "name": "putMeta",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_ident",
      "type": "bytes32"
    }],
    "name": "deleteGroup",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "name": "to",
      "type": "address"
    }, {
      "indexed": false,
      "name": "amount",
      "type": "uint256"
    }],
    "name": "TenantTransfer",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "name": "to",
      "type": "address"
    }, {
      "indexed": false,
      "name": "numGroups",
      "type": "uint256"
    }],
    "name": "ApplyGroups",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "name": "ident",
      "type": "bytes32"
    }, {
      "indexed": false,
      "name": "slot",
      "type": "uint8"
    }, {
      "indexed": false,
      "name": "val",
      "type": "uint32"
    }],
    "name": "CounterIncremented",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "name": "ident",
      "type": "bytes32"
    }, {
      "indexed": false,
      "name": "ord",
      "type": "uint8"
    }, {
      "indexed": false,
      "name": "prev",
      "type": "bool"
    }],
    "name": "BitSetAndGet",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "name": "ident",
      "type": "bytes32"
    }],
    "name": "WordGroupDeleted",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "name": "key",
      "type": "bytes"
    }],
    "name": "ObjectMetaChanged",
    "type": "event"
  }]
};
module.exports = contract;