"use client";
import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { useActiveAccount, useSendTransaction, useReadContract } from "thirdweb/react";
import { defineChain, getContract, prepareContractCall } from "thirdweb";
import { client2 } from "../../../lib/client";

export default function CreateToken() {
  const wallet = useActiveAccount();
  const { mutate: sendTransaction } = useSendTransaction();

  const contract = getContract({
    client: client2,
    chain: defineChain(11155111), // Sepolia Testnet
    address: "0xBb0F165109dAA2007FbeeE6b4a4785984C919E56",
  });

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [initialSupply, setInitialSupply] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch tokens owned by the user
  const { data: alltokens, isPending } = useReadContract({
    contract,
    method: "function getTokensByOwner(address owner) view returns (address[])",
    params: [wallet?.address as string],
  });

  useEffect(() => {
    if (alltokens) {
      console.log("User Tokens:", alltokens);
    }
  }, [alltokens]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !symbol || !initialSupply) {
      alert("Please fill all fields");
      return;
    }
    if (!wallet) {
      alert("Please connect your wallet.");
      return;
    }

    setLoading(true);
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function createProjectToken(string name, string symbol, uint256 initialSupply) returns (address tokenAddress)",
        params: [name, symbol, BigInt(initialSupply)], // Ensure BigInt type for Solidity uint256
      });

      sendTransaction(transaction, {
        onSuccess: (txHash) => {
          alert(`Token Created! Tx: ${txHash}`);
          setName("");
          setSymbol("");
          setInitialSupply("");
        },
        onError: (error) => {
          console.error("Transaction Failed", error);
          alert("Token creation failed. Check console for details.");
        },
      });
    } catch (error) {
      console.error("Error creating token:", error);
      alert("An unexpected error occurred.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-black text-white py-10">
      {/* Token Creation Card */}
      <Card className="w-full max-w-md p-6 bg-gray-900 rounded-2xl shadow-lg">
        <CardContent>
          <h2 className="text-xl font-bold mb-4 text-center text-purple-400">Create a New Token</h2>
          <Input
            placeholder="Token Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-3 bg-gray-800 text-white"
          />
          <Input
            placeholder="Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="mb-3 bg-gray-800 text-white"
          />
          <Input
            placeholder="Initial Supply"
            type="number"
            value={initialSupply}
            onChange={(e) => setInitialSupply(e.target.value)}
            className="mb-3 bg-gray-800 text-white"
          />
          <Button onClick={handleSubmit} disabled={loading} className="w-full bg-purple-500 hover:bg-purple-600 text-white">
            {loading ? "Creating..." : "Create Token"}
          </Button>
        </CardContent>
      </Card>

      {/* Token List */}
      <div className="w-full max-w-md mt-8 p-6 bg-gray-900 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Your Tokens</h2>
        {isPending && <p className="text-gray-400 text-center">Loading tokens...</p>}
        {!isPending && alltokens?.length === 0 && <p className="text-gray-400 text-center">No tokens found.</p>}
        <ul className="space-y-2">
          {alltokens?.map((token, index) => (
            <li key={index} className="bg-gray-800 p-2 rounded-md text-center">
              {token}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
