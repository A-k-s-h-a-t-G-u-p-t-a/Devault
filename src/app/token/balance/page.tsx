"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { client2 } from "@/lib/client";
import { defineChain, getContract, readContract } from "thirdweb";
import { useReadContract, useActiveAccount } from "thirdweb/react";

export default function Page() {
  const router = useRouter();
  const account = useActiveAccount();

  const contract = getContract({
    client: client2,
    chain: defineChain(11155111),
    address: "0xBb0F165109dAA2007FbeeE6b4a4785984C919E56",
  });

  const { data: ownedTokens, isPending: isFetchingTokens } = useReadContract({
    contract,
    method: "function getTokensByOwner(address owner) view returns (address[])",
    params: [account?.address as string],
  });

  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [tokenDetails, setTokenDetails] = useState<{
    name?: string;
    symbol?: string;
    supply?: number;
    balance?: number;
  }>({});
  const [isFetchingDetails, setIsFetchingDetails] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedToken) return;

    const tokenContract = getContract({
      client: client2,
      chain: defineChain(11155111),
      address: selectedToken,
    });

    const fetchTokenDetails = async () => {
      setIsFetchingDetails(true);
      try {
        const [name, symbol, supply, balance] = await Promise.all([
          readContract({ contract: tokenContract, method: "function name() view returns (string)", params: [] }),
          readContract({ contract: tokenContract, method: "function symbol() view returns (string)", params: [] }),
          readContract({ contract: tokenContract, method: "function totalSupply() view returns (uint256)", params: [] }),
          readContract({ contract: tokenContract, method: "function balanceOf(address) view returns (uint256)", params: [account?.address as string] }),
        ]);

        setTokenDetails({
          name: name as string,
          symbol: symbol as string,
          supply: Number(supply),
          balance: Number(balance),
        });
      } catch (error) {
        console.error("Error fetching token details:", error);
      } finally {
        setIsFetchingDetails(false);
      }
    };

    fetchTokenDetails();
  }, [selectedToken, account?.address]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-black text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center w-96">
        <h1 className="text-2xl font-bold mb-4 text-purple-400">Your Tokens</h1>
        {isFetchingTokens ? (
          <p className="text-gray-400">Fetching tokens...</p>
        ) : ownedTokens?.length ? (
          <div className="h-40 overflow-y-auto border border-gray-600 rounded-md p-2">
            <ul className="space-y-2">
              {ownedTokens.map((token, index) => (
                <li
                  key={index}
                  className="cursor-pointer text-green-400 hover:text-green-300 bg-gray-700 p-2 rounded-md text-sm truncate"
                  onClick={() => setSelectedToken(token)}
                >
                  {token}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-400">No tokens found.</p>
        )}

        {selectedToken && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <h2 className="text-xl font-bold mb-2 text-purple-400">Token Details</h2>
            {isFetchingDetails ? (
              <p className="text-gray-400">Fetching details...</p>
            ) : (
              <div className="text-left text-sm">
                <p><strong>Name:</strong> {tokenDetails.name}</p>
                <p><strong>Symbol:</strong> {tokenDetails.symbol}</p>
                <p><strong>Total Supply:</strong> {tokenDetails.supply}</p>
                <p><strong>Your Balance:</strong> {tokenDetails.balance}</p>
              </div>
            )}
            <button
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition"
              onClick={() => router.push(`/token/transfer/${selectedToken}`)}
            >
              Transfer Token
            </button>
          </div>
        )}
      </div>
    </div>
  );
}