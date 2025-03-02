"use client";
import CampaignCard from "@/components/campaign";
import { client } from "@/lib/client";
import { defineChain, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { useReadContract } from "thirdweb/react";

export default function Campaigns() {
    const contract = getContract({
        client,
        chain: defineChain(11155111),
        address: "0xA39DF769398c5ca177A84F8719e645A8B23f8F09",
    });

    const { data: campaigns, isPending } = useReadContract({
        contract,
        method: "function getAllCampaigns() view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
        params: [],
    });

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="mb-10">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Crowdfunded Projects
                </h2>
                {isPending ? (
                    <p className="text-center text-gray-400">Loading campaigns...</p>
                ) : campaigns && campaigns.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {campaigns.map(( campaign ) => (
                            <CampaignCard key={campaign.campaignAddress} campaignAddress={campaign.campaignAddress} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400">No campaigns found.</p>
                )}
            </div>
        </div>
    );
}
