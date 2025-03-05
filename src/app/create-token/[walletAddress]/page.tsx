"use client"

import { client2 } from "@/lib/client";
import { defineChain, getContract } from "thirdweb";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { useState } from "react";

export default function CreateToken() {
    const contract = getContract({
        client: client2,
        chain: defineChain(11155111),
        address: "0x3a77b4989AB5F3EfB9Fc4fed0978ca0b5e10A5a0"
    });

    const { mutate: sendTransaction } = useSendTransaction();
    
    const [name, setName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [initialSupply, setInitialSupply] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !symbol || !initialSupply) return;

        const transaction = prepareContractCall({
            contract,
            method: "function createProjectToken(string name, string symbol, uint256 initialSupply) returns (address tokenAddress)",
            params: [name, symbol, BigInt(initialSupply)],
        });
        sendTransaction(transaction);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Create Project Token</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input 
                    type="text" 
                    placeholder="Token Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="p-2 border rounded-md"
                />
                <input 
                    type="text" 
                    placeholder="Token Symbol" 
                    value={symbol} 
                    onChange={(e) => setSymbol(e.target.value)} 
                    className="p-2 border rounded-md"
                />
                <input 
                    type="number" 
                    placeholder="Initial Supply" 
                    value={initialSupply} 
                    onChange={(e) => setInitialSupply(e.target.value)} 
                    className="p-2 border rounded-md"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Create Token</button>
            </form>
        </div>
    );
}
