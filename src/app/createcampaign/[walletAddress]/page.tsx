'use client';
import CampaignCard from "@/components/campaign";
import { client } from "@/lib/client";
import { useState } from "react";
import { defineChain, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { deployPublishedContract } from "thirdweb/deploys";
import { useActiveAccount, useReadContract } from "thirdweb/react"

export default function DashboardPage() {
    const account = useActiveAccount();
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const contract = getContract({
        client : client,
        chain: defineChain(11155111),
        address: "0xA39DF769398c5ca177A84F8719e645A8B23f8F09",
    });

    // Get Campaigns
    const { data: myCampaigns, isLoading: isLoadingMyCampaigns, refetch } = useReadContract({
        contract: contract,
        method: "function getUserCampaigns(address _user) view returns ((address campaignAddress, address owner, string name, uint256 creationTime)[])",
        params: [account?.address as string]
    });
    
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-gray-900 text-white min-h-screen pt-8">
            <div className="flex flex-row justify-between items-center mb-8 border-b border-gray-700 pb-4">
                <p className="text-4xl font-semibold">Dashboard</p>
                <button
                    className="px-4 py-2 bg-violet-700 text-white rounded-md"
                    onClick={() => setIsModalOpen(true)}
                >Create Campaign</button>
            </div>
            <p className="text-2xl font-semibold mb-4">My Campaigns:</p>
            <div className="grid grid-cols-3 gap-4">
                {!isLoadingMyCampaigns && (
                    myCampaigns && myCampaigns.length > 0 ? (
                        myCampaigns.map((campaign, index) => (
                            <CampaignCard
                                key={index}
                                campaignAddress={campaign.campaignAddress}
                            />
                        ))
                    ) : (
                        <p>No campaigns</p>
                    )
                )}
            </div>
            
            {isModalOpen && (
                <CreateCampaignModal
                    setIsModalOpen={setIsModalOpen}
                    refetch={refetch}
                />
            )}
        </div>
    )
}

const CreateCampaignModal = ({ setIsModalOpen, refetch }) => {
    const account = useActiveAccount();
    const [isDeployingContract, setIsDeployingContract] = useState(false);
    const [campaignName, setCampaignName] = useState("");
    const [campaignDescription, setCampaignDescription] = useState("");
    const [campaignGoal, setCampaignGoal] = useState(1);
    const [campaignDeadline, setCampaignDeadline] = useState(1);
    
    const handleDeployContract = async () => {
        setIsDeployingContract(true);
        try {
            console.log("Deploying contract...");
            await deployPublishedContract({
                client: client,
                chain: defineChain(11155111),
                account: account!,
                contractId: "Crowdfunding",
                contractParams: {
                    name: campaignName,
                    description: campaignDescription,
                    goal: campaignGoal,
                    _durationInDays: campaignDeadline
                },
                publisher: "0x0408e64385FA3E98b86b55b8998B94Ecb771EF1D",
                version: "1.0.0",
            });
            alert("Contract deployed successfully!");
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeployingContract(false);
            setIsModalOpen(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center backdrop-blur-md">
            <div className="w-1/2 bg-gray-900 text-white p-6 rounded-md border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold">Create a Campaign</p>
                    <button
                        className="text-sm px-4 py-2 bg-gray-700 text-white rounded-md"
                        onClick={() => setIsModalOpen(false)}
                    >Close</button>
                </div>
                <div className="flex flex-col">
                    <label>Campaign Name:</label>
                    <input 
                        type="text" 
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        placeholder="Campaign Name"
                        className="mb-4 px-4 py-2 bg-gray-700 rounded-md"
                    />
                    <label>Campaign Description:</label>
                    <textarea
                        value={campaignDescription}
                        onChange={(e) => setCampaignDescription(e.target.value)}
                        placeholder="Campaign Description"
                        className="mb-4 px-4 py-2 bg-gray-700 rounded-md"
                    ></textarea>
                    <label>Campaign Goal:</label>
                    <input 
                        type="number"
                        value={campaignGoal}
                        onChange={(e) => setCampaignGoal(Math.max(1, parseInt(e.target.value)))}
                        className="mb-4 px-4 py-2 bg-gray-700 rounded-md"
                    />
                    <label>{`Campaign Length (Days)`}</label>
                    <input 
                        type="number"
                        value={campaignDeadline}
                        onChange={(e) => setCampaignDeadline(Math.max(1, parseInt(e.target.value)))}
                        className="mb-4 px-4 py-2 bg-gray-700 rounded-md"
                    />
                    <button
                        className="mt-4 px-4 py-2 bg-violet-700 text-white rounded-md"
                        onClick={handleDeployContract}
                        disabled={isDeployingContract}
                    >{isDeployingContract ? "Creating Campaign..." : "Create Campaign"}</button>
                </div>
            </div>
        </div>
    );
}
