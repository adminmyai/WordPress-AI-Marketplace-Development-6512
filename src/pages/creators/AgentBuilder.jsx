import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import toast from 'react-hot-toast'

const { FiCode, FiSave, FiPlay, FiUpload, FiDownload, FiPlus, FiTrash2, FiSettings, FiTerminal } = FiIcons

const AgentBuilder = () => {
  const { id } = useParams()
  const [agentName, setAgentName] = useState('Research Assistant')
  const [description, setDescription] = useState('An AI agent that helps with research and information gathering')
  const [isRunning, setIsRunning] = useState(false)
  const [selectedModel, setSelectedModel] = useState('Auto-GPT')
  const [tools, setTools] = useState([
    { id: 'web-search', name: 'Web Search', enabled: true },
    { id: 'file-io', name: 'File I/O', enabled: true },
    { id: 'code-execution', name: 'Code Execution', enabled: false },
    { id: 'api-calls', name: 'API Calls', enabled: false }
  ])
  const [goal, setGoal] = useState('Research the latest advancements in quantum computing and create a summary report')
  const [memory, setMemory] = useState([])
  const [consoleOutput, setConsoleOutput] = useState('')
  
  // Models available for agents
  const models = [
    { id: 'auto-gpt', name: 'Auto-GPT', description: 'Autonomous GPT-4 powered agent' },
    { id: 'babyagi', name: 'BabyAGI', description: 'Task-driven autonomous agent' },
    { id: 'agentgpt', name: 'AgentGPT', description: 'Browser-based autonomous agent' }
  ]

  // Templates for different agent use cases
  const templates = [
    { 
      id: 'research-assistant', 
      name: 'Research Assistant', 
      description: 'Helps gather and analyze information on specific topics',
      goal: 'Research [TOPIC] and create a detailed report with key findings and sources',
      tools: ['web-search', 'file-io']
    },
    { 
      id: 'code-assistant', 
      name: 'Code Assistant', 
      description: 'Helps write, debug, and optimize code',
      goal: 'Create a [LANGUAGE] program that [FUNCTIONALITY] with proper documentation and tests',
      tools: ['web-search', 'file-io', 'code-execution']
    },
    { 
      id: 'data-analyst', 
      name: 'Data Analyst', 
      description: 'Analyzes data and generates insights',
      goal: 'Analyze the provided dataset and generate insights about [ANALYSIS_GOAL]',
      tools: ['file-io', 'code-execution', 'api-calls']
    }
  ]

  const handleRunAgent = () => {
    if (!goal.trim()) {
      toast.error('Please specify a goal for the agent')
      return
    }
    
    setIsRunning(true)
    setConsoleOutput('')
    setMemory([])
    
    // Simulate agent running with progressive updates
    const steps = [
      '🤖 Initializing agent...',
      `🧠 Using ${selectedModel} with ${tools.filter(t => t.enabled).length} enabled tools`,
      '🔍 Understanding the goal: ' + goal,
      '🌐 Searching the web for relevant information...',
      '📝 Found 5 relevant articles on quantum computing',
      '📊 Analyzing information from sources...',
      '🧪 Extracting key concepts: quantum bits, quantum gates, quantum supremacy',
      '📑 Organizing information into a structured report',
      '✅ Task complete: Report generated'
    ]
    
    let i = 0
    const interval = setInterval(() => {
      if (i < steps.length) {
        setConsoleOutput(prev => prev + steps[i] + '\n\n')
        
        // Add to memory for more complex steps
        if (i > 2) {
          setMemory(prev => [...prev, {
            type: 'action',
            content: steps[i].replace(/^[^:]+: /, ''),
            timestamp: new Date().toISOString()
          }])
        }
        
        i++
      } else {
        clearInterval(interval)
        setIsRunning(false)
        toast.success('Agent task completed')
      }
    }, 1500)
    
    return () => clearInterval(interval)
  }

  const toggleTool = (id) => {
    setTools(tools.map(tool => 
      tool.id === id ? { ...tool, enabled: !tool.enabled } : tool
    ))
  }

  const applyTemplate = (template) => {
    setAgentName(template.name)
    setDescription(template.description)
    setGoal(template.goal)
    
    // Update tools based on template
    setTools(tools.map(tool => ({
      ...tool,
      enabled: template.tools.includes(tool.id)
    })))
    
    toast.success(`Applied ${template.name} template`)
  }

  const exportAgent = () => {
    const agentConfig = {
      name: agentName,
      description,
      model: selectedModel,
      tools: tools.filter(t => t.enabled).map(t => t.id),
      goal,
      memory
    }
    
    const blob = new Blob([JSON.stringify(agentConfig, null, 2)], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = `${agentName.toLowerCase().replace(/\s+/g, '-')}-config.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
    toast.success('Agent configuration exported')
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Agent Workshop</h1>
          <p className="text-gray-600">Build and deploy custom AI agents with various capabilities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Agent Configuration */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agent Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
                  <input
                    type="text"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                  <div className="grid grid-cols-1 gap-2">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setSelectedModel(model.name)}
                        className={`p-3 text-left rounded-lg border ${
                          selectedModel === model.name
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="font-medium">{model.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{model.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tools */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agent Tools</h3>
              <div className="space-y-3">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => toggleTool(tool.id)}
                    className={`p-3 border rounded-lg cursor-pointer ${
                      tool.enabled
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{tool.name}</h4>
                      </div>
                      <div className={`w-5 h-5 rounded-full ${tool.enabled ? 'bg-primary-600' : 'bg-gray-200'} flex items-center justify-center`}>
                        {tool.enabled && (
                          <SafeIcon icon={FiIcons.FiCheck} className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Templates */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Templates</h3>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
                    <p className="text-sm text-gray-500 mb-3">{template.description}</p>
                    <button
                      onClick={() => applyTemplate(template)}
                      className="text-sm bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors"
                    >
                      Use Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Agent Workspace */}
          <div className="lg:col-span-2 space-y-6">
            {/* Goal Setting */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Agent Goal</h3>
              <div>
                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Specify a clear goal for your AI agent..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={handleRunAgent}
                  disabled={isRunning || !goal.trim()}
                  className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isRunning ? (
                    <>
                      <SafeIcon icon={FiIcons.FiLoader} className="w-5 h-5 animate-spin" />
                      <span>Running...</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiPlay} className="w-5 h-5" />
                      <span>Run Agent</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={exportAgent}
                  className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
                >
                  <SafeIcon icon={FiDownload} className="w-5 h-5" />
                  <span>Export</span>
                </button>
              </div>
            </div>
            
            {/* Console Output */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Agent Console</h3>
                <SafeIcon icon={FiTerminal} className="w-5 h-5 text-gray-500" />
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 h-60 overflow-y-auto font-mono text-sm">
                {consoleOutput ? (
                  <pre className="text-green-400 whitespace-pre-wrap">{consoleOutput}</pre>
                ) : (
                  <div className="text-gray-500 h-full flex items-center justify-center">
                    Console output will appear here when you run the agent
                  </div>
                )}
              </div>
            </div>
            
            {/* Memory and Thoughts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Agent Memory</h3>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {memory.length} items
                </span>
              </div>
              
              {memory.length === 0 ? (
                <div className="text-gray-500 h-32 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                  Agent memory will be displayed here as the agent works
                </div>
              ) : (
                <div className="space-y-3">
                  {memory.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="text-sm text-gray-700">{item.content}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(item.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentBuilder