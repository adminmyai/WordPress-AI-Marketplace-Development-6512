import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'

const { FiSearch, FiTrendingUp, FiTarget, FiBarChart3, FiLink, FiFileText } = FiIcons

const SEOTools = () => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const seoTools = [
    {
      id: 1,
      name: 'Keyword Research Pro',
      description: 'Advanced keyword research with competition analysis and search volume data',
      icon: FiSearch,
      category: 'Research',
      features: [
        'Search volume analysis',
        'Keyword difficulty scoring',
        'Long-tail keyword suggestions',
        'Competitor keyword analysis',
        'SERP feature tracking'
      ],
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Content Optimizer',
      description: 'AI-powered content optimization for better search rankings',
      icon: FiFileText,
      category: 'Content',
      features: [
        'Content scoring',
        'Readability analysis',
        'Keyword density optimization',
        'Meta tag suggestions',
        'Content gap analysis'
      ],
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Rank Tracker',
      description: 'Monitor your keyword rankings across multiple search engines',
      icon: FiTrendingUp,
      category: 'Tracking',
      features: [
        'Daily rank tracking',
        'Local SEO tracking',
        'Mobile vs desktop rankings',
        'Competitor rank monitoring',
        'Historical data analysis'
      ],
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Backlink Analyzer',
      description: 'Comprehensive backlink analysis and link building opportunities',
      icon: FiLink,
      category: 'Link Building',
      features: [
        'Backlink profile analysis',
        'Toxic link detection',
        'Link building opportunities',
        'Anchor text analysis',
        'Competitor link analysis'
      ],
      color: 'bg-red-500'
    },
    {
      id: 5,
      name: 'Site Audit Tool',
      description: 'Complete technical SEO audit with actionable recommendations',
      icon: FiTarget,
      category: 'Technical SEO',
      features: [
        'Technical SEO issues',
        'Page speed analysis',
        'Mobile-friendliness check',
        'Schema markup validation',
        'Crawlability assessment'
      ],
      color: 'bg-yellow-500'
    },
    {
      id: 6,
      name: 'Analytics Dashboard',
      description: 'Comprehensive SEO analytics and reporting dashboard',
      icon: FiBarChart3,
      category: 'Analytics',
      features: [
        'Traffic analysis',
        'Conversion tracking',
        'ROI measurement',
        'Custom reporting',
        'Goal tracking'
      ],
      color: 'bg-indigo-500'
    }
  ]

  const filteredTools = seoTools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Professional SEO Tools
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Next-level SEO tools that deliver real results. Comprehensive suite for 
            keyword research, content optimization, and performance tracking.
          </motion.p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <SafeIcon
              icon={FiSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            />
            <input
              type="text"
              placeholder="Search SEO tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* SEO Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mr-4`}>
                  <SafeIcon icon={tool.icon} className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
                  <span className="text-sm text-gray-500">{tool.category}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{tool.description}</p>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
                <ul className="space-y-1">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <SafeIcon icon={FiIcons.FiCheck} className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to={`/seo-tools/${tool.id}`}
                className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Launch Tool</span>
                <SafeIcon icon={FiIcons.FiArrowRight} className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SEOTools