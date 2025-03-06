"use client";
import { useState, useEffect, useRef } from "react";
import { client2 } from "@/lib/client";
import { defineChain, getContract, readContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";

export default function Component() {
  const contract = getContract({
    client: client2,
    chain: defineChain(11155111), // Sepolia Testnet
    address: "0xBb0F165109dAA2007FbeeE6b4a4785984C919E56",
  });

  // Fetch total token count
  const { data: tokenCount, isPending: isCounting } = useReadContract({
    contract: contract,
    method: "function getTokenCount() view returns (uint256)",
    params: [],
  });

  const [tokenAddresses, setTokenAddresses] = useState<string[]>([]);
  const [isFetchingTokens, setIsFetchingTokens] = useState<boolean>(false);
  const hasFetched = useRef(false); // Prevents re-fetching on re-renders

  useEffect(() => {
    if (!tokenCount || isCounting || hasFetched.current) return;
    hasFetched.current = true; // Mark as fetched to prevent duplicate calls

    setIsFetchingTokens(true);

    const fetchTokens = async () => {
      const addresses: string[] = await Promise.all(
        Array.from({ length: Number(tokenCount) }, async (_, i) => {
          try {
            return (await readContract({
              contract: contract,
              method: "function allTokens(uint256) view returns (address)",
              params: [i],
            })) as string;
          } catch (error) {
            console.error("Error fetching token:", error);
            return "Error fetching...";
          }
        })
      );

      setTokenAddresses(addresses); // Update state once, after fetching all
      setIsFetchingTokens(false);
    };

    fetchTokens();
  }, [tokenCount, isCounting, contract]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">All Tokens</h1>
        {isCounting ? (
          <p className="text-gray-400">Fetching token count...</p>
        ) : isFetchingTokens ? (
          <p className="text-gray-400">Fetching tokens...</p>
        ) : (
          <ul className="text-green-400">
            {tokenAddresses.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
