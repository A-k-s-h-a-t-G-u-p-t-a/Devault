"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"

const issueStatusData = [
  { status: "Open", count: 45 },
  { status: "In Progress", count: 30 },
  { status: "Resolved", count: 25 },
  { status: "Closed", count: 20 },
]

const issueOverTimeData = [
  { month: "Jan", submitted: 20, completed: 15 },
  { month: "Feb", submitted: 25, completed: 18 },
  { month: "Mar", submitted: 30, completed: 22 },
  { month: "Apr", submitted: 35, completed: 28 },
  { month: "May", submitted: 40, completed: 32 },
  { month: "Jun", submitted: 45, completed: 38 },
]

const issuePriorityData = [
  { priority: "Low", value: 20 },
  { priority: "Medium", value: 45 },
  { priority: "High", value: 25 },
  { priority: "Critical", value: 10 },
]

const COLORS = ["#8b5cf6", "#6366f1", "#3b82f6", "#0ea5e9"]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-violet-400">Analytics</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gray-800 border-violet-700">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-200">Total Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-100">120</div>
            <p className="text-xs text-slate-400">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-violet-700">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-200">Open Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-100">45</div>
            <p className="text-xs text-slate-400">37.5% of total issues</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-violet-700">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-200">Avg. Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-100">3.2 days</div>
            <p className="text-xs text-slate-400">-0.5 days from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gray-800 border-violet-700">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-200">Issue Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                status: {
                  label: "Status",
                  color: "hsl(var(--chart-1))",
                },
                count: {
                  label: "Count",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={issueStatusData}>
                  <XAxis dataKey="status" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-violet-700">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-200">Issues Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                submitted: {
                  label: "Submitted",
                  color: "hsl(var(--chart-1))",
                },
                completed: {
                  label: "Completed",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={issueOverTimeData}>
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Line type="monotone" dataKey="submitted" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="completed" stroke="#6366f1" strokeWidth={2} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-violet-700">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-200">Issue Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                priority: {
                  label: "Priority",
                  color: "hsl(var(--chart-1))",
                },
                value: {
                  label: "Value",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={issuePriorityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {issuePriorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

