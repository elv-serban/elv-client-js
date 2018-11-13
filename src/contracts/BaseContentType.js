const contract={"abi":[{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newCreator","type":"address"}],"name":"transferCreatorship","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"updateRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"object_hash","type":"bytes32"}],"name":"commit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"object_hash","type":"bytes32"}],"name":"Commit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"object_hash","type":"bytes32"}],"name":"UpdateRequest","type":"event"}],"bytecode":"606060405260008054600160a060020a033216600160a060020a0319918216811790925560018054909116909117905561035b8061003e6000396000f3006060604052600436106100825763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166302d05d3f811461008457806341c0e1b5146100b35780636d2e4b1b146100c65780638da5cb5b146100e5578063c287e0ed146100f8578063f14fcbc81461010b578063f2fde38b14610121575b005b341561008f57600080fd5b610097610140565b604051600160a060020a03909116815260200160405180910390f35b34156100be57600080fd5b61008261014f565b34156100d157600080fd5b610082600160a060020a0360043516610178565b34156100f057600080fd5b610097610219565b341561010357600080fd5b610082610228565b341561011657600080fd5b61008260043561027a565b341561012c57600080fd5b610082600160a060020a03600435166102d0565b600054600160a060020a031681565b60015432600160a060020a0390811691161461016a57600080fd5b600154600160a060020a0316ff5b60005432600160a060020a0390811691161461019357600080fd5b600160a060020a03811615156101a857600080fd5b600054600154600160a060020a03908116911614156101ea576001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600154600160a060020a031681565b60015432600160a060020a0390811691161461024357600080fd5b7f1b6452b35fd3ee7f1fad8558a9d3e79233f94d15fe657df3871f8efc2f97ef1960025460405190815260200160405180910390a1565b60015432600160a060020a0390811691161461029557600080fd5b60028190557f9e8a51bb6b34b9d5d18c14fd753ee3bf44e2256512665a4577281ffcc91943ff8160405190815260200160405180910390a150565b60015432600160a060020a039081169116146102eb57600080fd5b600160a060020a038116151561030057600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03929092169190911790555600a165627a7a72305820b23ee89e713c48b734301ae04f31bf62f69479b68a9eacddb9135d4d02dee3e50029"}; module.exports=contract;