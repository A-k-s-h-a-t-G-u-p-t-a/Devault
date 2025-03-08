"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { client2 } from "@/lib/client";
import { defineChain } from "thirdweb";

const tokens = [
  {
    address: "0x6F550163510Ddc70B6dC57Be839375E700C5fB32",
    name: "AKAY",
    symbol: "Ak",
  },
  {
    address: "0xfC967fcFC78b99eAdA4dCa7AD1877582c7b91F3D",
    name: "ContributorToken",
    symbol: "CTKR",
  },
  {
    address: "0x3443d3569aeaF39e0Ce7cAA1C8C0Ce8Eb4A93b5F",
    name: "Devault",
    symbol: "Dev",
  },
];

export default function TransferToken() {
  const { mutate: sendTransaction } = useSendTransaction();
  const router = useRouter();

  const [selectedToken, setSelectedToken] = useState(tokens[0].address);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = () => {
    if (!selectedToken || !recipient || !amount) {
      alert("Please fill all fields");
      return;
    }

    const tokenContract = getContract({
      client: client2,
      chain: defineChain(11155111), // Sepolia Testnet
      address: selectedToken, // Selected token from dropdown
    });

    const transaction = prepareContractCall({
      contract: tokenContract,
      method: "function transfer(address to, uint256 value) returns (bool)",
      params: [recipient, BigInt(amount)],
    });

    sendTransaction(transaction, {
      onSuccess: (txHash) => alert(`Transfer Successful! Tx: ${txHash}`),
      onError: (error) => console.error("Transfer Failed", error),
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
      <div className="p-8 bg-gray-900 rounded-2xl shadow-xl w-96 text-center border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-purple-400">Transfer Tokens</h2>

        {/* Token Selection Dropdown */}
        <select
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {tokens.map((token) => (
            <option key={token.address} value={token.address}>
              {token.name} ({token.symbol})
            </option>
          ))}
        </select>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Transfer Button */}
        <button
          onClick={handleTransfer}
          className="w-full bg-purple-600 px-5 py-3 rounded-lg font-semibold hover:bg-purple-700 transition shadow-lg"
        >
          Transfer
        </button>
      </div>
    </div>
  );
}