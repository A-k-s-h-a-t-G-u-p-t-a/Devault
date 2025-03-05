"use client";

import { client } from "@/lib/client";
import { defineChain, getContract } from "thirdweb";
import { useReadContract } from "thirdweb/react";

export default function AllTokensPage() {
    const contract = getContract({
        client: client,
        chain: defineChain(11155111),
        address: "0x3a77b4989AB5F3EfB9Fc4fed0978ca0b5e10A5a0"
    });

    const { data, isPending } = useReadContract({
        contract,
        method: "function allTokens(uint256) view returns (address[])",
        params: [BigInt(0)],
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">All Project Tokens</h1>
            {isPending ? (
                <p>Loading...</p>
            ) : (
                <ul className="list-disc">
                    {data && data.length > 0 ? (
                        data.map((tokenAddress, index) => (
                            <li key={index} className="p-2 border-b">{tokenAddress}</li>
                        ))
                    ) : (
                        <p>No tokens found.</p>
                    )}
                </ul>
            )}
        </div>
    );
}