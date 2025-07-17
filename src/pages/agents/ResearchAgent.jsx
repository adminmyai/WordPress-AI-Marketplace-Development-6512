import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import toast from 'react-hot-toast'

const { FiSearch, FiFileText, FiDownload, FiPlay, FiPause, FiBookOpen } = FiIcons

const ResearchAgent = () => {
  const [topic, setTopic] = useState('')
  const [depth, setDepth] = useState('comprehensive')
  const [sources, setSources] = useState(['academic', 'news', 'web'])
  const [isResearching, setIsResearching] = useState(false)
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState(null)
  const [currentStep, setCurrentStep] = useState('')

  const depthOptions = [
    { value: 'quick', label: 'Quick Overview', description: '5-10 key points' },
    { value: 'detailed', label: 'Detailed Analysis', description: '15-20 comprehensive points' },
    { value: 'comprehensive', label: 'Comprehensive Report', description: 'Full research with citations' }
  ]

  const sourceOptions = [
    { value: 'academic', label: 'Academic Papers', icon: FiBookOpen },
    { value: 'news', label: 'News Articles', icon: FiIcons.FiNewspaper },
    { value: 'web', label: 'Web Sources', icon: FiIcons.FiGlobe },
    { value: 'books', label: 'Books & eBooks', icon: FiIcons.FiBook },
    { value: 'reports', label: 'Industry Reports', icon: FiFileText }
  ]

  const handleStartResearch = async () => {
    if (!topic.trim()) {
      toast.error('Please enter a research topic')
      return
    }

    setIsResearching(true)
    setProgress(0)
    setResults(null)

    const steps = [
      'Analyzing research topic...',
      'Searching academic databases...',
      'Gathering news articles...',
      'Collecting web sources...',
      'Processing and analyzing data...',
      'Generating insights...',
      'Compiling final report...'
    ]

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i])
      setProgress(((i + 1) / steps.length) * 100)
      
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
    }

    // Generate mock research results
    const mockResults = {
      topic,
      summary: `This comprehensive research on "${topic}" reveals several key insights and trends that are shaping the current landscape. The analysis covers multiple perspectives and provides actionable recommendations based on current data and expert opinions.`,
      keyFindings: [
        `${topic} has shown significant growth in recent years, with market expansion of 25-30% annually`,
        `Industry experts predict continued innovation in ${topic} over the next 5 years`,
        `Key challenges include regulatory compliance and technological adaptation`,
        `Leading companies are investing heavily in ${topic} research and development`,
        `Consumer adoption rates vary significantly across different demographics`
      ],
      sources: [
        {
          title: `The Future of ${topic}: A Comprehensive Analysis`,
          type: 'Academic Paper',
          author: 'Dr. Jane Smith et al.',
          year: '2024',
          relevance: 95
        },
        {
          title: `${topic} Market Trends and Predictions`,
          type: 'Industry Report',
          author: 'TechResearch Institute',
          year: '2024',
          relevance: 88
        },
        {
          title: `Breaking: Major Developments in ${topic}`,
          type: 'News Article',
          author: 'Tech News Daily',
          year: '2024',
          relevance: 82
        },
        {
          title: `${topic} Implementation Guide`,
          type: 'Web Resource',
          author: 'Industry Experts',
          year: '2024',
          relevance: 79
        }
      ],
      recommendations: [
        `Consider implementing ${topic} strategies gradually to minimize risk`,
        'Stay updated with regulatory changes that may affect implementation',
        'Invest in team training and development for better adoption',
        'Monitor competitor activities and market trends regularly',
        'Establish key performance indicators to measure success'
      ],
      relatedTopics: [
        `${topic} Best Practices`,
        `${topic} Case Studies`,
        `${topic} Implementation Challenges`,
        `Future of ${topic}`,
        `${topic} ROI Analysis`
      ],
      confidence: Math.floor(Math.random() * 15) + 85, // 85-100%
      completedAt: new Date().toISOString()
    }

    setResults(mockResults)
    setIsResearching(false)
    setCurrentStep('Research completed!')
    toast.success('Research completed successfully!')
  }

  const handleExportReport = () => {
    if (!results) return

    const reportContent = `
# Research Report: ${results.topic}

## Executive Summary
${results.summary}

## Key Findings
${results.keyFindings.map((finding, i) => `${i + 1}. ${finding}`).join('\n')}

## Recommendations
${results.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

## Sources
${results.sources.map(source => `- ${source.title} (${source.type}, ${source.year}) - ${source.relevance}% relevance`).join('\n')}

## Related Topics for Further Research
${results.relatedTopics.map(topic => `- ${topic}`).join('\n')}

---
Report generated on: ${new Date(results.completedAt).toLocaleString()}
Confidence Level: ${results.confidence}%
    `

    const blob = new Blob([reportContent], { type: 'text/markdown' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = `research-report-${results.topic.toLowerCase().replace(/\s+/g, '-')}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
    toast.success('Report exported successfully!')
  }

  const toggleSource = (sourceValue) => {
    setSources(prev => 
      prev.includes(sourceValue) 
        ? prev.filter(s => s !== sourceValue)
        : [...prev, sourceValue]
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Research Agent</h1>
          <p className="text-gray-600">
            Comprehensive research assistant that gathers, analyzes, and synthesizes information from multiple sources
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Research Configuration */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Research Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Research Topic
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter your research topic..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Research Depth
                  </label>
                  <div className="space-y-2">
                    {depthOptions.map((option) => (
                      <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="depth"
                          value={option.value}
                          checked={depth === option.value}
                          onChange={(e) => setDepth(e.target.value)}
                          className="mt-1 text-primary-600 focus:ring-primary-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source Types
                  </label>
                  <div className="space-y-2">
                    {sourceOptions.map((option) => (
                      <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sources.includes(option.value)}
                          onChange={() => toggleSource(option.value)}
                          className="text-primary-600 focus:ring-primary-500 rounded"
                        />
                        <SafeIcon icon={option.icon} className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleStartResearch}
                  disabled={isResearching || !topic.trim()}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isResearching ? (
                    <>
                      <SafeIcon icon={FiIcons.FiLoader} className="w-5 h-5 animate-spin" />
                      <span>Researching...</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiPlay} className="w-5 h-5" />
                      <span>Start Research</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Progress */}
            {isResearching && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Research Progress</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <SafeIcon icon={FiIcons.FiActivity} className="w-4 h-4 inline mr-2" />
                    {currentStep}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Research Results */}
          <div className="lg:col-span-2">
            {results ? (
              <div className="space-y-6">
                {/* Summary */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Research Summary</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Confidence: {results.confidence}%</span>
                      <button
                        onClick={handleExportReport}
                        className="flex items-center space-x-1 bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors"
                      >
                        <SafeIcon icon={FiDownload} className="w-4 h-4" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none">
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">{results.topic}</h4>
                    <p className="text-gray-700 leading-relaxed">{results.summary}</p>
                  </div>
                </div>

                {/* Key Findings */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Key Findings</h3>
                  
                  <div className="space-y-3">
                    {results.keyFindings.map((finding, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg"
                      >
                        <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <p className="text-gray-700">{finding}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Sources */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Sources ({results.sources.length})</h3>
                  
                  <div className="space-y-3">
                    {results.sources.map((source, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{source.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {source.author} • {source.year} • {source.type}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-primary-600">
                              {source.relevance}% relevant
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h3>
                  
                  <div className="space-y-3">
                    {results.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                        <SafeIcon icon={FiIcons.FiCheckCircle} className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-gray-700">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Topics */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Related Topics for Further Research</h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {results.relatedTopics.map((relatedTopic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm cursor-pointer hover:bg-primary-100 hover:text-primary-700 transition-colors"
                        onClick={() => setTopic(relatedTopic)}
                      >
                        {relatedTopic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : !isResearching ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <SafeIcon icon={FiSearch} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Ready to Start Research
                </h3>
                <p className="text-gray-600">
                  Enter a research topic and configure your preferences to begin comprehensive research
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResearchAgent