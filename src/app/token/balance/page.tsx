"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Added for navigation
import { client2 } from "@/lib/client";
import { defineChain, getContract, readContract } from "thirdweb";
import { useReadContract, useActiveAccount } from "thirdweb/react";

export default function Page() {
  const router = useRouter(); // ✅ Use Next.js router
  const account = useActiveAccount();

  const contract = getContract({
    client: client2,
    chain: defineChain(11155111), // Sepolia Testnet
    address: "0xBb0F165109dAA2007FbeeE6b4a4785984C919E56",
  });

  const { data: ownedTokens, isPending: isFetchingTokens } = useReadContract({
    contract,
    method: "function getTokensByOwner(address owner) view returns (address[])",
    params: [account?.address],
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
          readContract({ contract: tokenContract, method: "function balanceOf(address) view returns (uint256)", params: [account?.address] }),
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center w-96">
        <h1 className="text-2xl font-bold mb-4">Your Tokens</h1>

        {isFetchingTokens ? (
          <p className="text-gray-400">Fetching tokens...</p>
        ) : ownedTokens?.length ? (
          <ul className="mb-4">
            {ownedTokens.map((token, index) => (
              <li
                key={index}
                className="cursor-pointer text-green-400 hover:text-green-300"
                onClick={() => setSelectedToken(token)}
              >
                {token}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No tokens found.</p>
        )}

        {selectedToken && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Token Details</h2>
            {isFetchingDetails ? (
              <p className="text-gray-400">Fetching details...</p>
            ) : (
              <div className="text-left">
                <p><strong>Name:</strong> {tokenDetails.name}</p>
                <p><strong>Symbol:</strong> {tokenDetails.symbol}</p>
                <p><strong>Total Supply:</strong> {tokenDetails.supply}</p>
                <p><strong>Your Balance:</strong> {tokenDetails.balance}</p>
              </div>
            )}
            {/* ✅ Transfer Button with Token Address in URL */}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition"
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
