import ProposalForm from "../components/ProposalForm";
import { contract3 } from "@/lib/client";

export default function ProposalsPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      {contract3 ? <ProposalForm contract={contract3} /> : <p>Loading contract...</p>}
    </div>
  );
}
