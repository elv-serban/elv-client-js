var _toConsumableArray = require("@babel/runtime/helpers/toConsumableArray");

var _typeof = require("@babel/runtime/helpers/typeof");

var _regeneratorRuntime = require("@babel/runtime/regenerator");

var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var _createClass = require("@babel/runtime/helpers/createClass");

if (typeof Buffer === "undefined") {
  Buffer = require("buffer/").Buffer;
}

var URI = require("urijs");

var Ethers = require("ethers");

var AuthorizationClient = require("./AuthorizationClient");

var ElvWallet = require("./ElvWallet");

var EthClient = require("./EthClient");

var UserProfileClient = require("./UserProfileClient");

var HttpClient = require("./HttpClient"); // const ContentObjectVerification = require("./ContentObjectVerification");


var Utils = require("./Utils");

var Crypto = require("./Crypto");

var _require = require("./LogMessage"),
    LogMessage = _require.LogMessage;

var Pako = require("pako");

var _require2 = require("./Validation"),
    ValidatePresence = _require2.ValidatePresence;

if (Utils.Platform() === Utils.PLATFORM_NODE) {
  // Define Response in node
  // eslint-disable-next-line no-global-assign
  global.Response = require("node-fetch").Response;
}
/**
 * See the Modules section on the sidebar for details about methods related to interacting with the Fabric.
 *
 */


