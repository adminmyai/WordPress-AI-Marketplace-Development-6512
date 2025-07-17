import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'

const { FiSearch, FiGitBranch, FiPlay, FiDownload, FiStar, FiUsers } = FiIcons

const Workflows = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Workflows', icon: FiGitBranch },
    { id: 'social-media', name: 'Social Media', icon: FiIcons.FiShare2 },
    { id: 'data-processing', name: 'Data Processing', icon: FiIcons.FiDatabase },
    { id: 'api-integration', name: 'API Integration', icon: FiIcons.FiLink },
    { id: 'marketing', name: 'Marketing', icon: FiIcons.FiTrendingUp },
    { id: 'ecommerce', name: 'E-commerce', icon: FiIcons.FiShoppingCart }
  ]

  const workflows = [
    {
      id: 1,
      name: 'Social Media Automation',
      description: 'Automate content creation and posting across multiple social media platforms',
      category: 'social-media',
      complexity: 'Intermediate',
      estimatedTime: '30 minutes',
      nodes: 8,
      rating: 4.8,
      downloads: '12,543',
      features: [
        'Multi-platform posting',
        'AI content generation',
        'Scheduled publishing',
        'Performance tracking'
      ]
    },
    {
      id: 2,
      name: 'Lead Generation Pipeline',
      description: 'Capture, qualify, and nurture leads automatically with CRM integration',
      category: 'marketing',
      complexity: 'Advanced',
      estimatedTime: '45 minutes',
      nodes: 12,
      rating: 4.9,
      downloads: '8,921',
      features: [
        'Lead scoring',
        'Email automation',
        'CRM sync',
        'Follow-up sequences'
      ]
    },
    {
      id: 3,
      name: 'E-commerce Order Processing',
      description: 'Complete order fulfillment workflow from purchase to delivery',
      category: 'ecommerce',
      complexity: 'Advanced',
      estimatedTime: '60 minutes',
      nodes: 15,
      rating: 4.7,
      downloads: '6,234',
      features: [
        'Payment processing',
        'Inventory management',
        'Shipping automation',
        'Customer notifications'
      ]
    },
    {
      id: 4,
      name: 'Data Backup & Sync',
      description: 'Automated data backup and synchronization across multiple platforms',
      category: 'data-processing',
      complexity: 'Beginner',
      estimatedTime: '20 minutes',
      nodes: 6,
      rating: 4.6,
      downloads: '15,678',
      features: [
        'Multi-cloud backup',
        'Incremental sync',
        'Error handling',
        'Notification alerts'
      ]
    },
    {
      id: 5,
      name: 'Customer Support Automation',
      description: 'Intelligent ticket routing and automated response system',
      category: 'api-integration',
      complexity: 'Intermediate',
      estimatedTime: '35 minutes',
      nodes: 10,
      rating: 4.8,
      downloads: '9,876',
      features: [
        'Smart ticket routing',
        'Auto-responses',
        'Escalation rules',
        'Performance metrics'
      ]
    },
    {
      id: 6,
      name: 'Content Marketing Pipeline',
      description: 'End-to-end content creation, approval, and distribution workflow',
      category: 'marketing',
      complexity: 'Advanced',
      estimatedTime: '50 minutes',
      nodes: 14,
      rating: 4.9,
      downloads: '7,543',
      features: [
        'Content planning',
        'Approval workflow',
        'Multi-channel distribution',
        'Performance analytics'
      ]
    }
  ]

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || workflow.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Automation Workflows
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Ready-to-use N8N workflows for automating your business processes. 
            Import, customize, and deploy in minutes.
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-6">
            <SafeIcon
              icon={FiSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            />
            <input
              type="text"
              placeholder="Search workflows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <SafeIcon icon={category.icon} className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorkflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {workflow.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplexityColor(workflow.complexity)}`}>
                    {workflow.complexity}
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                    <span className="text-sm font-medium">{workflow.rating}</span>
                    <SafeIcon icon={FiStar} className="w-4 h-4" />
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <SafeIcon icon={FiDownload} className="w-4 h-4" />
                    <span className="text-sm">{workflow.downloads}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{workflow.description}</p>

              <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiGitBranch} className="w-4 h-4" />
                  <span>{workflow.nodes} nodes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <SafeIcon icon={FiIcons.FiClock} className="w-4 h-4" />
                  <span>{workflow.estimatedTime}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                <ul className="space-y-1">
                  {workflow.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <SafeIcon icon={FiIcons.FiCheck} className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/workflows/${workflow.id}/builder`}
                  className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiPlay} className="w-4 h-4" />
                  <span>Use Workflow</span>
                </Link>
                <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2">
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Workflows