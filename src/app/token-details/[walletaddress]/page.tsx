"use client";

import { useRouter } from "next/navigation";
import { client } from "@/lib/client";
import { defineChain, getContract } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { useActionState } from "react";

export default function WalletTokens() {
    const router = useRouter();
    const account  = useActiveAccount();

    const contract = getContract({
        client: client,
        chain: defineChain(11155111),
        address: "0x3a77b4989AB5F3EfB9Fc4fed0978ca0b5e10A5a0"
    });

    const { data, isPending } = useReadContract({
        contract,
        method: "function getTokensByOwner(address owner) view returns (address[])",
        params: [account?.address as string],
    });

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Tokens Created by Wallet</h1>
            {isPending ? (
                <p>Loading...</p>
            ) : (
                <ul className="list-disc">
                    {data && data.length > 0 ? (
                        data.map((tokenAddress, index) => (
                            <li key={index} className="p-2 border-b">{tokenAddress}</li>
                        ))
                    ) : (
                        <p>No tokens found for this wallet.</p>
                    )}
                </ul>
            )}
        </div>
    );
}
