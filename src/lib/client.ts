import {
    createThirdwebClient,
    getContract,
  } from "thirdweb";
  import { defineChain } from "thirdweb/chains";
  
  // create the client with your clientId, or secretKey if in a server environment
  export const client = createThirdwebClient({
    clientId: "93c34b41ecff9e5cdcdb5b22d593a02b",
  });
  
  // connect to your contract
  export const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: "0xA39DF769398c5ca177A84F8719e645A8B23f8F09",
  });
