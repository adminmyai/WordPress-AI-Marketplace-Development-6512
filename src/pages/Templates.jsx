import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'

const { FiSearch, FiDownload, FiStar, FiUsers, FiCode, FiMessageSquare, FiTrendingUp } = FiIcons

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Templates', icon: FiCode },
    { id: 'agent', name: 'AI Agents', icon: FiUsers },
    { id: 'chatbot', name: 'Chatbots', icon: FiMessageSquare },
    { id: 'seo', name: 'SEO Tools', icon: FiTrendingUp },
    { id: 'automation', name: 'Automation', icon: FiIcons.FiRefreshCw },
    { id: 'analytics', name: 'Analytics', icon: FiIcons.FiBarChart3 }
  ]

  const templates = [
    {
      id: 1,
      name: 'Customer Support Agent',
      description: 'Ready-to-use AI customer support agent with natural language processing',
      category: 'agent',
      price: 'Free',
      downloads: '5,234',
      rating: 4.9,
      features: ['24/7 Support', 'Multi-language', 'Ticket Management', 'Knowledge Base'],
      tags: ['Customer Service', 'NLP', 'Automation']
    },
    {
      id: 2,
      name: 'E-commerce Chatbot',
      description: 'Intelligent chatbot for e-commerce with product recommendations',
      category: 'chatbot',
      price: 'Premium',
      downloads: '3,456',
      rating: 4.8,
      features: ['Product Search', 'Order Tracking', 'Payment Integration', 'Personalized Recommendations'],
      tags: ['E-commerce', 'Sales', 'Recommendations']
    },
    {
      id: 3,
      name: 'SEO Content Analyzer',
      description: 'Advanced SEO analysis tool that outperforms competitors',
      category: 'seo',
      price: 'Premium',
      downloads: '8,901',
      rating: 4.9,
      features: ['Keyword Analysis', 'Content Optimization', 'SERP Tracking', 'Competitor Analysis'],
      tags: ['SEO', 'Content', 'Analytics']
    },
    {
      id: 4,
      name: 'Lead Generation Bot',
      description: 'Automated lead generation and qualification system',
      category: 'agent',
      price: 'Premium',
      downloads: '2,345',
      rating: 4.7,
      features: ['Lead Scoring', 'CRM Integration', 'Email Automation', 'Analytics Dashboard'],
      tags: ['Lead Generation', 'CRM', 'Sales']
    },
    {
      id: 5,
      name: 'Social Media Manager',
      description: 'AI-powered social media management and scheduling tool',
      category: 'automation',
      price: 'Free',
      downloads: '6,789',
      rating: 4.6,
      features: ['Content Scheduling', 'Hashtag Optimization', 'Analytics', 'Multi-platform'],
      tags: ['Social Media', 'Content', 'Scheduling']
    },
    {
      id: 6,
      name: 'Business Analytics Dashboard',
      description: 'Comprehensive business analytics with AI insights',
      category: 'analytics',
      price: 'Premium',
      downloads: '4,567',
      rating: 4.8,
      features: ['Real-time Analytics', 'Predictive Insights', 'Custom Reports', 'Data Visualization'],
      tags: ['Analytics', 'Business Intelligence', 'Reporting']
    }
  ]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Ready-to-Use AI Templates
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Get started instantly with our collection of proven AI templates. 
            Perfect for the most common use cases and ready to deploy.
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-6">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search templates..."
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

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    template.price === 'Free' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-primary-100 text-primary-800'
                  }`}>
                    {template.price}
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                    <span className="text-sm font-medium">{template.rating}</span>
                    <SafeIcon icon={FiStar} className="w-4 h-4" />
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <SafeIcon icon={FiDownload} className="w-4 h-4" />
                    <span className="text-sm">{template.downloads}</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{template.description}</p>

              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                <ul className="space-y-1">
                  {template.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <SafeIcon icon={FiIcons.FiCheck} className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                <SafeIcon icon={FiDownload} className="w-4 h-4" />
                <span>Download Template</span>
              </button>
            </motion.div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No templates found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Templates