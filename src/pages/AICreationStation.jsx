import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'
import CreationCard from '../components/CreationCard'

const { FiSearch, FiCode, FiMessageSquare, FiImage, FiVideo, FiCpu, FiGitBranch } = FiIcons

const AICreationStation = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'All Stations', icon: FiCpu },
    { id: 'chatbots', name: 'Chatbots', icon: FiMessageSquare },
    { id: 'image', name: 'Text to Image', icon: FiImage },
    { id: 'video', name: 'Text to Video', icon: FiVideo },
    { id: 'agents', name: 'AI Agents', icon: FiCode },
    { id: 'workflows', name: 'Workflows', icon: FiGitBranch }
  ]

  const creationStations = [
    {
      id: 1,
      name: 'Open Source Chatbot Builder',
      description: 'Create custom chatbots using open-source LLMs like Llama, Mistral, or Vicuna',
      category: 'chatbots',
      type: 'open-source',
      features: [
        'Multiple open-source LLM options',
        'Custom knowledge base integration',
        'Fine-tuning capabilities',
        'Chat memory management',
        'Conversation export'
      ],
      models: ['Llama-2', 'Mistral-7B', 'Vicuna', 'OpenHermes'],
      template: 'customer-service'
    },
    {
      id: 2,
      name: 'Stable Diffusion Studio',
      description: 'Generate images using Stable Diffusion with advanced controls',
      category: 'image',
      type: 'open-source',
      features: [
        'Multiple model versions',
        'ControlNet support',
        'Prompt engineering',
        'Batch generation',
        'Image editing'
      ],
      models: ['SD 1.5', 'SD 2.1', 'SDXL'],
      template: 'product-photography'
    },
    {
      id: 3,
      name: 'Video Generation Lab',
      description: 'Create videos from text using open-source models',
      category: 'video',
      type: 'open-source',
      features: [
        'Text to video generation',
        'Image to video',
        'Motion interpolation',
        'Video editing',
        'Style transfer'
      ],
      models: ['ModelScope', 'Text2Video-Zero'],
      template: 'product-showcase'
    },
    {
      id: 4,
      name: 'AI Agent Workshop',
      description: 'Build and deploy custom AI agents with various capabilities',
      category: 'agents',
      type: 'open-source',
      features: [
        'Multiple agent architectures',
        'Tool integration',
        'Memory systems',
        'Multi-agent communication',
        'Deploy to production'
      ],
      models: ['Auto-GPT', 'BabyAGI', 'AgentGPT'],
      template: 'research-assistant'
    },
    {
      id: 5,
      name: 'N8N Workflow Creator',
      description: 'Create and test automated workflows with n8n',
      category: 'workflows',
      type: 'open-source',
      features: [
        'Visual workflow builder',
        'Node templates',
        'Error handling',
        'Webhook integration',
        'Automated testing'
      ],
      templates: ['social-media-automation', 'data-processing', 'api-integration']
    },
    {
      id: 6,
      name: 'Document Processing Agent',
      description: 'Build agents that can process and analyze documents',
      category: 'agents',
      type: 'open-source',
      features: [
        'OCR integration',
        'Document understanding',
        'Data extraction',
        'Template matching',
        'Multi-format support'
      ],
      models: ['GPT4All', 'Llama-2'],
      template: 'invoice-processor'
    }
  ]

  const filteredStations = creationStations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         station.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || station.category === selectedCategory
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
            AI Creation Station
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Build custom AI solutions using open-source models and tools.
            Create chatbots, generate images, design workflows, and more.
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
              placeholder="Search creation stations..."
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

        {/* Creation Stations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStations.map((station, index) => (
            <CreationCard key={station.id} station={station} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AICreationStation