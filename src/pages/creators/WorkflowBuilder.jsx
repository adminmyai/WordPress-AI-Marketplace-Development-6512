import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import toast from 'react-hot-toast'

const { 
  FiGitBranch, FiPlus, FiSave, FiPlay, FiDownload, FiTrash2, 
  FiArrowRight, FiCheckCircle, FiAlertCircle, FiClock, FiShare2
} = FiIcons

const WorkflowBuilder = () => {
  const { id } = useParams()
  const [workflowName, setWorkflowName] = useState('Social Media Automation')
  const [description, setDescription] = useState('Automate content creation and posting to social media platforms')
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState(null)
  const [nodes, setNodes] = useState([
    { 
      id: 'node-1', 
      type: 'trigger', 
      name: 'Schedule',
      description: 'Trigger workflow on schedule',
      config: { frequency: 'daily', time: '09:00' }
    },
    { 
      id: 'node-2', 
      type: 'action', 
      name: 'Generate Content',
      description: 'Generate social media content with AI',
      config: { prompt: 'Create engaging content about [TOPIC]', model: 'GPT-3.5' }
    },
    { 
      id: 'node-3', 
      type: 'action', 
      name: 'Post to Twitter',
      description: 'Post the generated content to Twitter',
      config: { account: '@example', includeImage: true }
    },
    { 
      id: 'node-4', 
      type: 'action', 
      name: 'Post to LinkedIn',
      description: 'Post the generated content to LinkedIn',
      config: { account: 'Example Company', includeImage: true }
    }
  ])
  const [connections, setConnections] = useState([
    { id: 'conn-1', from: 'node-1', to: 'node-2' },
    { id: 'conn-2', from: 'node-2', to: 'node-3' },
    { id: 'conn-3', from: 'node-2', to: 'node-4' }
  ])
  
  // Templates for different workflow use cases
  const templates = [
    { 
      id: 'social-media-automation', 
      name: 'Social Media Automation', 
      description: 'Automate content creation and posting to social media platforms',
      nodes: [
        { id: 'node-1', type: 'trigger', name: 'Schedule', config: { frequency: 'daily', time: '09:00' } },
        { id: 'node-2', type: 'action', name: 'Generate Content', config: { prompt: 'Create engaging content about [TOPIC]', model: 'GPT-3.5' } },
        { id: 'node-3', type: 'action', name: 'Post to Twitter', config: { account: '@example', includeImage: true } },
        { id: 'node-4', type: 'action', name: 'Post to LinkedIn', config: { account: 'Example Company', includeImage: true } }
      ],
      connections: [
        { id: 'conn-1', from: 'node-1', to: 'node-2' },
        { id: 'conn-2', from: 'node-2', to: 'node-3' },
        { id: 'conn-3', from: 'node-2', to: 'node-4' }
      ]
    },
    { 
      id: 'data-processing', 
      name: 'Data Processing', 
      description: 'Automate data collection, processing, and analysis',
      nodes: [
        { id: 'node-1', type: 'trigger', name: 'New File in Folder', config: { folder: '/data/incoming' } },
        { id: 'node-2', type: 'action', name: 'Process CSV', config: { delimiter: ',', hasHeader: true } },
        { id: 'node-3', type: 'action', name: 'Transform Data', config: { operations: ['remove_duplicates', 'normalize'] } },
        { id: 'node-4', type: 'action', name: 'Save to Database', config: { connection: 'postgres', table: 'processed_data' } }
      ],
      connections: [
        { id: 'conn-1', from: 'node-1', to: 'node-2' },
        { id: 'conn-2', from: 'node-2', to: 'node-3' },
        { id: 'conn-3', from: 'node-3', to: 'node-4' }
      ]
    },
    { 
      id: 'api-integration', 
      name: 'API Integration', 
      description: 'Connect and integrate multiple API services',
      nodes: [
        { id: 'node-1', type: 'trigger', name: 'Webhook', config: { endpoint: '/incoming-webhook' } },
        { id: 'node-2', type: 'action', name: 'Parse Request', config: { extractFields: ['customer_id', 'product_id'] } },
        { id: 'node-3', type: 'action', name: 'CRM API Request', config: { endpoint: '/api/customers', method: 'GET' } },
        { id: 'node-4', type: 'action', name: 'Notification Service', config: { channel: 'email', template: 'order_confirmation' } }
      ],
      connections: [
        { id: 'conn-1', from: 'node-1', to: 'node-2' },
        { id: 'conn-2', from: 'node-2', to: 'node-3' },
        { id: 'conn-3', from: 'node-3', to: 'node-4' }
      ]
    }
  ]

  const nodeTypes = [
    { type: 'trigger', name: 'Trigger', description: 'Start the workflow', icon: FiIcons.FiPower },
    { type: 'action', name: 'Action', description: 'Perform a task', icon: FiIcons.FiActivity },
    { type: 'condition', name: 'Condition', description: 'Branch based on conditions', icon: FiIcons.FiGitBranch },
    { type: 'loop', name: 'Loop', description: 'Repeat actions', icon: FiIcons.FiRepeat }
  ]

  const handleTestWorkflow = () => {
    setIsRunning(true)
    setTestResults(null)
    
    // Simulate workflow testing
    setTimeout(() => {
      const results = [
        { nodeId: 'node-1', status: 'success', message: 'Trigger activated successfully', time: '0.2s' },
        { nodeId: 'node-2', status: 'success', message: 'Content generated: "5 tips for improving productivity..."', time: '1.5s' },
        { nodeId: 'node-3', status: 'success', message: 'Posted to Twitter successfully', time: '0.8s' },
        { nodeId: 'node-4', status: 'success', message: 'Posted to LinkedIn successfully', time: '1.2s' }
      ]
      
      setTestResults(results)
      setIsRunning(false)
      toast.success('Workflow test completed successfully')
    }, 3000)
  }

  const applyTemplate = (template) => {
    setWorkflowName(template.name)
    setDescription(template.description)
    setNodes(template.nodes)
    setConnections(template.connections)
    setTestResults(null)
    toast.success(`Applied ${template.name} template`)
  }

  const addNode = (type) => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: type,
      name: `New ${nodeTypes.find(t => t.type === type).name}`,
      description: `Description for new ${type}`,
      config: {}
    }
    
    setNodes([...nodes, newNode])
    toast.success(`Added new ${type} node`)
  }

  const exportWorkflow = () => {
    const workflow = {
      name: workflowName,
      description,
      nodes,
      connections
    }
    
    const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = `${workflowName.toLowerCase().replace(/\s+/g, '-')}-workflow.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
    toast.success('Workflow exported successfully')
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">N8N Workflow Creator</h1>
          <p className="text-gray-600">Create and test automated workflows with n8n</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workflow Configuration */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Workflow Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Workflow Name</label>
                  <input
                    type="text"
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
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
              </div>
            </div>
            
            {/* Add Nodes */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add Nodes</h3>
              <div className="grid grid-cols-2 gap-3">
                {nodeTypes.map((nodeType) => (
                  <button
                    key={nodeType.type}
                    onClick={() => addNode(nodeType.type)}
                    className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <SafeIcon icon={nodeType.icon} className="w-5 h-5 text-primary-600" />
                      <span className="font-medium text-gray-900">{nodeType.name}</span>
                    </div>
                    <p className="text-xs text-gray-500">{nodeType.description}</p>
                  </button>
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
          
          {/* Workflow Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Workflow Canvas */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Workflow Builder</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={handleTestWorkflow}
                    disabled={isRunning}
                    className="flex items-center space-x-1 px-3 py-1 bg-primary-600 text-white text-sm rounded hover:bg-primary-700 transition-colors disabled:opacity-50"
                  >
                    {isRunning ? (
                      <SafeIcon icon={FiIcons.FiLoader} className="w-4 h-4 animate-spin" />
                    ) : (
                      <SafeIcon icon={FiPlay} className="w-4 h-4" />
                    )}
                    <span>Test</span>
                  </button>
                  
                  <button
                    onClick={exportWorkflow}
                    className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors"
                  >
                    <SafeIcon icon={FiDownload} className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 min-h-[400px] bg-gray-50 relative">
                <div className="flex flex-col space-y-4">
                  {nodes.map((node, index) => {
                    const nodeType = nodeTypes.find(t => t.type === node.type)
                    const outgoingConnections = connections.filter(conn => conn.from === node.id)
                    
                    return (
                      <div key={node.id} className="relative">
                        <div className={`
                          border rounded-lg p-4 bg-white shadow-sm w-full max-w-md
                          ${testResults && testResults.find(r => r.nodeId === node.id)?.status === 'success' ? 'border-green-300' : ''}
                          ${testResults && testResults.find(r => r.nodeId === node.id)?.status === 'error' ? 'border-red-300' : ''}
                        `}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-primary-50 rounded-lg">
                                <SafeIcon icon={nodeType?.icon} className="w-5 h-5 text-primary-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{node.name}</h4>
                                <p className="text-xs text-gray-500">{node.description || `${nodeType?.name} node`}</p>
                              </div>
                            </div>
                            
                            {testResults && testResults.find(r => r.nodeId === node.id) && (
                              <div className="flex items-center space-x-1">
                                {testResults.find(r => r.nodeId === node.id).status === 'success' ? (
                                  <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-500" />
                                ) : (
                                  <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-red-500" />
                                )}
                                <span className="text-xs text-gray-500">
                                  {testResults.find(r => r.nodeId === node.id).time}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          {/* Node config summary */}
                          {Object.keys(node.config || {}).length > 0 && (
                            <div className="mt-3 text-xs text-gray-600 border-t border-gray-100 pt-2">
                              {Object.entries(node.config).map(([key, value], i) => (
                                <div key={i} className="flex justify-between">
                                  <span className="font-medium">{key}:</span>
                                  <span>{typeof value === 'object' ? JSON.stringify(value) : value.toString()}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Connections */}
                        {outgoingConnections.length > 0 && (
                          <div className="flex items-center justify-center my-2">
                            <SafeIcon icon={FiArrowRight} className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            
            {/* Test Results */}
            {testResults && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Test Results</h3>
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiClock} className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {testResults.reduce((sum, r) => sum + parseFloat(r.time), 0).toFixed(1)}s total
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {testResults.map((result, index) => {
                    const node = nodes.find(n => n.id === result.nodeId)
                    return (
                      <div
                        key={index}
                        className={`border rounded-lg p-3 ${
                          result.status === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {result.status === 'success' ? (
                              <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-500" />
                            ) : (
                              <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-red-500" />
                            )}
                            <span className="font-medium text-gray-900">{node?.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">{result.time}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1 pl-7">{result.message}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkflowBuilder