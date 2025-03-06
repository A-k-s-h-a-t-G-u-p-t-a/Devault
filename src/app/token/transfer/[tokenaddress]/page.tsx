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
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-400">Transfer Tokens</h2>

        {/* Token Selection Dropdown */}
        <select
          value={selectedToken}
          onChange={(e) => setSelectedToken(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded-md"
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
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded-md"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 mb-3 bg-gray-700 text-white rounded-md"
        />

        {/* Transfer Button */}
        <button
          onClick={handleTransfer}
          className="w-full bg-blue-500 px-4 py-2 rounded-md font-semibold hover:bg-blue-600 transition"
        >
          Transfer
        </button>
      </div>
    </div>
  );
}
