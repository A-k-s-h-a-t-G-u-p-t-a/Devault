"use client";

import { useState } from "react";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProposalForm({ contract }: { contract: any }) {
  const { mutate: sendTransaction, status } = useSendTransaction();
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const handleCreateProposal = () => {
    if (!description || !duration) return alert("Please fill all fields");

    const transaction = prepareContractCall({
      contract,
      method: "function createProposal(string _description, uint256 _duration)",
      params: [description, BigInt(duration)],
    });

    sendTransaction(transaction);
  };

  return (
    <Card className="w-full max-w-md p-6 bg-gray-900 text-white rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle>Create Proposal</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          className="mb-3"
          placeholder="Proposal Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="number"
          className="mb-3"
          placeholder="Duration (in seconds)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <Button
          onClick={handleCreateProposal}
          className="w-full"
          disabled={status === "pending"}
        >
          {status === "pending" ? "Creating..." : "Submit Proposal"}
        </Button>
      </CardContent>
    </Card>
  );
}
