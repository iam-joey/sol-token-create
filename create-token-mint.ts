import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from "@solana-developers/helpers";
import { createMint } from "@solana/spl-token";
import { clusterApiUrl, Connection } from "@solana/web3.js";

import "dotenv/config";

//first establish the connection to the devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

//now load the secret_key from the .env file;

const user = getKeypairFromEnvironment("SECRET_KEY");

console.log("Key loaded", user.publicKey.toBase58());

//now let's create a token mint;

const tokenMintAddress = await createMint(
  connection,
  user,
  user.publicKey,
  null,
  2
);

const link = getExplorerLink("address", tokenMintAddress.toString(), "devnet");

console.log(`click here to check in the explorer ${link}`);
