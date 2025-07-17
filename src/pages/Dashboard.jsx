import React from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'
import useAuthStore from '../store/authStore'

const { FiUser, FiZap, FiDownload, FiTrendingUp, FiDollarSign, FiActivity, FiUsers } = FiIcons

const Dashboard = () => {
  const { user, subscription } = useAuthStore()

  const stats = [
    {
      name: 'Templates Downloaded',
      value: '24',
      icon: FiDownload,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      name: 'AI Tools Used',
      value: '12',
      icon: FiZap,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      name: 'SEO Score',
      value: '94%',
      icon: FiTrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      name: 'Monthly Savings',
      value: '$2,340',
      icon: FiDollarSign,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    }
  ]

  const recentActivity = [
    { action: 'Downloaded Customer Support Agent template', time: '2 hours ago' },
    { action: 'Used SEO Content Optimizer', time: '4 hours ago' },
    { action: 'Created new workflow automation', time: '6 hours ago' },
    { action: 'Upgraded to Professional plan', time: '1 day ago' },
    { action: 'Downloaded E-commerce Chatbot', time: '2 days ago' }
  ]

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.email?.split('@')[0]}!
          </h1>
          <p className="text-gray-600">
            Current Plan: <span className="font-medium text-primary-600">
              {subscription?.tier || 'Free'}
            </span>
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <SafeIcon icon={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <SafeIcon icon={FiActivity} className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                <SafeIcon icon={FiZap} className="w-6 h-6 text-primary-600 mb-2" />
                <span className="text-sm font-medium text-primary-600">Browse Tools</span>
              </button>
              <button className="p-4 bg-secondary-50 rounded-lg hover:bg-secondary-100 transition-colors">
                <SafeIcon icon={FiDownload} className="w-6 h-6 text-secondary-600 mb-2" />
                <span className="text-sm font-medium text-secondary-600">Get Templates</span>
              </button>
              <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <SafeIcon icon={FiTrendingUp} className="w-6 h-6 text-green-600 mb-2" />
                <span className="text-sm font-medium text-green-600">SEO Analysis</span>
              </button>
              <button className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                <SafeIcon icon={FiUsers} className="w-6 h-6 text-yellow-600 mb-2" />
                <span className="text-sm font-medium text-yellow-600">Get Consulting</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard