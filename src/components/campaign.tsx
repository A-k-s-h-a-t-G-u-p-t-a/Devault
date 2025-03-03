'use client'
import { client } from "@/lib/client";
import { defineChain, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";
import { motion } from 'framer-motion';
import Link from "next/link";


interface CampaignCardProps {
    campaignAddress: string;
}

export default function CampaignCard({ campaignAddress }: CampaignCardProps) {
    const contract = getContract({
        client: client,
        chain: defineChain(11155111),
        address: campaignAddress
    });

    const { data: campaignName } = useReadContract({
        contract,
        method: "function name() view returns (string)"
    });

    const { data: campaignDescription } = useReadContract({
        contract,
        method: "function description() view returns (string)"
    });

    const { data: campaignGoal, isPending: isLoadingGoal } = useReadContract({
        contract,
        method: "function goal() view returns (uint256)"
    });

    const { data: campaignBalance, isPending: isLoadingBalance } = useReadContract({
        contract,
        method: "function getContractBalance() view returns (uint256)"
    });

    const balance = campaignBalance ? campaignBalance.toString() : "0";
    const goal = campaignGoal ? campaignGoal.toString() : "0";
    let percentage = (parseInt(balance) / parseInt(goal)) * 100;
    if (percentage > 100) {
        percentage = 100;
    }

    return (
        <motion.div 
            className="bg-gray-900 text-white border border-gray-700 rounded-xl p-6 w-full max-w-md shadow-lg hover:shadow-2xl transition duration-300"
            whileHover={{ scale: 1.03 }}
        >
            <h2 className="text-2xl font-bold mb-3">{campaignName}</h2>
            <p className="text-sm text-gray-400 mb-4">{campaignDescription}</p>
            
            <div className="mb-4">
                <p>Goal: <span className="font-bold text-violet-400">{isLoadingGoal ? "Loading..." : `${goal} ETH`}</span></p>
                <p>Balance: <span className="font-bold text-green-400">{isLoadingBalance ? "Loading..." : `${balance} ETH`}</span></p>
            </div>
            
            <div className="relative w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div 
                    className="bg-violet-600 h-full rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1 }}
                ></motion.div>
            </div>
            
            <p className="text-sm text-gray-400 mt-2 text-center">{percentage.toFixed(2)}% funded</p>
            
            <Link href={`/campign-details/${campaignAddress}`}>
            <motion.button 
                    className="mt-6 bg-violet-700 text-white px-5 py-2.5 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-violet-800 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    View Campaign
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                </motion.button>
            </Link>
        </motion.div>
    );
}
