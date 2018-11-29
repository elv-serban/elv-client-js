const contract={"abi":[{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint8"},{"name":"","type":"bytes32[]"},{"name":"","type":"address[]"}],"name":"runAccess","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"proposed_status_code","type":"int256"}],"name":"runStatusChange","outputs":[{"name":"","type":"int256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"int256"}],"name":"runDescribeStatus","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"request_ID","type":"uint256"}],"name":"runFinalize","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newCreator","type":"address"}],"name":"transferCreatorship","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"runCreate","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"tokenCreditPerAd","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"runKill","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"creditPerAd","type":"uint256"}],"name":"setTokenCreditPerAd","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"","type":"uint8"},{"name":"","type":"bytes32[]"},{"name":"","type":"address[]"}],"name":"runAccessCharge","outputs":[{"name":"","type":"int256"}],"payable":true,"stateMutability":"payable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"tokenCreditPerAd","type":"uint256"}],"name":"TokenCreditPerAd","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"s","type":"string"}],"name":"DbgString","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"a","type":"address"}],"name":"DbgAddress","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"u","type":"uint256"}],"name":"DbgUint256","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"u","type":"uint256"}],"name":"DbgUint","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"result","type":"uint256"}],"name":"RunCreate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"result","type":"uint256"}],"name":"RunKill","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposedStatusCode","type":"int256"},{"indexed":false,"name":"returnStatusCode","type":"int256"}],"name":"RunStatusChange","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"level","type":"uint8"},{"indexed":false,"name":"calculateAccessCharge","type":"int256"}],"name":"RunAccessCharge","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"requestID","type":"uint256"},{"indexed":false,"name":"result","type":"uint256"}],"name":"RunAccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"requestID","type":"uint256"},{"indexed":false,"name":"result","type":"uint256"}],"name":"RunFinalize","type":"event"}],"bytecode":"606060405260008054600160a060020a033216600160a060020a031991821681179092556001805490911690911790556106698061003e6000396000f3006060604052600436106100cf5763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166302d05d3f81146100d1578063123e0e80146101005780633513a805146101a457806341c0e1b5146101af57806345080442146101c25780636b2d1324146101d85780636d2e4b1b146101e35780637b1cdb3e146102025780638b7782841461020a5780638da5cb5b1461021d5780639e99bbea14610202578063b82acb5914610230578063f2fde38b14610246578063f8117ca214610265575b005b34156100dc57600080fd5b6100e46102f1565b604051600160a060020a03909116815260200160405180910390f35b61019260048035906024803560ff16919060649060443590810190830135806020808202016040519081016040528093929190818152602001838360200280828437820191505050505050919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284375094965061030095505050505050565b60405190815260200160405180910390f35b61019260043561030a565b34156101ba57600080fd5b6100cf61030d565b34156101cd57600080fd5b610192600435610351565b610192600435610357565b34156101ee57600080fd5b6100cf600160a060020a036004351661048d565b61019261052e565b341561021557600080fd5b610192610533565b341561022857600080fd5b6100e4610539565b341561023b57600080fd5b6100cf600435610548565b341561025157600080fd5b6100cf600160a060020a03600435166105b9565b6101926004803560ff169060446024803590810190830135806020808202016040519081016040528093929190818152602001838360200280828437820191505050505050919080359060200190820180359060200190808060200260200160405190810160405280939291908181526020018383602002808284375094965061063395505050505050565b600054600160a060020a031681565b6000949350505050565b90565b60015432600160a060020a0390811691161480610338575060015433600160a060020a039081169116145b151561034357600080fd5b600154600160a060020a0316ff5b50600090565b600033818080600160a060020a038416631a735f18876040517c010000000000000000000000000000000000000000000000000000000063ffffffff84160281526004810191909152602401606060405180830381600087803b15156103bc57600080fd5b5af115156103c957600080fd5b50505060405180519060200180519060200180519295509093509091505032600160a060020a0390811690841614801561040657508060000b6001145b151561041157600080fd5b32600160a060020a03166108fc6002549081150290604051600060405180830381858888f19350505050151561044657600080fd5b7fbf0f2215c45c5ee802d4c20bdfc915308c4459b0f6a78f23ad350e6408bf289186600060405191825260208201526040908101905180910390a150600095945050505050565b60005432600160a060020a039081169116146104a857600080fd5b600160a060020a03811615156104bd57600080fd5b600054600154600160a060020a03908116911614156104ff576001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b6000805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b600090565b60025481565b600154600160a060020a031681565b60015432600160a060020a0390811691161480610573575060015433600160a060020a039081169116145b151561057e57600080fd5b60028190557ffad6c097c568a4bcebf08faf3b35206ff6b371b1f71c78ea7a483d026e4ac5c48160405190815260200160405180910390a150565b60015432600160a060020a03908116911614806105e4575060015433600160a060020a039081169116145b15156105ef57600080fd5b600160a060020a038116151561060457600080fd5b6001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0392909216919091179055565b60001993925050505600a165627a7a7230582023fa6eb8069b295df75c831d1feaf8110b0114969c68335004ca0b39af98eb670029"}; module.exports=contract;