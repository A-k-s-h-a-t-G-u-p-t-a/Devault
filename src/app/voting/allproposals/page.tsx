"use client";
import { useState, useEffect, useRef } from "react";
import { client2 } from "@/lib/client";
import {
  defineChain,
  getContract,
  readContract,
  prepareContractCall,
} from "thirdweb";
import { useReadContract, useSendTransaction } from "thirdweb/react";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function VotingProposals() {
  const contract = getContract({
    client: client2,
    chain: defineChain(11155111), // Sepolia Testnet
    address: "0x1B1a40b5bE3AC3495F9536581d3C9aE887dBeb61",
  });

  const { data: proposalCount, isPending: isCounting } = useReadContract({
    contract: contract,
    method: "function getProposalCount() view returns (uint256)",
    params: [],
  });

  const [proposals, setProposals] = useState<any[]>([]);
  const [isFetchingProposals, setIsFetchingProposals] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const hasFetched = useRef(false);
  const { mutate: sendTransaction } = useSendTransaction();

  useEffect(() => {
    if (!proposalCount || isCounting || hasFetched.current) return;
    hasFetched.current = true;
    setIsFetchingProposals(true);

    const fetchProposals = async () => {
      try {
        const proposalCountNum = Number(proposalCount);
        const fetchedProposals = await Promise.all(
          Array.from({ length: proposalCountNum }, async (_, i) => {
            try {
              const proposal = (await readContract({
                contract: contract,
                method:
                  "function getProposal(uint256 _proposalId) view returns (uint256, string, uint256, uint256, uint256, bool, address)",
                params: [i],
              })) as any;

              return {
                id: Number(proposal[0]),
                description: proposal[1],
                yesVotes: Number(proposal[2]),
                noVotes: Number(proposal[3]),
                endTime: Number(proposal[4]),
                finalized: proposal[5],
                creator: proposal[6],
              };
            } catch (error) {
              console.error("Error fetching proposal:", error);
              return null;
            }
          })
        );
        setProposals(fetchedProposals.filter(Boolean));
      } catch (error) {
        console.error("Error fetching proposals:", error);
      }
      setIsFetchingProposals(false);
    };

    fetchProposals();
  }, [proposalCount, isCounting, contract]);

  const handleVote = async (proposalId: number, vote: boolean) => {
    if (isVoting) return;
    setIsVoting(true);
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function vote(uint256 _proposalId, bool _vote)",
        params: [proposalId, vote],
      });

      sendTransaction(transaction, {
        onSuccess: (tx) => {
          toast.success(`Vote submitted! TX: ${tx.hash}`);
          hasFetched.current = false;
          setProposals([]);
        },
        onError: (error) => {
          console.error("Voting failed:", error);
          toast.error("Voting failed. Try again.");
        },
      });
    } catch (error) {
      console.error("Error preparing transaction:", error);
    }
    setIsVoting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">🗳️ Voting Proposals</h1>

        {isCounting ? (
          <p className="text-gray-400 text-center">Fetching proposal count...</p>
        ) : isFetchingProposals ? (
          <p className="text-gray-400 text-center">Fetching proposals...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="bg-gray-800 p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold">🆔 Proposal #{proposal.id}</h2>
                <p className="text-gray-300 mb-2 truncate">💬 {proposal.description}</p>
                <p className="text-gray-400">📅 Ends on: {new Date(proposal.endTime * 1000).toLocaleString()}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedProposal({ ...proposal })}>View Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Proposal #{selectedProposal?.id}</DialogTitle>
                    <DialogDescription>{selectedProposal?.description}</DialogDescription>
                    <p>✅ Yes Votes: {selectedProposal?.yesVotes}</p>
                    <p>❌ No Votes: {selectedProposal?.noVotes}</p>
                    <p>👤 Creator: {selectedProposal?.creator}</p>
                    <div className="flex justify-between mt-4">
                      <Button
                        className="bg-green-600"
                        onClick={() => handleVote(selectedProposal?.id, true)}
                        disabled={isVoting || !selectedProposal}
                      >
                        ✅ Vote Yes
                      </Button>
                      <Button
                        className="bg-red-600"
                        onClick={() => handleVote(selectedProposal?.id, false)}
                        disabled={isVoting || !selectedProposal}
                      >
                        ❌ Vote No
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