var ElvClient =
/*#__PURE__*/
function () {
  "use strict";

  _createClass(ElvClient, [{
    key: "Log",
    value: function Log(message) {
      var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      LogMessage(this, message, error);
    }
    /**
     * Enable or disable verbose logging
     *
     * @methodGroup Miscellaneous
     *
     * @param {boolean} enable - Set logging
     * @param {Object=} options - Additional options for customizing logging
     * - log: custom log() function
     * - error: custom error() function
     * - (custom functions must accept same arguments as console.log/console.error)
     */

  }, {
    key: "ToggleLogging",
    value: function ToggleLogging(enable) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // define func with closure to pass to forEach
      var setDebug = function setDebug(reporter) {
        if (reporter) {
          reporter.debug = enable;
          reporter.debugOptions = options;
        }
      };

      [this, this.authClient, this.ethClient, this.HttpClient, this.userProfileClient].forEach(setDebug);

      if (enable) {
        this.Log("Debug Logging Enabled:\n        Content Space: ".concat(this.contentSpaceId, "\n        Fabric URLs: [\n\t\t").concat(this.fabricURIs.join(", \n\t\t"), "\n\t]\n        Ethereum URLs: [\\n\\t\\t").concat(this.ethereumURIs.join(", \n\t\t"), "\\n\\t]\n        Auth Service URLs: [\\n\\t\\t").concat(this.authServiceURIs.join(", \n\t\t"), "\\n\\t]\n        "));
      }
    }
  }, {
    key: "EnableMethodLogging",
    value: function EnableMethodLogging() {
      var MethodLogger = function MethodLogger(klass) {
        Object.getOwnPropertyNames(Object.getPrototypeOf(klass)).filter(function (method) {
          return typeof klass[method] === "function";
        }).forEach(function (methodName) {
          var originalMethod = klass[methodName].bind(klass);

          if (originalMethod.constructor.name === "AsyncFunction") {
            klass[methodName] = function _callee() {
              var start,
                  _len,
                  args,
                  _key,
                  result,
                  _args = arguments;

              return _regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      start = Date.now();

                      for (_len = _args.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = _args[_key];
                      }

                      _context.next = 4;
                      return _regeneratorRuntime.awrap(originalMethod.apply(void 0, args));

                    case 4:
                      result = _context.sent;
                      // eslint-disable-next-line no-console
                      console.log(methodName, Date.now() - start, "ms", JSON.stringify(args));
                      return _context.abrupt("return", result);

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            };
          } else {
            klass[methodName] = function () {
              var start = Date.now();

              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }

              var result = originalMethod.apply(void 0, args); // eslint-disable-next-line no-console

              console.log(methodName, Date.now() - start, "ms", JSON.stringify(args));
              return result;
            };
          }
        });
      };

      MethodLogger(this);
    }
    /**
     * Create a new ElvClient
     *
     * NOTE: It is highly recommended to use ElvClient.FromConfiguration to
     * automatically import the client settings from the fabric
     *
     * @constructor
     *
     * @namedParams
     * @param {string} contentSpaceId - ID of the content space
     * @param {number} fabricVersion - The version of the target content fabric
     * @param {Array<string>} fabricURIs - A list of full URIs to content fabric nodes
     * @param {Array<string>} ethereumURIs - A list of full URIs to ethereum nodes
     * @param {Array<string>} ethereumURIs - A list of full URIs to auth service endpoints
     * @param {number=} ethereumContractTimeout=10 - Number of seconds to wait for contract calls
     * @param {string=} trustAuthorityId - (OAuth) The ID of the trust authority to use for OAuth authentication
     * @param {string=} staticToken - Static token that will be used for all authorization in place of normal auth
     * @param {boolean=} noCache=false - If enabled, blockchain transactions will not be cached
     * @param {boolean=} noAuth=false - If enabled, blockchain authorization will not be performed
     *
     * @return {ElvClient} - New ElvClient connected to the specified content fabric and blockchain
     */

  }]);

  function ElvClient(_ref) {
    var contentSpaceId = _ref.contentSpaceId,
        fabricVersion = _ref.fabricVersion,
        fabricURIs = _ref.fabricURIs,
        ethereumURIs = _ref.ethereumURIs,
        authServiceURIs = _ref.authServiceURIs,
        _ref$ethereumContract = _ref.ethereumContractTimeout,
        ethereumContractTimeout = _ref$ethereumContract === void 0 ? 10 : _ref$ethereumContract,
        trustAuthorityId = _ref.trustAuthorityId,
        staticToken = _ref.staticToken,
        _ref$noCache = _ref.noCache,
        noCache = _ref$noCache === void 0 ? false : _ref$noCache,
        _ref$noAuth = _ref.noAuth,
        noAuth = _ref$noAuth === void 0 ? false : _ref$noAuth;

    _classCallCheck(this, ElvClient);

    this.utils = Utils;
    this.contentSpaceId = contentSpaceId;
    this.contentSpaceAddress = this.utils.HashToAddress(contentSpaceId);
    this.contentSpaceLibraryId = this.utils.AddressToLibraryId(this.contentSpaceAddress);
    this.contentSpaceObjectId = this.utils.AddressToObjectId(this.contentSpaceAddress);
    this.fabricVersion = fabricVersion;
    this.fabricURIs = fabricURIs;
    this.authServiceURIs = authServiceURIs;
    this.ethereumURIs = ethereumURIs;
    this.ethereumContractTimeout = ethereumContractTimeout;
    this.trustAuthorityId = trustAuthorityId;
    this.noCache = noCache;
    this.noAuth = noAuth;
    this.debug = false;
    this.InitializeClients();

    if (staticToken) {
      this.SetStaticToken({
        token: staticToken
      });
    }
  }
  /**
   * Retrieve content space info and preferred fabric and blockchain URLs from the fabric
   *
   * @methodGroup Constructor
   * @namedParams
   * @param {string} configUrl - Full URL to the config endpoint
   * @param {Array<string>} kmsUrls - List of KMS urls to use for OAuth authentication
   * @param {string=} region - Preferred region - the fabric will auto-detect the best region if not specified
   * - Available regions: na-west-north, na-west-south, na-east, eu-west, eu-east, as-east, au-east
   *
   * @return {Promise<Object>} - Object containing content space ID and fabric and ethereum URLs
   */


  _createClass(ElvClient, [{
    key: "InitializeClients",
    value: function InitializeClients() {
      var _this = this;

      var workingEthURIs;
      return _regeneratorRuntime.async(function InitializeClients$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              // Cached info
              this.contentTypes = {};
              this.encryptionConks = {};
              this.stateChannelAccess = {};
              this.objectLibraryIds = {};
              this.objectImageUrls = {};
              this.visibilityInfo = {};
              this.inaccessibleLibraries = {};
              this.HttpClient = new HttpClient({
                uris: this.fabricURIs,
                debug: this.debug
              });
              this.AuthHttpClient = new HttpClient({
                uris: this.authServiceURIs,
                debug: this.debug
              });
              this.ethClient = new EthClient({
                client: this,
                uris: this.ethereumURIs,
                debug: this.debug,
                timeout: this.ethereumContractTimeout
              });
              this.authClient = new AuthorizationClient({
                client: this,
                contentSpaceId: this.contentSpaceId,
                signer: this.signer,
                noCache: this.noCache,
                noAuth: this.noAuth,
                debug: this.debug
              });
              this.userProfileClient = new UserProfileClient({
                client: this,
                debug: this.debug
              }); // Initialize crypto wasm

              this.Crypto = Crypto;
              this.Crypto.ElvCrypto(); // Test each eth url

              _context3.next = 16;
              return _regeneratorRuntime.awrap(Promise.all(this.ethereumURIs.map(function _callee2(uri) {
                var response;
                return _regeneratorRuntime.async(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _regeneratorRuntime.awrap(Promise.race([HttpClient.Fetch(uri, {
                          method: "post",
                          headers: {
                            "Content-Type": "application/json"
                          },
                          body: JSON.stringify({
                            method: "net_version",
                            params: [],
                            id: 1,
                            jsonrpc: "2.0"
                          })
                        }), new Promise(function (resolve) {
                          return setTimeout(function () {
                            return resolve({
                              ok: false
                            });
                          }, 5000);
                        })]));

                      case 3:
                        response = _context2.sent;

                        if (!response.ok) {
                          _context2.next = 6;
                          break;
                        }

                        return _context2.abrupt("return", uri);

                      case 6:
                        // eslint-disable-next-line no-console
                        _this.Log("Eth node unavailable: " + uri, true);

                        _context2.next = 13;
                        break;

                      case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2["catch"](0);

                        // eslint-disable-next-line no-console
                        _this.Log("Eth node unavailable: " + uri, true); // eslint-disable-next-line no-console


                        _this.Log(_context2.t0, true);

                      case 13:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, null, null, [[0, 9]]);
              })));

            case 16:
              _context3.t0 = function (uri) {
                return uri;
              };

              workingEthURIs = _context3.sent.filter(_context3.t0);

              // If any eth urls are bad, discard them
              if (workingEthURIs.length !== this.ethereumURIs.length) {
                this.ethereumURIs = workingEthURIs;
                this.ethClient.SetEthereumURIs(workingEthURIs);
              }

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "ConfigUrl",
    value: function ConfigUrl() {
      return this.configUrl;
    }
  }, {
    key: "SetAuth",
    value: function SetAuth(auth) {
      this.noAuth = !auth;
      this.authClient.noAuth = !auth;
    }
    /**
     * Update fabric URLs to prefer the specified region.
     *
     * Note: Client must have been initialized with FromConfiguration
     *
     * @methodGroup Nodes
     * @namedParams
     * @param {string} region - Preferred region - the fabric will auto-detect the best region if not specified
     * - Available regions: na-west-north, na-west-south, na-east, eu-west, eu-east, as-east, au-east
     *
     * @return {Promise<Object>} - An object containing the updated fabric and ethereum URLs in order of preference
     */

  }, {
    key: "UseRegion",
    value: function UseRegion(_ref2) {
      var region, _ref3, fabricURIs, ethereumURIs, authServiceURIs;

      return _regeneratorRuntime.async(function UseRegion$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              region = _ref2.region;

              if (this.configUrl) {
                _context4.next = 3;
                break;
              }

              throw Error("Unable to change region: Configuration URL not set");

            case 3:
              _context4.next = 5;
              return _regeneratorRuntime.awrap(ElvClient.Configuration({
                configUrl: this.configUrl,
                region: region
              }));

            case 5:
              _ref3 = _context4.sent;
              fabricURIs = _ref3.fabricURIs;
              ethereumURIs = _ref3.ethereumURIs;
              authServiceURIs = _ref3.authServiceURIs;
              this.authServiceURIs = authServiceURIs;
              this.fabricURIs = fabricURIs;
              this.ethereumURIs = ethereumURIs;
              this.HttpClient.uris = fabricURIs;
              this.HttpClient.uriIndex = 0;
              this.ethClient.ethereumURIs = ethereumURIs;
              this.ethClient.ethereumURIIndex = 0;
              return _context4.abrupt("return", {
                fabricURIs: fabricURIs,
                ethereumURIs: ethereumURIs
              });

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
    /**
     * Reset fabric URLs to prefer the best region auto-detected by the fabric.
     *
     * Note: Client must have been initialized with FromConfiguration
     *
     * @methodGroup Nodes
     *
     * @return {Promise<Object>} - An object containing the updated fabric and ethereum URLs in order of preference
     */

  }, {
    key: "ResetRegion",
    value: function ResetRegion() {
      return _regeneratorRuntime.async(function ResetRegion$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (this.configUrl) {
                _context5.next = 2;
                break;
              }

              throw Error("Unable to change region: Configuration URL not set");

            case 2:
              _context5.next = 4;
              return _regeneratorRuntime.awrap(this.UseRegion({
                region: ""
              }));

            case 4:
              return _context5.abrupt("return", _context5.sent);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
    /**
     * Retrieve the node ID reported by the fabric for the specified region
     *
     * Note: Client must have been initialized with FromConfiguration
     *
     * @methodGroup Nodes
     *
     * @namedParams
     * @param {string} region - Region from which to retrieve the node ID
     *
     * @return {Promise<string>} - The node ID reported by the fabric
     */

  }, {
    key: "NodeId",
    value: function NodeId(_ref4) {
      var region, _ref5, nodeId;

      return _regeneratorRuntime.async(function NodeId$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              region = _ref4.region;
              _context6.next = 3;
              return _regeneratorRuntime.awrap(ElvClient.Configuration({
                configUrl: this.configUrl,
                region: region
              }));

            case 3:
              _ref5 = _context6.sent;
              nodeId = _ref5.nodeId;
              return _context6.abrupt("return", nodeId);

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
    /**
     * Retrieve the fabric and ethereum nodes currently used by the client, in preference order
     *
     * @methodGroup Nodes
     *
     * @return {Promise<Object>} - An object containing the lists of fabric and ethereum urls in use by the client
     */

  }, {
    key: "Nodes",
    value: function Nodes() {
      return {
        fabricURIs: this.fabricURIs,
        ethereumURIs: this.ethereumURIs,
        authServiceURIs: this.authServiceURIs
      };
    }
    /**
     * Set the client to use the specified fabric and ethereum nodes, in preference order
     *
     * @namedParams
     * @param {Array<string>=} fabricURIs - A list of URLs for the fabric, in preference order
     * @param {Array<string>=} ethereumURIs - A list of URLs for the blockchain, in preference order
     * @param {Array<string>=} authServiceURIs - A list of URLs for the auth service, in preference order
     *
     * @methodGroup Nodes
     */

  }, {
    key: "SetNodes",
    value: function SetNodes(_ref6) {
      var fabricURIs = _ref6.fabricURIs,
          ethereumURIs = _ref6.ethereumURIs,
          authServiceURIs = _ref6.authServiceURIs;

      if (fabricURIs) {
        this.fabricURIs = fabricURIs;
        this.HttpClient.uris = fabricURIs;
        this.HttpClient.uriIndex = 0;
      }

      if (ethereumURIs) {
        this.ethereumURIs = ethereumURIs;
        this.ethClient.ethereumURIs = ethereumURIs;
        this.ethClient.ethereumURIIndex = 0;
      }

      if (authServiceURIs) {
        this.authServiceURIs = authServiceURIs;
        this.AuthHttpClient.uris = authServiceURIs;
        this.AuthHttpClient.uriIndex = 0;
      }
    }
    /* Wallet and signers */

    /**
     * Generate a new ElvWallet that is connected to the client's provider
     *
     * @methodGroup Signers
     * @returns {ElvWallet} - ElvWallet instance with this client's provider
     */

  }, {
    key: "GenerateWallet",
    value: function GenerateWallet() {
      return new ElvWallet(this.ethClient.Provider());
    }
    /**
     * Remove the signer from this client
     *
     * @methodGroup Signers
     */

  }, {
    key: "ClearSigner",
    value: function ClearSigner() {
      this.signer = undefined;
      this.InitializeClients();
    }
    /**
     * Clear saved access and state channel tokens
     *
     * @methodGroup Access Requests
     */

  }, {
    key: "ClearCache",
    value: function ClearCache() {
      this.authClient.ClearCache();
    }
    /**
     * Set the signer for this client to use for blockchain transactions
     *
     * @methodGroup Signers
     * @namedParams
     * @param {object} signer - The ethers.js signer object
     */

  }, {
    key: "SetSigner",
    value: function SetSigner(_ref7) {
      var signer = _ref7.signer;
      signer.connect(this.ethClient.Provider());
      signer.provider.pollingInterval = 500;
      this.signer = signer;
      this.InitializeClients();
    }
    /**
     * Set the signer for this client to use for blockchain transactions from an existing web3 provider.
     * Useful for integrating with MetaMask
     *
     * @see https://github.com/ethers-io/ethers.js/issues/59#issuecomment-358224800
     *
     * @methodGroup Signers
     * @namedParams
     * @param {object} provider - The web3 provider object
     */

  }, {
    key: "SetSignerFromWeb3Provider",
    value: function SetSignerFromWeb3Provider(_ref8) {
      var provider, ethProvider;
      return _regeneratorRuntime.async(function SetSignerFromWeb3Provider$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              provider = _ref8.provider;
              ethProvider = new Ethers.providers.Web3Provider(provider);
              ethProvider.pollingInterval = 250;
              this.signer = ethProvider.getSigner();
              _context7.next = 6;
              return _regeneratorRuntime.awrap(this.signer.getAddress());

            case 6:
              this.signer.address = _context7.sent;
              _context7.next = 9;
              return _regeneratorRuntime.awrap(this.InitializeClients());

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
    /**
     * Issue a self-signed authorization token
     *
     * @methodGroup Authorization
     * @namedParams
     * @param {string=} libraryId - Library ID to authorize
     * @param {string=} objectId - Object ID to authorize
     * @param {string=} versionHash - Version hash to authorize
     * @param {string=} policyId - The object ID of the policy for this token
     * @param {string=} subject - The subject of the token
     * @param {string} grantType=read - Permissions to grant for this token. Options: "access", "read", "create", "update", "read-crypt"
     * @param {number} duration - Time until the token expires, in milliseconds (1 hour = 60 * 60 * 1000)
     * @param {boolean} allowDecryption=false - If specified, the re-encryption key will be included in the token,
     * enabling the user of this token to download encrypted content from the specified object
     * @param {Object=} context - Additional JSON context
     */

  }, {
    key: "CreateSignedToken",
    value: function CreateSignedToken(_ref9) {
      var libraryId, objectId, versionHash, policyId, subject, _ref9$grantType, grantType, _ref9$allowDecryption, allowDecryption, duration, _ref9$context, context, token, cap, compressedToken, signature;

      return _regeneratorRuntime.async(function CreateSignedToken$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              libraryId = _ref9.libraryId, objectId = _ref9.objectId, versionHash = _ref9.versionHash, policyId = _ref9.policyId, subject = _ref9.subject, _ref9$grantType = _ref9.grantType, grantType = _ref9$grantType === void 0 ? "read" : _ref9$grantType, _ref9$allowDecryption = _ref9.allowDecryption, allowDecryption = _ref9$allowDecryption === void 0 ? false : _ref9$allowDecryption, duration = _ref9.duration, _ref9$context = _ref9.context, context = _ref9$context === void 0 ? {} : _ref9$context;

              if (subject) {
                _context8.next = 9;
                break;
              }

              _context8.t0 = "iusr";
              _context8.t1 = this.utils;
              _context8.next = 6;
              return _regeneratorRuntime.awrap(this.CurrentAccountAddress());

            case 6:
              _context8.t2 = _context8.sent;
              _context8.t3 = _context8.t1.AddressToHash.call(_context8.t1, _context8.t2);
              subject = _context8.t0.concat.call(_context8.t0, _context8.t3);

            case 9:
              if (policyId) {
                context["elv:delegation-id"] = policyId;
              }

              _context8.t4 = Buffer;
              _context8.next = 13;
              return _regeneratorRuntime.awrap(this.CurrentAccountAddress().replace(/^0x/, ""));

            case 13:
              _context8.t5 = _context8.sent;
              _context8.t6 = _context8.t4.from.call(_context8.t4, _context8.t5, "hex").toString("base64");
              _context8.t7 = subject;
              _context8.next = 18;
              return _regeneratorRuntime.awrap(this.ContentSpaceId());

            case 18:
              _context8.t8 = _context8.sent;
              _context8.t9 = Date.now();
              _context8.t10 = Date.now() + duration;
              _context8.t11 = grantType;
              _context8.t12 = context;
              token = {
                adr: _context8.t6,
                sub: _context8.t7,
                spc: _context8.t8,
                iat: _context8.t9,
                exp: _context8.t10,
                gra: _context8.t11,
                ctx: _context8.t12
              };

              if (versionHash) {
                objectId = this.utils.DecodeVersionHash(versionHash).objectId;
              }

              if (!objectId) {
                _context8.next = 31;
                break;
              }

              token.qid = objectId;

              if (libraryId) {
                _context8.next = 31;
                break;
              }

              _context8.next = 30;
              return _regeneratorRuntime.awrap(this.ContentObjectLibraryId({
                objectId: objectId
              }));

            case 30:
              libraryId = _context8.sent;

            case 31:
              if (libraryId) {
                token.lib = libraryId;
              }

              if (!allowDecryption) {
                _context8.next = 37;
                break;
              }

              _context8.next = 35;
              return _regeneratorRuntime.awrap(this.authClient.ReEncryptionConk({
                libraryId: libraryId,
                objectId: objectId
              }));

            case 35:
              cap = _context8.sent;
              token.apk = cap.public_key;

            case 37:
              compressedToken = Pako.deflateRaw(Buffer.from(JSON.stringify(token), "utf-8"));
              _context8.next = 40;
              return _regeneratorRuntime.awrap(this.authClient.Sign(Ethers.utils.keccak256(compressedToken)));

            case 40:
              signature = _context8.sent;
              return _context8.abrupt("return", "aessjc".concat(this.utils.B58(Buffer.concat([Buffer.from(signature.replace(/^0x/, ""), "hex"), Buffer.from(compressedToken)]))));

            case 42:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
    /**
     * Get the account address of the current signer
     *
     * @methodGroup Signers
     * @returns {string} - The address of the current signer
     */

  }, {
    key: "CurrentAccountAddress",
    value: function CurrentAccountAddress() {
      return this.signer ? this.utils.FormatAddress(this.signer.address) : "";
    }
    /**
     * Set the OAuth token for use in state channel calls
     *
     * @methodGroup Authorization
     * @namedParams
     * @param {string} token - The OAuth ID token
     */

  }, {
    key: "SetOauthToken",
    value: function SetOauthToken(_ref10) {
      var token, wallet, signer;
      return _regeneratorRuntime.async(function SetOauthToken$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              token = _ref10.token;
              this.oauthToken = token;
              wallet = this.GenerateWallet();
              signer = wallet.AddAccountFromMnemonic({
                mnemonic: wallet.GenerateMnemonic()
              });
              this.SetSigner({
                signer: signer
              });

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
    /**
     * Set the signer for this client via OAuth token. The client will exchange the given token
     * for the user's private key using the KMS specified in the configuration.
     *
     * NOTE: The KMS URL(s) must be set in the initial configuration of the client (FromConfigurationUrl)
     *
     * @methodGroup Authorization
     * @namedParams
     * @param {string} token - The OAuth ID
     */

  }, {
    key: "SetSignerFromOauthToken",
    value: function SetSignerFromOauthToken(_ref11) {
      var token, wallet, client, _ref12, urls, path, httpClient, response, privateKey;

      return _regeneratorRuntime.async(function SetSignerFromOauthToken$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              token = _ref11.token;

              if (this.trustAuthorityId) {
                _context10.next = 3;
                break;
              }

              throw Error("Unable to authorize with OAuth token: No trust authority ID set");

            case 3:
              wallet = this.GenerateWallet();
              _context10.prev = 4;

              if (this.kmsURIs) {
                _context10.next = 17;
                break;
              }

              _context10.next = 8;
              return _regeneratorRuntime.awrap(ElvClient.FromConfigurationUrl({
                configUrl: this.configUrl
              }));

            case 8:
              client = _context10.sent;
              client.SetSigner({
                signer: wallet.AddAccountFromMnemonic({
                  mnemonic: wallet.GenerateMnemonic()
                })
              });
              _context10.next = 12;
              return _regeneratorRuntime.awrap(client.authClient.KMSInfo({
                kmsId: this.trustAuthorityId
              }));

            case 12:
              _ref12 = _context10.sent;
              urls = _ref12.urls;

              if (!(!urls || urls.length === 0)) {
                _context10.next = 16;
                break;
              }

              throw Error("Unable to authorize with OAuth token: No KMS URLs set");

            case 16:
              this.kmsURIs = urls;

            case 17:
              this.oauthToken = token;
              path = "/ks/jwt/wlt";
              httpClient = new HttpClient({
                uris: this.kmsURIs,
                debug: this.debug
              });
              _context10.next = 22;
              return _regeneratorRuntime.awrap(this.utils.ResponseToJson(httpClient.Request({
                headers: {
                  Authorization: "Bearer ".concat(token)
                },
                method: "PUT",
                path: path,
                forceFailover: true
              })));

            case 22:
              response = _context10.sent;
              privateKey = response["UserSKHex"];
              this.SetSigner({
                signer: wallet.AddAccount({
                  privateKey: privateKey
                })
              }); // Ensure wallet is initialized

              _context10.next = 27;
              return _regeneratorRuntime.awrap(this.userProfileClient.WalletAddress());

            case 27:
              _context10.next = 36;
              break;

            case 29:
              _context10.prev = 29;
              _context10.t0 = _context10["catch"](4);
              this.Log("Failed to set signer from OAuth token:", true);
              this.Log(_context10.t0, true);
              _context10.next = 35;
              return _regeneratorRuntime.awrap(this.ClearSigner());

            case 35:
              throw _context10.t0;

            case 36:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this, [[4, 29]]);
    }
    /**
     * Set a static token for the client to use for all authorization
     *
     * @methodGroup Authorization
     * @namedParams
     * @param {string} token - The static token to use
     */

  }, {
    key: "SetStaticToken",
    value: function SetStaticToken(_ref13) {
      var token = _ref13.token;
      this.staticToken = token;

      if (!this.signer) {
        var wallet = this.GenerateWallet();
        var signer = wallet.AddAccountFromMnemonic({
          mnemonic: wallet.GenerateMnemonic()
        });
        this.SetSigner({
          signer: signer
        });
      }
    }
    /**
     * Authorize the client against the specified policy.
     *
     * NOTE: After authorizing, the client will only be able to access content allowed by the policy
     *
     * @methodGroup Authorization
     * @namedParams
     * @param {string} objectId - The ID of the policy object
     */

  }, {
    key: "SetPolicyAuthorization",
    value: function SetPolicyAuthorization(_ref14) {
      var objectId;
      return _regeneratorRuntime.async(function SetPolicyAuthorization$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              objectId = _ref14.objectId;
              _context11.t0 = this;
              _context11.next = 4;
              return _regeneratorRuntime.awrap(this.GenerateStateChannelToken({
                objectId: objectId
              }));

            case 4:
              _context11.t1 = _context11.sent;
              _context11.t2 = {
                token: _context11.t1
              };

              _context11.t0.SetStaticToken.call(_context11.t0, _context11.t2);

            case 7:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    }
    /**
     * Encrypt the given string or object with the current signer's public key
     *
     * @namedParams
     * @param {string | Object} message - The string or object to encrypt
     * @param {string=} publicKey - If specified, message will be encrypted with this public key instead of the current user's
     *
     * @return {Promise<string>} - The encrypted message
     */

  }, {
    key: "EncryptECIES",
    value: function EncryptECIES(_ref15) {
      var message, publicKey;
      return _regeneratorRuntime.async(function EncryptECIES$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              message = _ref15.message, publicKey = _ref15.publicKey;

              if (this.signer) {
                _context12.next = 3;
                break;
              }

              throw "Signer not set";

            case 3:
              ValidatePresence("message", message);
              _context12.next = 6;
              return _regeneratorRuntime.awrap(this.Crypto.EncryptConk(message, publicKey || this.signer.signingKey.keyPair.publicKey));

            case 6:
              return _context12.abrupt("return", _context12.sent);

            case 7:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    }
    /**
     * Decrypt the given encrypted message with the current signer's private key
     *
     * @namedParams
     * @param {string} message - The message to decrypt
     *
     * @return {Promise<string | Object>} - The decrypted string or object
     */

  }, {
    key: "DecryptECIES",
    value: function DecryptECIES(_ref16) {
      var message;
      return _regeneratorRuntime.async(function DecryptECIES$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              message = _ref16.message;

              if (this.signer) {
                _context13.next = 3;
                break;
              }

              throw "Signer not set";

            case 3:
              ValidatePresence("message", message);
              _context13.next = 6;
              return _regeneratorRuntime.awrap(this.Crypto.DecryptCap(message, this.signer.signingKey.privateKey));

            case 6:
              return _context13.abrupt("return", _context13.sent);

            case 7:
            case "end":
              return _context13.stop();
          }
        }
      }, null, this);
    }
    /**
     * Request the specified URL with the given method and body, and return the result in the specified format
     *
     * @param {string} url - URL to request
     * @param {string=} format="json" - Format of response
     * @param {string=} method="GET" - Request method
     * @param {object=} body - Request body
     * @param {object=} headers - Request headers
     *
     * @return {Promise<*>} - Response in the specified format
     */

  }, {
    key: "Request",
    value: function Request(_ref17) {
      var url = _ref17.url,
          _ref17$format = _ref17.format,
          format = _ref17$format === void 0 ? "json" : _ref17$format,
          _ref17$method = _ref17.method,
          method = _ref17$method === void 0 ? "GET" : _ref17$method,
          _ref17$headers = _ref17.headers,
          headers = _ref17$headers === void 0 ? {} : _ref17$headers,
          body = _ref17.body;
      return this.utils.ResponseToFormat(format, HttpClient.Fetch(url, {
        method: method,
        headers: headers,
        body: body
      }));
    }
    /* FrameClient related */
    // Whitelist of methods allowed to be called using the frame API

  }, {
    key: "FrameAllowedMethods",
    value: function FrameAllowedMethods() {
      var _this2 = this;

      var forbiddenMethods = ["constructor", "AccessGroupMembershipMethod", "CallFromFrameMessage", "ClearSigner", "EnableMethodLogging", "FormatBlockNumbers", "FrameAllowedMethods", "FromConfigurationUrl", "GenerateWallet", "InitializeClients", "Log", "SetSigner", "SetSignerFromWeb3Provider", "ToggleLogging"];
      return Object.getOwnPropertyNames(Object.getPrototypeOf(this)).filter(function (method) {
        return typeof _this2[method] === "function" && !forbiddenMethods.includes(method);
      });
    } // Call a method specified in a message from a frame

  }, {
    key: "CallFromFrameMessage",
    value: function CallFromFrameMessage(message, Respond) {
      var _this3 = this;

      var callback, method, methodResults, responseError;
      return _regeneratorRuntime.async(function CallFromFrameMessage$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (!(message.type !== "ElvFrameRequest")) {
                _context14.next = 2;
                break;
              }

              return _context14.abrupt("return");

            case 2:
              if (message.callbackId) {
                callback = function callback(result) {
                  Respond(_this3.utils.MakeClonable({
                    type: "ElvFrameResponse",
                    requestId: message.callbackId,
                    response: result
                  }));
                };

                message.args.callback = callback;
              }

              _context14.prev = 3;
              method = message.calledMethod;

              if (!(message.module === "userProfileClient")) {
                _context14.next = 13;
                break;
              }

              if (this.userProfileClient.FrameAllowedMethods().includes(method)) {
                _context14.next = 8;
                break;
              }

              throw Error("Invalid user profile method: " + method);

            case 8:
              _context14.next = 10;
              return _regeneratorRuntime.awrap(this.userProfileClient[method](message.args));

            case 10:
              methodResults = _context14.sent;
              _context14.next = 18;
              break;

            case 13:
              if (this.FrameAllowedMethods().includes(method)) {
                _context14.next = 15;
                break;
              }

              throw Error("Invalid method: " + method);

            case 15:
              _context14.next = 17;
              return _regeneratorRuntime.awrap(this[method](message.args));

            case 17:
              methodResults = _context14.sent;

            case 18:
              Respond(this.utils.MakeClonable({
                type: "ElvFrameResponse",
                requestId: message.requestId,
                response: methodResults
              }));
              _context14.next = 27;
              break;

            case 21:
              _context14.prev = 21;
              _context14.t0 = _context14["catch"](3);
              // eslint-disable-next-line no-console
              this.Log("Frame Message Error:\n        Method: ".concat(message.calledMethod, "\n        Arguments: ").concat(JSON.stringify(message.args, null, 2), "\n        Error: ").concat(_typeof(_context14.t0) === "object" ? JSON.stringify(_context14.t0, null, 2) : _context14.t0), true); // eslint-disable-next-line no-console

              console.error(_context14.t0);
              responseError = _context14.t0 instanceof Error ? _context14.t0.message : _context14.t0;
              Respond(this.utils.MakeClonable({
                type: "ElvFrameResponse",
                requestId: message.requestId,
                error: responseError
              }));

            case 27:
            case "end":
              return _context14.stop();
          }
        }
      }, null, this, [[3, 21]]);
    }
  }], [{
    key: "Configuration",
    value: function Configuration(_ref18) {
      var configUrl, _ref18$kmsUrls, kmsUrls, region, uri, fabricInfo, filterHTTPS, fabricURIs, ethereumURIs, authServiceURIs, fabricVersion;

      return _regeneratorRuntime.async(function Configuration$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              configUrl = _ref18.configUrl, _ref18$kmsUrls = _ref18.kmsUrls, kmsUrls = _ref18$kmsUrls === void 0 ? [] : _ref18$kmsUrls, region = _ref18.region;
              _context15.prev = 1;
              uri = new URI(configUrl);

              if (region) {
                uri.addSearch("elvgeo", region);
              }

              _context15.next = 6;
              return _regeneratorRuntime.awrap(Utils.ResponseToJson(HttpClient.Fetch(uri.toString())));

            case 6:
              fabricInfo = _context15.sent;

              // If any HTTPS urls present, throw away HTTP urls so only HTTPS will be used
              filterHTTPS = function filterHTTPS(uri) {
                return uri.toLowerCase().startsWith("https");
              };

              fabricURIs = fabricInfo.network.services.fabric_api;

              if (fabricURIs.find(filterHTTPS)) {
                fabricURIs = fabricURIs.filter(filterHTTPS);
              }

              ethereumURIs = fabricInfo.network.services.ethereum_api;

              if (ethereumURIs.find(filterHTTPS)) {
                ethereumURIs = ethereumURIs.filter(filterHTTPS);
              }

              authServiceURIs = fabricInfo.network.services.authority_service || [];

              if (authServiceURIs.find(filterHTTPS)) {
                authServiceURIs = authServiceURIs.filter(filterHTTPS);
              }

              fabricVersion = Math.max.apply(Math, _toConsumableArray(fabricInfo.network.api_versions || [2]));
              return _context15.abrupt("return", {
                nodeId: fabricInfo.node_id,
                contentSpaceId: fabricInfo.qspace.id,
                fabricURIs: fabricURIs,
                ethereumURIs: ethereumURIs,
                authServiceURIs: authServiceURIs,
                kmsURIs: kmsUrls,
                fabricVersion: fabricVersion
              });

            case 18:
              _context15.prev = 18;
              _context15.t0 = _context15["catch"](1);
              // eslint-disable-next-line no-console
              console.error("Error retrieving fabric configuration:"); // eslint-disable-next-line no-console

              console.error(_context15.t0);
              throw _context15.t0;

            case 23:
            case "end":
              return _context15.stop();
          }
        }
      }, null, null, [[1, 18]]);
    }
    /**
     * Create a new ElvClient from the specified configuration URL
     *
     * @methodGroup Constructor
     * @namedParams
     * @param {string} configUrl - Full URL to the config endpoint
     * @param {string=} region - Preferred region - the fabric will auto-detect the best region if not specified
     * - Available regions: na-west-north, na-west-south, na-east, eu-west, eu-east, as-east, au-east
     * @param {string=} trustAuthorityId - (OAuth) The ID of the trust authority to use for OAuth authentication   * @param {boolean=} noCache=false - If enabled, blockchain transactions will not be cached
     * @param {string=} staticToken - Static token that will be used for all authorization in place of normal auth
     * @param {number=} ethereumContractTimeout=10 - Number of seconds to wait for contract calls
     * @param {boolean=} noAuth=false - If enabled, blockchain authorization will not be performed
     *
     * @return {Promise<ElvClient>} - New ElvClient connected to the specified content fabric and blockchain
     */

  }, {
    key: "FromConfigurationUrl",
    value: function FromConfigurationUrl(_ref19) {
      var configUrl, region, trustAuthorityId, staticToken, _ref19$ethereumContra, ethereumContractTimeout, _ref19$noCache, noCache, _ref19$noAuth, noAuth, _ref20, contentSpaceId, fabricURIs, ethereumURIs, authServiceURIs, fabricVersion, client;

      return _regeneratorRuntime.async(function FromConfigurationUrl$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              configUrl = _ref19.configUrl, region = _ref19.region, trustAuthorityId = _ref19.trustAuthorityId, staticToken = _ref19.staticToken, _ref19$ethereumContra = _ref19.ethereumContractTimeout, ethereumContractTimeout = _ref19$ethereumContra === void 0 ? 10 : _ref19$ethereumContra, _ref19$noCache = _ref19.noCache, noCache = _ref19$noCache === void 0 ? false : _ref19$noCache, _ref19$noAuth = _ref19.noAuth, noAuth = _ref19$noAuth === void 0 ? false : _ref19$noAuth;
              _context16.next = 3;
              return _regeneratorRuntime.awrap(ElvClient.Configuration({
                configUrl: configUrl,
                region: region
              }));

            case 3:
              _ref20 = _context16.sent;
              contentSpaceId = _ref20.contentSpaceId;
              fabricURIs = _ref20.fabricURIs;
              ethereumURIs = _ref20.ethereumURIs;
              authServiceURIs = _ref20.authServiceURIs;
              fabricVersion = _ref20.fabricVersion;
              client = new ElvClient({
                contentSpaceId: contentSpaceId,
                fabricVersion: fabricVersion,
                fabricURIs: fabricURIs,
                ethereumURIs: ethereumURIs,
                authServiceURIs: authServiceURIs,
                ethereumContractTimeout: ethereumContractTimeout,
                trustAuthorityId: trustAuthorityId,
                staticToken: staticToken,
                noCache: noCache,
                noAuth: noAuth
              });
              client.configUrl = configUrl;
              return _context16.abrupt("return", client);

            case 12:
            case "end":
              return _context16.stop();
          }
        }
      });
    }
  }]);

  return ElvClient;
}();

Object.assign(ElvClient.prototype, require("./client/AccessGroups"));
Object.assign(ElvClient.prototype, require("./client/ContentAccess"));
Object.assign(ElvClient.prototype, require("./client/Contracts"));
Object.assign(ElvClient.prototype, require("./client/Files"));
Object.assign(ElvClient.prototype, require("./client/ABRPublishing"));
Object.assign(ElvClient.prototype, require("./client/ContentManagement"));
Object.assign(ElvClient.prototype, require("./client/NTP"));
exports.ElvClient = ElvClient;