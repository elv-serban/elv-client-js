/**
 * ClientSignedTokenXco
 *
 * Create a client-signed-token using a cross-chain oracle signed message (xco_msg) and
 * access fabric resources.
 */

const { ElvClient } = require("../../src/ElvClient");
const Utils = require("../../src/Utils");

const networkName = "demo"; // "main" or "demo"

const sampleXcMsg = {
  chain: 'eip155:955305',
  contract_addr: '0xd4c8153372b0292b364dac40d0ade37da4c4869a',
  id: 1,
  method: 'balanceOf',
  params: {
    owner: '0xcd8323da264e9c599af47a0d559dcdcb335d44ab'
  }
};

const Setup = async () => {

  client = await ElvClient.FromNetworkName({networkName});
  let wallet = client.GenerateWallet();
  let signer = wallet.AddAccount({
    privateKey: process.env.PRIVATE_KEY
  });
  client.SetSigner({signer});
  client.ToggleLogging(false);

  // Overwrite auth service endpoints (until the cross-chain feture is fully deployed)
  //client.authServiceURIs = ["http://127.0.0.1:6546"];  // Dev instance
  client.authServiceURIs = ["https://host-216-66-89-94.contentfabric.io/as"]
  client.AuthHttpClient.uris = client.authServiceURIs;

  return client;
}

/**
 * Make a cross-chain oracle call
 */
const XcoMessage = async ({msg}) => {

  // Create a client-signed-token in order to access the cross-chain oracle API
  const token = await client.CreateFabricToken({
	  duration: 60 * 60 * 1000, // millisec
  });

  // Call the cross-chain oracle 'view' API
  let res = await Utils.ResponseToFormat(
    "json",
    client.authClient.MakeAuthServiceRequest({
      method: "POST",
      path: "/as/xco/view",  // On main/dev net /as/xco/view
      body: msg,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  return res;
}

/**
 * Retrieve playout URLs
 */
const Play = async ({token}) => {
  const contentHash = "hq__93SK4rgxMarq1ZeDSEu9WJkDoptTKYiA2GmYocK7inMthUssGkG6Q9BREBEhNtVCiCBFsPd4Gd";

  client.SetStaticToken({ token });

  // First retrieve title metadata (title, synopsis, cast, ...)
  let meta = await client.ContentObjectMetadata({
    versionHash: contentHash,
    metadataSubtree: "/public/asset_metadata"
  });
  console.log("META", meta);

  // Retrieve playout info (DASH and HLS URLs)
  let res = await client.PlayoutOptions({
    versionHash: contentHash,
    drms: ["clear", "aes-128", "fairplay", "widevine"]
  });

  return res;
}

const Run = async () => {

  client = await Setup();

  // Call the oracle cross-chain 'view' API 'balanceOf'
  let xcMsg = await XcoMessage({msg: sampleXcMsg});
  console.log("XCO MSG", JSON.stringify(xcMsg));

  // Create a client-signed-token including the 'xco-msg' as context
  const accessToken = await client.CreateFabricToken({
	  duration: 60 * 60 * 1000, // millisec
    spec: {
      ctx : {
        xco_msg: xcMsg.xco_msg
      }
    }
  });
  console.log("TOKEN", accessToken);

  // Play
  let playoutOptions = await Play({token: accessToken});
  console.log("PLAYOUT", JSON.stringify(playoutOptions, null, 2));
}

if (!process.env.PRIVATE_KEY) {
  console.log("Must set environment variable PRIVATE_KEY");
  exit;
}

Run();
