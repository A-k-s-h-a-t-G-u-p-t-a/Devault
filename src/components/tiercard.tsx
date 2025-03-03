'use client'
import { prepareContractCall, ThirdwebContract } from "thirdweb";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { useEffect, useState } from "react";

type Tier = {
    name: string;
    amount: bigint;
    backers: bigint;
};
type TierCardProps = {
    tier: Tier;
    index: number;
    contract: ThirdwebContract;
    isEditing: boolean;
};

export default function TierCard({ tier, index, contract, isEditing }: TierCardProps) {
    const [isClient, setIsClient] = useState(false);
    const account = useActiveAccount();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; 

    if (!account) {
        return <p className="text-red-500">Please connect your wallet before funding!</p>;
    }

    const handleTransactionError = (error: any) => {
        console.error("Transaction Error:", error);
        alert(`Transaction failed: ${error.message}`);
    };

    return (
        <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col items-center space-y-4 w-64">
            <h3 className="text-xl font-semibold">{tier.name}</h3>
            <p className="text-lg text-gray-300">{tier.amount.toString()} ETH</p>
            <p className="text-sm text-gray-400">{tier.backers.toString()} backers</p>
            
            <TransactionButton 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full transition"
                transaction={async () => {
                    try {
                        console.log("Preparing transaction...");
                        return await prepareContractCall({
                            contract,
                            method: "function fund(uint256 _tierIndex) payable",
                            params: [BigInt(index)], 
                            value: tier.amount  
                        });
                    } catch (error) {
                        handleTransactionError(error);
                    }
                }}
                onTransactionConfirmed={() => alert("Transaction confirmed")}
                onError={handleTransactionError} 
            >
               Fund
            </TransactionButton>

            {isEditing && (
                <TransactionButton
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-full transition"
                    transaction={async () => {
                        try {
                            const preparedTransaction = await prepareContractCall({
                                contract,
                                method: "function removeTier(uint256 _index)",
                                params: [BigInt(index)]
                            });
                            if (!preparedTransaction) {
                                throw new Error("Failed to prepare transaction");
                            }
                            return preparedTransaction;
                        } catch (error) {
                            handleTransactionError(error);
                        }
                    }}
                    onTransactionConfirmed={() => alert("Tier removed successfully")}
                    onError={handleTransactionError}
                >
                    Remove
                </TransactionButton>
            )}
        </div>
    );
}
