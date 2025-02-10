import { CreditCard, DollarSign, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function WalletPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-violet-400">Wallet</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gray-800 border-violet-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">$1,234.56</div>
            <p className="text-xs text-slate-400">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-violet-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Pending Transactions</CardTitle>
            <Wallet className="h-4 w-4 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">3</div>
            <p className="text-xs text-slate-400">2 deposits, 1 withdrawal</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-violet-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Linked Cards</CardTitle>
            <CreditCard className="h-4 w-4 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-100">2</div>
            <p className="text-xs text-slate-400">View and manage cards</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-violet-700">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-200">Recent Transactions</CardTitle>
          <CardDescription className="text-slate-400">Your last 5 transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {[
              { id: 1, type: "Deposit", amount: 500, date: "2023-06-01" },
              { id: 2, type: "Withdrawal", amount: -50, date: "2023-05-28" },
              { id: 3, type: "Deposit", amount: 200, date: "2023-05-25" },
              { id: 4, type: "Withdrawal", amount: -75, date: "2023-05-20" },
              { id: 5, type: "Deposit", amount: 1000, date: "2023-05-15" },
            ].map((transaction) => (
              <li key={transaction.id} className="flex justify-between items-center">
                <span className="text-slate-300">{transaction.type}</span>
                <span className={`font-medium ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </span>
                <span className="text-slate-400 text-sm">{transaction.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

