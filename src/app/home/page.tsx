import ProjectCard from '@/components/projectcard';
import Navbar from '@/components/navbar';
export default function Home() {
    return <div>
        <ProjectCard
         title="DeFi Protocol"
         description="Decentralized finance protocol for crypto trading"
         tags={["React", "Solidity", "Node.js"]}
         funding="5.0"
         issues={12}
         progress={75}
        />
    </div>
}