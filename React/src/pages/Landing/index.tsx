import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts"

const lineData = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 800 },
  { month: "Mar", users: 1200 },
  { month: "Apr", users: 600 },
  { month: "May", users: 1600 },
]

const barData = [
  { name: "Product A", sales: 2400 },
  { name: "Product B", sales: 1398 },
  { name: "Product C", sales: 9800 },
  { name: "Product D", sales: 3908 },
]

const pieData = [
  { name: "Mobile", value: 400 },
  { name: "Web", value: 300 },
  { name: "Desktop", value: 300 },
]

const COLORS = ["#3b82f6", "#10b981", "#f59e0b"]

function Dashboard() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000) // fake loading
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          className="w-12 h-12 border-4 border-active border-t-transparent rounded-full animate-spin"
        />
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen pt-[4rem]">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold mb-6 text-gray-800"
      >
        📊 Dashboard Overview
      </motion.h1>

      {/* Stats cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Users", value: "1,200", color: "bg-blue-100 text-blue-600" },
          { title: "Revenue", value: "$45,000", color: "bg-green-100 text-green-600" },
          { title: "Orders", value: "320", color: "bg-yellow-100 text-yellow-600" }
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="rounded-2xl p-6 shadow-md bg-white"
          >
            <p className={`font-medium ${card.color}`}>{card.title}</p>
            <h2 className="text-2xl font-bold mt-2">{card.value}</h2>
          </motion.div>
        ))}
      </div>

      {/* Graphs */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Line chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-4"
        >
          <h3 className="font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-4"
        >
          <h3 className="font-semibold mb-4">Sales by Product</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-md p-4 md:col-span-2"
        >
          <h3 className="font-semibold mb-4">Platform Usage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map(() => (
                  <Cell fill={COLORS[COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
