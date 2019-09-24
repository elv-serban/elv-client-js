const contract={"abi":[{"constant":true,"inputs":[],"name":"parentAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"creator","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_candidate","type":"address"}],"name":"canContribute","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"content_type","type":"address"},{"name":"content_contract","type":"address"}],"name":"addContentType","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"canConfirm","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"contentTypeContracts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"typeHash","type":"bytes32"}],"name":"findTypeByHash","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"address"}],"name":"canNodePublish","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"canReview","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"content_type","type":"address"}],"name":"validType","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"contentObj","type":"address"}],"name":"publish","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"addressKMS","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"countVersionHashes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"requiresReview","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"confirmCommit","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingHash","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newCreator","type":"address"}],"name":"transferCreatorship","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"canCommit","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"versionTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"versionHashes","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"hasAccess","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_objectHash","type":"string"}],"name":"commit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contentTypes","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_candidate","type":"address"}],"name":"canPublish","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"content_type","type":"address"}],"name":"whitelistedType","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contentSpace","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"updateRequest","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"contentTypesLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"address_KMS","type":"address"}],"name":"setAddressKMS","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"objectHash","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_versionHash","type":"string"}],"name":"deleteVersion","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"content_type","type":"address"}],"name":"removeContentType","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"contentType","type":"address"},{"indexed":false,"name":"contentContract","type":"address"}],"name":"ContentTypeAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"contentType","type":"address"}],"name":"ContentTypeRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"spaceAddress","type":"address"},{"indexed":false,"name":"parentAddress","type":"address"},{"indexed":false,"name":"objectHash","type":"string"}],"name":"CommitPending","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"objectHash","type":"string"}],"name":"UpdateRequest","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"spaceAddress","type":"address"},{"indexed":false,"name":"objectHash","type":"string"}],"name":"VersionConfirm","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"spaceAddress","type":"address"},{"indexed":false,"name":"versionHash","type":"string"},{"indexed":false,"name":"index","type":"int256"}],"name":"VersionDelete","type":"event"}],"bytecode":"60806040527f4f776e61626c6532303139303532383139333830304d4c00000000000000000060009081557f4564697461626c6532303139303830313133353530304d4c00000000000000006004557f436f6e7461696e657232303139303532393039313830304d4c00000000000000600a55600d5560018054600160a060020a031990811632908117909255600280549091169091179055611d21806100a76000396000f3006080604052600436106101a75763ffffffff60e060020a600035041662821de381146101a957806302d05d3f146101da5780630eaec2c5146101ef5780630f58a7861461022457806314cfabb31461024b5780631cdbee5a146102605780631f2caaec1461028157806326683e141461029957806329d00219146102ba57806329dedde5146102db5780632cf99422146102fc57806332eaf21b1461031d578063331b86c0146103325780633dd71d991461024b57806341c0e1b514610359578063446e88261461036e57806354fd4d5014610376578063628449fd1461038b5780636d2e4b1b146104155780636e375427146104365780637886f7471461044b5780637ca8f618146104635780638da5cb5b1461047b57806395a078e8146104905780639867db74146104b1578063991a3a7c1461050a5780639b55f901146101ef5780639cb121ba14610522578063af570c0414610543578063c287e0ed14610558578063c65bcbe21461056d578063c9e8e72d14610582578063e02dd9c2146105a3578063e1a70717146105b8578063f2fde38b14610611578063fd08919614610632575b005b3480156101b557600080fd5b506101be610653565b60408051600160a060020a039092168252519081900360200190f35b3480156101e657600080fd5b506101be610663565b3480156101fb57600080fd5b50610210600160a060020a0360043516610672565b604080519115158252519081900360200190f35b34801561023057600080fd5b506101a7600160a060020a03600435811690602435166106a3565b34801561025757600080fd5b50610210610818565b34801561026c57600080fd5b506101be600160a060020a036004351661081d565b34801561028d57600080fd5b506101be600435610838565b3480156102a557600080fd5b50610210600160a060020a0360043516610abc565b3480156102c657600080fd5b50610210600160a060020a0360043516610b5b565b3480156102e757600080fd5b50610210600160a060020a0360043516610b61565b34801561030857600080fd5b50610210600160a060020a0360043516610b7f565b34801561032957600080fd5b506101be610c9f565b34801561033e57600080fd5b50610347610cae565b60408051918252519081900360200190f35b34801561036557600080fd5b506101a7610cb4565b610210610cf0565b34801561038257600080fd5b50610347610ec5565b34801561039757600080fd5b506103a0610ecb565b6040805160208082528351818301528351919283929083019185019080838360005b838110156103da5781810151838201526020016103c2565b50505050905090810190601f1680156104075780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561042157600080fd5b506101a7600160a060020a0360043516610f59565b34801561044257600080fd5b50610210610fa7565b34801561045757600080fd5b50610347600435610fb8565b34801561046f57600080fd5b506103a0600435610fd7565b34801561048757600080fd5b506101be61104b565b34801561049c57600080fd5b50610210600160a060020a036004351661105a565b3480156104bd57600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526101a79436949293602493928401919081908401838280828437509497506110609650505050505050565b34801561051657600080fd5b506101be600435611170565b34801561052e57600080fd5b50610210600160a060020a0360043516611198565b34801561054f57600080fd5b506101be6111ef565b34801561056457600080fd5b506101a76111fe565b34801561057957600080fd5b506103476112d4565b34801561058e57600080fd5b506101a7600160a060020a03600435166112da565b3480156105af57600080fd5b506103a061132a565b3480156105c457600080fd5b506040805160206004803580820135601f81018490048402850184019095528484526103479436949293602493928401919081908401838280828437509497506113859650505050505050565b34801561061d57600080fd5b506101a7600160a060020a036004351661192d565b34801561063e57600080fd5b50610210600160a060020a0360043516611992565b600354600160a060020a03165b90565b600154600160a060020a031681565b600254600090600160a060020a038381169116148061069b5750600254600160a060020a031633145b90505b919050565b600254600160a060020a03163214806106c65750600254600160a060020a031633145b15156106d157600080fd5b600160a060020a038083166000908152600e6020526040902054161580156106ff57506106fd82611198565b155b156107ab57600c54600d5410156107555781600c600d5481548110151561072257fe5b9060005260206000200160006101000a815481600160a060020a030219169083600160a060020a031602179055506107a1565b600c80546001810182556000919091527fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c7018054600160a060020a031916600160a060020a0384161790555b600d805460010190555b600160a060020a038281166000818152600e60209081526040918290208054600160a060020a0319169486169485179055815192835282019290925281517f280016f7418306a55542432120fd1a239ef9fcc1a92694d8d44ca76be0249ea7929181900390910190a15050565b600090565b600e60205260009081526040902054600160a060020a031681565b600080805b600c54821015610ab057600c80548390811061085557fe5b6000918252602091829020015460408051808401889052815180820385018152908201918290528051600160a060020a03909316945092909182918401908083835b602083106108b65780518252601f199092019160209182019101610897565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390206000191681600160a060020a031663e02dd9c26040518163ffffffff1660e060020a028152600401600060405180830381600087803b15801561092557600080fd5b505af1158015610939573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052602081101561096257600080fd5b81019080805164010000000081111561097a57600080fd5b8201602081018481111561098d57600080fd5b81516401000000008111828201871017156109a757600080fd5b50509291905050506040516020018082805190602001908083835b602083106109e15780518252601f1990920191602091820191016109c2565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040516020818303038152906040526040518082805190602001908083835b60208310610a445780518252601f199092019160209182019101610a25565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040518091039020600019161415610aa557600c805483908110610a8957fe5b600091825260209091200154600160a060020a03169250610ab5565b60019091019061083d565b600092505b5050919050565b600354604080517f26683e14000000000000000000000000000000000000000000000000000000008152600160a060020a0384811660048301529151600093929092169182916326683e1491602480830192602092919082900301818887803b158015610b2857600080fd5b505af1158015610b3c573d6000803e3d6000fd5b505050506040513d6020811015610b5257600080fd5b50519392505050565b50600090565b6000600d5460001415610b765750600161069e565b61069b82611198565b60008033600160a060020a03841614610b9757600080fd5b82905080600160a060020a0316638280dd8f60006040518263ffffffff1660e060020a02815260040180828152602001915050602060405180830381600087803b158015610be457600080fd5b505af1158015610bf8573d6000803e3d6000fd5b505050506040513d6020811015610c0e57600080fd5b5050604080517f27c1c21d0000000000000000000000000000000000000000000000000000000081529051600160a060020a038316916327c1c21d9160048083019260209291908290030181600087803b158015610c6b57600080fd5b505af1158015610c7f573d6000803e3d6000fd5b505050506040513d6020811015610c9557600080fd5b5051159392505050565b600b54600160a060020a031681565b60075490565b600254600160a060020a0316321480610cd75750600254600160a060020a031633145b1515610ce257600080fd5b600254600160a060020a0316ff5b6000610cfa610818565b1515610d0557600080fd5b600060058054600181600116156101000203166002900490501115610db45760078054600181810180845560009390935260058054610d7b937fa66cc928b5edb82af9bd49922954155ab7b0942694bea4ce44661d9a8736c6880192600261010091831615919091026000190190911604611b35565b5050600654600880546001810182556000919091527ff3f7a9fe364faab93b216da50a3214154f22a0a2b415b23a84c8169e8b636ee301555b60098054610dd79160059160026000196101006001841615020190911604611b35565b5042600655604080516020810191829052600090819052610dfa91600991611bba565b5060035460408051600160a060020a039092168083526020830182815260058054600260001960018316156101000201909116049385018490527f482875da75e6d9f93f74a5c1a61f14cf08822057c01232f44cb92ae998e30d8e94929390929190606083019084908015610eb05780601f10610e8557610100808354040283529160200191610eb0565b820191906000526020600020905b815481529060010190602001808311610e9357829003601f168201915b5050935050505060405180910390a150600190565b600a5481565b6009805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610f515780601f10610f2657610100808354040283529160200191610f51565b820191906000526020600020905b815481529060010190602001808311610f3457829003601f168201915b505050505081565b600154600160a060020a03163214610f7057600080fd5b600160a060020a0381161515610f8557600080fd5b60018054600160a060020a031916600160a060020a0392909216919091179055565b600254600160a060020a0316321490565b6008805482908110610fc657fe5b600091825260209091200154905081565b6007805482908110610fe557fe5b600091825260209182902001805460408051601f6002600019610100600187161502019094169390930492830185900485028101850190915281815293509091830182828015610f515780601f10610f2657610100808354040283529160200191610f51565b600254600160a060020a031681565b50600190565b611068610fa7565b151561107357600080fd5b805160801161108157600080fd5b8051611094906009906020840190611bba565b506003547fb3ac059d88af6016aca1aebb7b3e796f2e7420435c59c563687814e9b85daa7590600160a060020a03166110cb610653565b60408051600160a060020a03808516825283166020820152606091810182815260098054600260001961010060018416150201909116049383018490529260808301908490801561115d5780601f106111325761010080835404028352916020019161115d565b820191906000526020600020905b81548152906001019060200180831161114057829003601f168201915b505094505050505060405180910390a150565b600c80548290811061117e57fe5b600091825260209091200154600160a060020a0316905081565b600080805b600d548110156111e85783600160a060020a0316600c828154811015156111c057fe5b600091825260209091200154600160a060020a031614156111e057600191505b60010161119d565b5092915050565b600354600160a060020a031681565b600254600160a060020a031633148061121a575061121a610818565b151561122557600080fd5b60408051602080825260058054600260001961010060018416150201909116049183018290527f403f30aa5f4f2f89331a7b50054f64a00ce206f4d0a37f566ff344bbe46f8b65939092918291820190849080156112c45780601f10611299576101008083540402835291602001916112c4565b820191906000526020600020905b8154815290600101906020018083116112a757829003601f168201915b50509250505060405180910390a1565b600d5481565b600254600160a060020a03163214806112fd5750600254600160a060020a031633145b151561130857600080fd5b600b8054600160a060020a031916600160a060020a0392909216919091179055565b6005805460408051602060026001851615610100026000190190941693909304601f81018490048402820184019092528181529291830182828015610f515780601f10610f2657610100808354040283529160200191610f51565b600080600080600080611396610fa7565b15156113a157600080fd5b866040516020018082805190602001908083835b602083106113d45780518252601f1990920191602091820191016113b5565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040516020818303038152906040526040518082805190602001908083835b602083106114375780518252601f199092019160209182019101611418565b6001836020036101000a03801982511681845116808217855250505050505090500191505060405180910390209450600560405160200180828054600181600116156101000203166002900480156114c65780601f106114a45761010080835404028352918201916114c6565b820191906000526020600020905b8154815290600101906020018083116114b2575b50509150506040516020818303038152906040526040518082805190602001908083835b602083106115095780518252601f1990920191602091820191016114ea565b5181516020939093036101000a6000190180199091169216919091179052604051920182900390912096505050508484141561162a5760408051602081019182905260009081905261155d91600591611bba565b506000600681905560035460408051600160a060020a03909216808352908201839052606060208084018281528c51928501929092528b517f238d74c13cda9ba51e904772d41a616a1b9b30d09802484df6279fe1c3c07f519593948d9493909290916080840191860190808383885b838110156115e55781810151838201526020016115cd565b50505050905090810190601f1680156116125780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a160009550611923565b6000199250600091505b60075482101561184057600780548390811061164c57fe5b9060005260206000200160405160200180828054600181600116156101000203166002900480156116b45780601f106116925761010080835404028352918201916116b4565b820191906000526020600020905b8154815290600101906020018083116116a0575b50509150506040516020818303038152906040526040518082805190602001908083835b602083106116f75780518252601f1990920191602091820191016116d8565b5181516020939093036101000a6000190180199091169216919091179052604051920182900390912093505050508481141561183557600780548390811061173b57fe5b9060005260206000200160006117519190611c28565b600880548390811061175f57fe5b60009182526020822001556007546000190182146118055760078054600019810190811061178957fe5b906000526020600020016007838154811015156117a257fe5b9060005260206000200190805460018160011615610100020316600290046117cb929190611b35565b506008805460001981019081106117de57fe5b90600052602060002001546008838154811015156117f857fe5b6000918252602090912001555b6007805490611818906000198301611c6f565b50600880549061182c906000198301611c98565b50819250611840565b600190910190611634565b60001983141561184f57600080fd5b7f238d74c13cda9ba51e904772d41a616a1b9b30d09802484df6279fe1c3c07f51600360009054906101000a9004600160a060020a031688856040518084600160a060020a0316600160a060020a0316815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b838110156118e35781810151838201526020016118cb565b50505050905090810190601f1680156119105780820380516001836020036101000a031916815260200191505b5094505050505060405180910390a18295505b5050505050919050565b600254600160a060020a03163214806119505750600254600160a060020a031633145b151561195b57600080fd5b600160a060020a038116151561197057600080fd5b60028054600160a060020a031916600160a060020a0392909216919091179055565b60025460009081908190600160a060020a03163214806119bc5750600254600160a060020a031633145b15156119c757600080fd5b5050600d546000190160005b600d54811015610ab05783600160a060020a0316600c828154811015156119f657fe5b600091825260209091200154600160a060020a03161415611b2d57600c805482908110611a1f57fe5b60009182526020909120018054600160a060020a0319169055808214611ac457600c805483908110611a4d57fe5b600091825260209091200154600c8054600160a060020a039092169183908110611a7357fe5b60009182526020909120018054600160a060020a031916600160a060020a0392909216919091179055600c805483908110611aaa57fe5b60009182526020909120018054600160a060020a03191690555b600d829055600160a060020a0384166000818152600e60209081526040918290208054600160a060020a0319169055815192835290517fd41375b9d347dfe722f90a780731abd23b7855f9cf14ea7063c4cab5f9ae58e29281900390910190a160019250610ab5565b6001016119d3565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611b6e5780548555611baa565b82800160010185558215611baa57600052602060002091601f016020900482015b82811115611baa578254825591600101919060010190611b8f565b50611bb6929150611cb8565b5090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10611bfb57805160ff1916838001178555611baa565b82800160010185558215611baa579182015b82811115611baa578251825591602001919060010190611c0d565b50805460018160011615610100020316600290046000825580601f10611c4e5750611c6c565b601f016020900490600052602060002090810190611c6c9190611cb8565b50565b815481835581811115611c9357600083815260209020611c93918101908301611cd2565b505050565b815481835581811115611c9357600083815260209020611c939181019083015b61066091905b80821115611bb65760008155600101611cbe565b61066091905b80821115611bb6576000611cec8282611c28565b50600101611cd85600a165627a7a7230582054f3ab9b1a69787aa723dc356a6f1780d2979f145b915d56ba4f8b96513c71340029"}; module.exports=contract;