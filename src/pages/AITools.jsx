import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'

const { FiSearch, FiTrendingUp, FiEdit3, FiMessageSquare, FiImage, FiCode, FiBarChart3, FiGlobe } = FiIcons

const AITools = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Tools', icon: FiGlobe },
    { id: 'seo', name: 'SEO Tools', icon: FiTrendingUp },
    { id: 'content', name: 'Content Creation', icon: FiEdit3 },
    { id: 'chatbot', name: 'Chatbots', icon: FiMessageSquare },
    { id: 'image', name: 'Image Generation', icon: FiImage },
    { id: 'code', name: 'Code Generation', icon: FiCode },
    { id: 'analytics', name: 'Analytics', icon: FiBarChart3 }
  ]

  const tools = [
    {
      id: 1,
      name: 'SEO Content Optimizer',
      description: 'AI-powered SEO optimization that delivers results nobody else can achieve',
      category: 'seo',
      price: 'Premium',
      features: ['Keyword Research', 'Content Optimization', 'SERP Analysis', 'Competitor Intelligence'],
      rating: 4.9,
      users: '15,000+'
    },
    {
      id: 2,
      name: 'Smart Content Generator',
      description: 'Generate high-quality content for blogs, social media, and marketing',
      category: 'content',
      price: 'Free',
      features: ['Blog Posts', 'Social Media', 'Email Copy', 'Ad Copy'],
      rating: 4.8,
      users: '25,000+'
    },
    {
      id: 3,
      name: 'Advanced Chatbot Builder',
      description: 'Create intelligent chatbots with natural language processing',
      category: 'chatbot',
      price: 'Premium',
      features: ['NLP Integration', 'Multi-Platform', 'Analytics', 'Custom Training'],
      rating: 4.7,
      users: '8,000+'
    },
    {
      id: 4,
      name: 'AI Image Creator',
      description: 'Generate stunning images and graphics with AI',
      category: 'image',
      price: 'Premium',
      features: ['Text to Image', 'Style Transfer', 'Batch Generation', 'High Resolution'],
      rating: 4.9,
      users: '30,000+'
    },
    {
      id: 5,
      name: 'Code Assistant Pro',
      description: 'AI-powered code generation and debugging assistant',
      category: 'code',
      price: 'Premium',
      features: ['Code Generation', 'Bug Detection', 'Documentation', 'Multi-Language'],
      rating: 4.8,
      users: '12,000+'
    },
    {
      id: 6,
      name: 'Analytics Intelligence',
      description: 'Advanced analytics and insights powered by AI',
      category: 'analytics',
      price: 'Premium',
      features: ['Predictive Analytics', 'Real-time Insights', 'Custom Reports', 'Data Visualization'],
      rating: 4.7,
      users: '18,000+'
    }
  ]

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
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
            AI Tools That Actually Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover powerful AI tools that deliver real results. From SEO to content creation, 
            we have everything you need to dominate your market.
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-6">
            <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tools..."
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

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tool.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    tool.price === 'Free' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-primary-100 text-primary-800'
                  }`}>
                    {tool.price}
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                    <span className="text-sm font-medium">{tool.rating}</span>
                    <SafeIcon icon={FiIcons.FiStar} className="w-4 h-4" />
                  </div>
                  <div className="text-sm text-gray-600">{tool.users} users</div>
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

              <button className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Try Now
              </button>
            </motion.div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No tools found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AITools