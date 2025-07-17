import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import toast from 'react-hot-toast'

const { FiFileText, FiTarget, FiCheckCircle, FiAlertCircle, FiTrendingUp } = FiIcons

const ContentOptimizer = () => {
  const [content, setContent] = useState('')
  const [targetKeyword, setTargetKeyword] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  const handleAnalyze = async () => {
    if (!content.trim()) {
      toast.error('Please enter content to analyze')
      return
    }

    setIsAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      const wordCount = content.trim().split(/\s+/).length
      const keywordDensity = targetKeyword ? 
        (content.toLowerCase().split(targetKeyword.toLowerCase()).length - 1) / wordCount * 100 : 0

      const mockAnalysis = {
        score: Math.floor(Math.random() * 30) + 70, // 70-100
        wordCount,
        readabilityScore: Math.floor(Math.random() * 20) + 80,
        keywordDensity: keywordDensity.toFixed(2),
        recommendations: [
          {
            type: 'success',
            title: 'Good keyword usage',
            description: 'Your target keyword appears naturally in the content'
          },
          {
            type: 'warning',
            title: 'Add more subheadings',
            description: 'Break up your content with H2 and H3 tags for better readability'
          },
          {
            type: 'error',
            title: 'Meta description missing',
            description: 'Add a compelling meta description between 150-160 characters'
          },
          {
            type: 'success',
            title: 'Good content length',
            description: `Your content has ${wordCount} words, which is good for SEO`
          }
        ],
        seoMetrics: {
          titleTag: content.includes('<title>') ? 'Present' : 'Missing',
          metaDescription: 'Missing',
          headings: content.match(/<h[1-6]/gi)?.length || 0,
          internalLinks: content.match(/<a href="[^"]*"[^>]*>/gi)?.filter(link => !link.includes('http'))?.length || 0,
          externalLinks: content.match(/<a href="http[^"]*"[^>]*>/gi)?.length || 0,
          images: content.match(/<img/gi)?.length || 0,
          altTags: content.match(/alt="[^"]*"/gi)?.length || 0
        }
      }

      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
      toast.success('Content analysis completed')
    }, 2000)
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'success': return FiCheckCircle
      case 'warning': return FiIcons.FiAlertTriangle
      case 'error': return FiAlertCircle
      default: return FiIcons.FiInfo
    }
  }

  const getRecommendationColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200'
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'error': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-blue-600 bg-blue-50 border-blue-200'
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Optimizer</h1>
          <p className="text-gray-600">
            AI-powered content optimization for better search rankings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Input */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Content Analysis</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Keyword (Optional)
                  </label>
                  <input
                    type="text"
                    value={targetKeyword}
                    onChange={(e) => setTargetKeyword(e.target.value)}
                    placeholder="Enter your target keyword..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content to Analyze
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Paste your content here (HTML or plain text)..."
                    rows={12}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-500">
                    <span>Words: {content.trim().split(/\s+/).filter(word => word.length > 0).length}</span>
                    <span>Characters: {content.length}</span>
                  </div>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !content.trim()}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <SafeIcon icon={FiIcons.FiLoader} className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiTarget} className="w-5 h-5" />
                      <span>Analyze Content</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Analysis Results */}
            {analysis && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Analysis Results</h3>
                
                {/* Overall Score */}
                <div className="text-center mb-8">
                  <div className={`text-6xl font-bold ${getScoreColor(analysis.score)} mb-2`}>
                    {analysis.score}
                  </div>
                  <div className="text-gray-600">SEO Score</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${analysis.score}%` }}
                    ></div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{analysis.wordCount}</div>
                    <div className="text-sm text-gray-600">Words</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{analysis.readabilityScore}</div>
                    <div className="text-sm text-gray-600">Readability</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{analysis.keywordDensity}%</div>
                    <div className="text-sm text-gray-600">Keyword Density</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{analysis.seoMetrics.headings}</div>
                    <div className="text-sm text-gray-600">Headings</div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Optimization Recommendations</h4>
                  <div className="space-y-3">
                    {analysis.recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 border rounded-lg ${getRecommendationColor(rec.type)}`}
                      >
                        <div className="flex items-start space-x-3">
                          <SafeIcon 
                            icon={getRecommendationIcon(rec.type)} 
                            className="w-5 h-5 mt-0.5" 
                          />
                          <div>
                            <div className="font-medium">{rec.title}</div>
                            <div className="text-sm mt-1">{rec.description}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SEO Checklist */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Checklist</h3>
              
              {analysis ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Title Tag</span>
                    <SafeIcon 
                      icon={analysis.seoMetrics.titleTag === 'Present' ? FiCheckCircle : FiAlertCircle}
                      className={`w-4 h-4 ${analysis.seoMetrics.titleTag === 'Present' ? 'text-green-500' : 'text-red-500'}`}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Meta Description</span>
                    <SafeIcon 
                      icon={analysis.seoMetrics.metaDescription === 'Present' ? FiCheckCircle : FiAlertCircle}
                      className={`w-4 h-4 ${analysis.seoMetrics.metaDescription === 'Present' ? 'text-green-500' : 'text-red-500'}`}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Headings ({analysis.seoMetrics.headings})</span>
                    <SafeIcon 
                      icon={analysis.seoMetrics.headings > 0 ? FiCheckCircle : FiAlertCircle}
                      className={`w-4 h-4 ${analysis.seoMetrics.headings > 0 ? 'text-green-500' : 'text-red-500'}`}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Internal Links ({analysis.seoMetrics.internalLinks})</span>
                    <SafeIcon 
                      icon={analysis.seoMetrics.internalLinks > 0 ? FiCheckCircle : FiAlertCircle}
                      className={`w-4 h-4 ${analysis.seoMetrics.internalLinks > 0 ? 'text-green-500' : 'text-red-500'}`}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Images ({analysis.seoMetrics.images})</span>
                    <SafeIcon 
                      icon={analysis.seoMetrics.images > 0 ? FiCheckCircle : FiAlertCircle}
                      className={`w-4 h-4 ${analysis.seoMetrics.images > 0 ? 'text-green-500' : 'text-red-500'}`}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Alt Tags ({analysis.seoMetrics.altTags})</span>
                    <SafeIcon 
                      icon={analysis.seoMetrics.altTags === analysis.seoMetrics.images ? FiCheckCircle : FiAlertCircle}
                      className={`w-4 h-4 ${analysis.seoMetrics.altTags === analysis.seoMetrics.images ? 'text-green-500' : 'text-red-500'}`}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <SafeIcon icon={FiFileText} className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    Analyze your content to see the SEO checklist
                  </p>
                </div>
              )}
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Tips</h3>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <SafeIcon icon={FiTrendingUp} className="w-4 h-4 text-primary-500 mt-0.5" />
                  <span>Aim for 1,500+ words for comprehensive content</span>
                </div>
                
                <div className="flex items-start space-x-2">
                  <SafeIcon icon={FiTarget} className="w-4 h-4 text-primary-500 mt-0.5" />
                  <span>Use your target keyword in the first 100 words</span>
                </div>
                
                <div className="flex items-start space-x-2">
                  <SafeIcon icon={FiFileText} className="w-4 h-4 text-primary-500 mt-0.5" />
                  <span>Include 2-3 internal links to related content</span>
                </div>
                
                <div className="flex items-start space-x-2">
                  <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-primary-500 mt-0.5" />
                  <span>Add alt text to all images for accessibility</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentOptimizer