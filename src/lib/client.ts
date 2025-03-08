import {
    createThirdwebClient,
    getContract,
  } from "thirdweb";
  import { defineChain } from "thirdweb/chains";
  
  // create the client with your clientId, or secretKey if in a server environment
  export const client = createThirdwebClient({
    clientId: "93c34b41ecff9e5cdcdb5b22d593a02b",
  });
  export const client2 = createThirdwebClient({
    clientId: "9da4c23ac769c027ad5d9ae9b0952a15"
  }); 
  // connect to your contract
  export const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: "0xA39DF769398c5ca177A84F8719e645A8B23f8F09",
  });
  export const contract2 = getContract({
    client,
    chain: defineChain(11155111),
    address: "0xBb0F165109dAA2007FbeeE6b4a4785984C919E56",
  });
  export const contract3 = getContract({
    client: client2,
    chain: defineChain(11155111),
    address: "0x1B1a40b5bE3AC3495F9536581d3C9aE887dBeb61",
    
});
