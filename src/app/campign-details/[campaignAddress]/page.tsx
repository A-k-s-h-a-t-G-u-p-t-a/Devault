"use client";
import { client } from "@/lib/client";
import { useParams } from "next/navigation";
import { defineChain, getContract, prepareContractCall, ThirdwebContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import TierCard from "@/components/tiercard";
import { useState } from "react";

export default function CampaignDetails() {
    const { campaignAddress } = useParams();
    const account = useActiveAccount();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const contract = getContract({
        client: client,
        chain: defineChain(11155111),
        address: campaignAddress as string
    });
    
    const { data: name } = useReadContract({ contract, method: "function name() view returns (string)", params: [] });
    const { data: description } = useReadContract({ contract, method: "function description() view returns (string)", params: [] });
    const { data: campaignGoal } = useReadContract({ contract, method: "function goal() view returns (uint256)", params: [] });
    const { data: campaignBalance } = useReadContract({ contract, method: "function getContractBalance() view returns (uint256)", params: [] });
    const { data: deadline, isPending: deadlineLoading } = useReadContract({ contract, method: "function deadline() view returns (uint256)", params: [] });
    const { data: getTiers, isPending: loadtier } = useReadContract({ contract, method: "function getTiers() view returns ((string name, uint256 amount, uint256 backers)[])", params: [] });
    const { data: owner, isPending: loadingowner } = useReadContract({ contract, method: "function owner() view returns (address)", params: [] });
    const { data: status, isPending: loadingstatus } = useReadContract({ contract, method: "function state() view returns (uint8)", params: [] });

    const balance = campaignBalance ? campaignBalance.toString() : "0";
    const goal = campaignGoal ? campaignGoal.toString() : "0";
    let percentage = (parseInt(balance) / parseInt(goal)) * 100;
    percentage = Math.min(percentage, 100);
    
    return (
        <div className="bg-gray-900 text-white min-h-screen p-6 flex flex-col items-center">
            <div className="bg-gray-800 text-white border border-gray-700 rounded-xl p-6 w-full max-w-3xl shadow-lg">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold mb-4">{name}</h1>
                    {owner === account?.address && (
                        <button className="px-4 py-2 bg-violet-700 text-white rounded-md" onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? "Done" : "Edit"}
                        </button>
                    )}
                </div>
                <p className="text-lg text-gray-400 mb-4">{description}</p>
                <p className="text-lg">Goal: <span className="font-bold text-violet-400">{goal} ETH</span></p>
                <p className="text-lg">Balance: <span className="font-bold text-green-400">{balance} ETH</span></p>
                <div className="relative w-full bg-gray-700 rounded-full h-3 overflow-hidden my-4">
                    <div className="bg-violet-700 h-full rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
                <p className="text-center text-gray-400">{percentage.toFixed(2)}% funded</p>
                <p className="text-lg">Deadline: {deadlineLoading ? "Loading..." : new Date(Number(deadline) * 1000).toLocaleString()}</p>
                <p className="text-lg">Owner: {loadingowner ? "Loading..." : owner}</p>
                <p className="text-lg">Status: {loadingstatus ? "Loading..." : status}</p>
            </div>
            <div className="mt-8 w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-4">Tiers</h2>
                {!loadtier ? (
                    getTiers && getTiers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {getTiers.map((tier, index) => (
                                <TierCard key={tier.name} tier={tier} index={index} contract={contract} isEditing={isEditing}/>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400">No tiers found.</p>
                    )
                ) : (
                    <p className="text-center text-gray-400">Loading...</p>
                )}
                {isEditing && (
                    <button className="mt-8 bg-violet-700 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded-lg w-full transition" onClick={() => setIsModalOpen(true)}>
                        + Add Tier
                    </button>
                )}
            </div>
            {isModalOpen && <CreateTierModal setIsModalOpen={setIsModalOpen} contract={contract} />}
        </div>
    );
}

type CreateTierModalProps = {
    setIsModalOpen: (isOpen: boolean) => void;
    contract: ThirdwebContract;
};

const CreateTierModal = ({ setIsModalOpen, contract }: CreateTierModalProps) => {
    const [tierName, setTierName] = useState<string>("");
    const [tierAmount, setTierAmount] = useState<bigint>(BigInt(0));
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-bold">Create Tier</p>
                    <button className="text-red-500" onClick={() => setIsModalOpen(false)}>Close</button>
                </div>
                <div className="flex flex-col space-y-4">
                    <label>Tier Name:</label>
                    <input type="text" className="bg-gray-700 text-white p-2 rounded-md" placeholder="Enter tier name" value={tierName} onChange={(e) => setTierName(e.target.value)} />
                    <label>Tier Amount:</label>
                    <input type="number" className="bg-gray-700 text-white p-2 rounded-md" placeholder="Enter tier amount" value={tierAmount.toString()} onChange={(e) => setTierAmount(BigInt(e.target.value))} />
                    <TransactionButton transaction={() => prepareContractCall({ contract, method: "function addTier(string _name, uint256 _amount)", params: [tierName, tierAmount] })} onTransactionConfirmed={() => { alert("Tier added successfully"); setIsModalOpen(false); }}>ADD TIER</TransactionButton>
                </div>
            </div>
        </div>
    );
};
