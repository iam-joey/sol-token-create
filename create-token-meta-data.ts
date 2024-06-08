import { getExplorerLink,getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
    Connection,
    clusterApiUrl,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
  } from "@solana/web3.js";
  import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";
  import "dotenv/config";

const user=getKeypairFromEnvironment("SECRET_KEY");

const connection=new Connection(clusterApiUrl("devnet"),"confirmed");

console.log(
    `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
  );

  const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
  );
  


const tokenMint=new PublicKey("H4uice94NidnGMNFMhJdq4YiB8MhvYEz3pp4MPMUxLpd")

const metadataData = {
    name: "RamaSwamy Weds Anjali Token",
    symbol: "WEDDING",
    uri: "https://arweave.net/1234",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  };

const [metaDataPda,seedBump]=PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMint.toBuffer()
    ],
    TOKEN_METADATA_PROGRAM_ID
)


const transaction=new Transaction();

const createMetadataAccountInstruction=createCreateMetadataAccountV3Instruction(
    {
        metadata:metaDataPda,
        mint:tokenMint,
        mintAuthority:user.publicKey,
        payer:user.publicKey,
        updateAuthority:user.publicKey
    },
    {
        createMetadataAccountArgsV3: {
            collectionDetails: null,
            data: metadataData,
            isMutable: true,
          },
    }
)


transaction.add(createMetadataAccountInstruction);

const transactionSignature=await sendAndConfirmTransaction(
    connection,
    transaction,
    [user]
)


const transactionLink = getExplorerLink(
    "transaction",
    transactionSignature,
    "devnet"
  );

  console.log(`✅ Transaction confirmed, explorer link is: ${transactionLink}!`);

const tokenMintLink = getExplorerLink(
  "address",
  tokenMint.toString(),
  "devnet"
);

console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);