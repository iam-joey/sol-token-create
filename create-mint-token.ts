
import {clusterApiUrl, Connection,LAMPORTS_PER_SOL,PublicKey} from "@solana/web3.js"
import { getKeypairFromEnvironment } from "@solana-developers/helpers"
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import "dotenv/config";

const user=getKeypairFromEnvironment("SECRET_KEY");
console.log(
    `🔑 We've loaded our keypair securely, using an env file! Our public key is: ${user.publicKey.toBase58()}`
  );

  const connection=new Connection(clusterApiUrl("devnet"),"confirmed");
  const balance=await connection.getBalance(user.publicKey);
  console.log(balance/LAMPORTS_PER_SOL)
  const tokenMintAddress=new PublicKey("H4uice94NidnGMNFMhJdq4YiB8MhvYEz3pp4MPMUxLpd");
  
  const tokenAccount=await getOrCreateAssociatedTokenAccount(connection,user,tokenMintAddress,user.publicKey);

  const transaction=await mintTo(connection,user,tokenMintAddress,tokenAccount.address,user,100000);

  console.log(transaction)