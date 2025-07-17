import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import toast from 'react-hot-toast'

const { FiSearch, FiDownload, FiTrendingUp, FiTarget, FiBarChart3 } = FiIcons

const KeywordResearch = () => {
  const [keyword, setKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState([])
  const [filters, setFilters] = useState({
    minVolume: 100,
    maxDifficulty: 80,
    country: 'US',
    language: 'en'
  })

  const handleSearch = async () => {
    if (!keyword.trim()) {
      toast.error('Please enter a keyword to research')
      return
    }

    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          keyword: keyword,
          volume: 12500,
          difficulty: 65,
          cpc: 2.45,
          competition: 'High',
          trend: 'up',
          relatedKeywords: [
            { keyword: `${keyword} tips`, volume: 8900, difficulty: 45 },
            { keyword: `best ${keyword}`, volume: 6700, difficulty: 72 },
            { keyword: `${keyword} guide`, volume: 5400, difficulty: 38 },
            { keyword: `${keyword} tools`, volume: 4200, difficulty: 58 }
          ]
        }
      ]

      // Generate additional related keywords
      const additionalKeywords = [
        { keyword: `${keyword} software`, volume: 3800, difficulty: 52, cpc: 3.20, competition: 'Medium' },
        { keyword: `${keyword} free`, volume: 9200, difficulty: 35, cpc: 1.80, competition: 'Low' },
        { keyword: `${keyword} online`, volume: 7600, difficulty: 48, cpc: 2.10, competition: 'Medium' },
        { keyword: `${keyword} tutorial`, volume: 5900, difficulty: 42, cpc: 1.95, competition: 'Low' },
        { keyword: `${keyword} course`, volume: 4100, difficulty: 55, cpc: 4.50, competition: 'High' },
        { keyword: `${keyword} certification`, volume: 2800, difficulty: 38, cpc: 5.20, competition: 'Medium' },
        { keyword: `${keyword} training`, volume: 3600, difficulty: 45, cpc: 3.80, competition: 'Medium' },
        { keyword: `${keyword} examples`, volume: 2400, difficulty: 28, cpc: 1.40, competition: 'Low' }
      ]

      setResults([...mockResults, ...additionalKeywords])
      setIsSearching(false)
      toast.success(`Found ${mockResults.length + additionalKeywords.length} keyword opportunities`)
    }, 2000)
  }

  const exportResults = () => {
    const csvContent = [
      ['Keyword', 'Search Volume', 'Difficulty', 'CPC', 'Competition'],
      ...results.map(result => [
        result.keyword,
        result.volume,
        result.difficulty,
        result.cpc || 'N/A',
        result.competition || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = `keyword-research-${keyword}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
    toast.success('Results exported to CSV')
  }

  const getDifficultyColor = (difficulty) => {
    if (difficulty < 30) return 'text-green-600 bg-green-100'
    if (difficulty < 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getCompetitionColor = (competition) => {
    switch (competition) {
      case 'Low': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'High': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Keyword Research Pro</h1>
          <p className="text-gray-600">
            Advanced keyword research with competition analysis and search volume data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Search and Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Keyword Research</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Keyword
                  </label>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter your keyword..."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>

                <button
                  onClick={handleSearch}
                  disabled={isSearching || !keyword.trim()}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isSearching ? (
                    <>
                      <SafeIcon icon={FiIcons.FiLoader} className="w-5 h-5 animate-spin" />
                      <span>Researching...</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiSearch} className="w-5 h-5" />
                      <span>Research Keywords</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Min Search Volume: {filters.minVolume}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={filters.minVolume}
                    onChange={(e) => setFilters({...filters, minVolume: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Difficulty: {filters.maxDifficulty}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.maxDifficulty}
                    onChange={(e) => setFilters({...filters, maxDifficulty: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    value={filters.country}
                    onChange={(e) => setFilters({...filters, country: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) => setFilters({...filters, language: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="it">Italian</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {results.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Keyword Opportunities ({results.length})
                  </h3>
                  <button
                    onClick={exportResults}
                    className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <SafeIcon icon={FiDownload} className="w-4 h-4" />
                    <span>Export CSV</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Keyword</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Volume</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Difficulty</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">CPC</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Competition</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">{result.keyword}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-1">
                              <SafeIcon icon={FiBarChart3} className="w-4 h-4 text-blue-500" />
                              <span className="font-medium text-gray-900">
                                {result.volume?.toLocaleString() || 'N/A'}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(result.difficulty)}`}>
                              {result.difficulty}/100
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-gray-900 font-medium">
                              ${result.cpc || 'N/A'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCompetitionColor(result.competition)}`}>
                              {result.competition || 'N/A'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <SafeIcon 
                              icon={result.trend === 'up' ? FiTrendingUp : FiIcons.FiMinus} 
                              className={`w-4 h-4 ${result.trend === 'up' ? 'text-green-500' : 'text-gray-400'}`}
                            />
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {results.length === 0 && !isSearching && (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <SafeIcon icon={FiSearch} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Start Your Keyword Research
                </h3>
                <p className="text-gray-600">
                  Enter a keyword to discover search volume, difficulty, and related opportunities
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KeywordResearch