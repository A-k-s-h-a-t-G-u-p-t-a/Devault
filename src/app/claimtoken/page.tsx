'use client';

import { Web3Button, createMerkleTreeFromAllowList, getProofsForAllowListEntry, useAddress, useContract, useTokenBalance } from '@thirdweb-dev/react';
import { useState } from 'react';
import { utils } from 'ethers/lib/utils';

const allowList = [
  {
    address: '<ALLOWLIST_ADDRESS>',
    maxClaimable: '<CLAIMABLE_AMOUNT>'
  },
  {
    address: '<ALLOWLIST_ADDRESS>',
    maxClaimable: '<CLAIMABLE_AMOUNT>'
  }
];

export default function Home() {
  const [merkleRoot, setMerkleRoot] = useState<string | null>(null);
  const address = useAddress();
  const { contract: tokenContract } = useContract('<CONTRACT_ADDRESS>');
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const generateMerkleTree = async () => {
    const merkleTree = await createMerkleTreeFromAllowList(allowList);
    setMerkleRoot(merkleTree.getHexRoot());
  };

  const getUserProof = async (userAddress: string) => {
    const merkleTree = await createMerkleTreeFromAllowList(allowList);
    const leaf = {
      address: userAddress,
      maxClaimable: '<CLAIMABLE_AMOUNT>'
    };
    const proof = await getProofsForAllowListEntry(merkleTree, leaf);
    return proof.length > 0 ? `0x${proof[0].data.toString('hex')}` : '';
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-2xl w-full text-center">
        <div className="space-y-8 mt-8">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <h1 className="text-xl font-bold mb-4">Create Merkle Tree</h1>
            <button
              onClick={generateMerkleTree}
              className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-300"
            >
              Generate
            </button>
            {merkleRoot && <p className="mt-4 break-all">Merkle Root Hash: {merkleRoot}</p>}
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <h1 className="text-xl font-bold mb-4">ERC-20 Airdrop</h1>
            <h3 className="text-lg">Token balance: {tokenBalance?.displayValue}</h3>
            <Web3Button
              contractAddress="<CONTRACT_ADDRESS>"
              action={async (contract) => contract.call(
                'claim',
                [
                  address,
                  utils.parseEther('<CLAIMABLE_AMOUNT>'),
                  [await getUserProof(address)],
                  utils.parseEther('<CLAIMABLE_AMOUNT>')
                ]
              )}
              onError={() => alert('Not eligible for airdrop or already claimed!')}
              onSuccess={() => alert('Airdrop claimed!')}
            >
              Claim Airdrop
            </Web3Button>
          </div>
        </div>
      </div>
    </main>
  );
}
