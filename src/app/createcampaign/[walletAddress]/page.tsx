'use client';
import CampaignCard from "@/components/campaign";
import { client } from "@/lib/client";
import { useState } from "react";
import { defineChain, getContract } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";

export default function DashboardPage() {
    const account = useActiveAccount();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const contract = getContract({
        client : client,
        chain: defineChain(11155111),
        address: "0xA39DF769398c5ca177A84F8719e645A8B23f8F09",
    });

    // Get Campaigns
    const { data: myCampaigns, isLoading: isLoadingMyCampaigns } = useReadContract({
        contract: contract,
        method: "function getUserCampaigns(address _user) view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
        params: [account?.address as string]
    });
    
    return (
        <div className="w-full h-screen bg-gray-900 text-white flex flex-col px-8 py-6">
            <div className="flex flex-row justify-between items-center mb-6 border-b border-gray-700 pb-4">
                <p className="text-4xl font-semibold">Dashboard</p>
                <button
                    className="px-4 py-2 bg-violet-700 text-white rounded-md"
                    onClick={() => setIsModalOpen(true)}
                >Create Campaign</button>
            </div>
            <p className="text-2xl font-semibold mb-4">My Campaigns:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {!isLoadingMyCampaigns && (
                    myCampaigns && myCampaigns.length > 0 ? (
                        myCampaigns.map((campaign, index) => (
                            <CampaignCard key={index} campaignAddress={campaign.campaignAddress} />
                        ))
                    ) : (
                        <p>No campaigns</p>
                    )
                )}
            </div>
        </div>
    );
}
