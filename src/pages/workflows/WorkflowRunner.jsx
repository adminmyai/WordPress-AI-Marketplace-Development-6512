import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import toast from 'react-hot-toast'

const { FiPlay, FiPause, FiStop, FiSettings, FiDownload, FiCheckCircle, FiAlertCircle, FiClock } = FiIcons

const WorkflowRunner = () => {
  const { id } = useParams()
  const [workflow, setWorkflow] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const [executionResults, setExecutionResults] = useState([])
  const [currentStep, setCurrentStep] = useState(null)
  const [settings, setSettings] = useState({
    autoRetry: true,
    maxRetries: 3,
    timeout: 30000,
    saveResults: true
  })

  // Workflow templates based on ID
  const workflowTemplates = {
    1: {
      id: 1,
      name: 'Social Media Automation',
      description: 'Automate content creation and posting across multiple social media platforms',
      nodes: [
        { 
          id: 'trigger-1', 
          type: 'schedule', 
          name: 'Daily Trigger',
          config: { time: '09:00', timezone: 'UTC' },
          description: 'Runs every day at 9 AM'
        },
        { 
          id: 'ai-content', 
          type: 'ai-generate', 
          name: 'Generate Content',
          config: { 
            prompt: 'Create engaging social media content about productivity tips',
            model: 'gpt-3.5-turbo',
            maxLength: 280
          },
          description: 'Generate AI-powered social media content'
        },
        { 
          id: 'twitter-post', 
          type: 'social-post', 
          name: 'Post to Twitter',
          config: { platform: 'twitter', account: '@your_account' },
          description: 'Post content to Twitter'
        },
        { 
          id: 'linkedin-post', 
          type: 'social-post', 
          name: 'Post to LinkedIn',
          config: { platform: 'linkedin', account: 'Your Company' },
          description: 'Post content to LinkedIn'
        },
        { 
          id: 'analytics', 
          type: 'analytics', 
          name: 'Track Performance',
          config: { metrics: ['engagement', 'reach', 'clicks'] },
          description: 'Track post performance metrics'
        }
      ]
    },
    2: {
      id: 2,
      name: 'Lead Generation Pipeline',
      description: 'Capture, qualify, and nurture leads automatically with CRM integration',
      nodes: [
        { 
          id: 'webhook', 
          type: 'webhook', 
          name: 'Lead Capture',
          config: { endpoint: '/leads/capture' },
          description: 'Capture leads from web forms'
        },
        { 
          id: 'validate', 
          type: 'validation', 
          name: 'Validate Lead',
          config: { 
            requiredFields: ['email', 'name'],
            emailValidation: true
          },
          description: 'Validate lead information'
        },
        { 
          id: 'score', 
          type: 'scoring', 
          name: 'Lead Scoring',
          config: { 
            criteria: {
              company_size: 30,
              budget: 40,
              timeline: 30
            }
          },
          description: 'Score leads based on criteria'
        },
        { 
          id: 'crm-sync', 
          type: 'crm', 
          name: 'Sync to CRM',
          config: { system: 'salesforce', pipeline: 'leads' },
          description: 'Add qualified leads to CRM'
        },
        { 
          id: 'email-sequence', 
          type: 'email', 
          name: 'Welcome Email',
          config: { 
            template: 'welcome-sequence',
            delay: 0
          },
          description: 'Send welcome email sequence'
        }
      ]
    },
    3: {
      id: 3,
      name: 'E-commerce Order Processing',
      description: 'Complete order fulfillment workflow from purchase to delivery',
      nodes: [
        { 
          id: 'order-trigger', 
          type: 'webhook', 
          name: 'New Order',
          config: { source: 'shopify', event: 'order.created' },
          description: 'Triggered when new order is placed'
        },
        { 
          id: 'payment-verify', 
          type: 'payment', 
          name: 'Verify Payment',
          config: { processor: 'stripe', action: 'verify' },
          description: 'Verify payment is successful'
        },
        { 
          id: 'inventory-check', 
          type: 'inventory', 
          name: 'Check Inventory',
          config: { system: 'warehouse-api' },
          description: 'Check product availability'
        },
        { 
          id: 'fulfillment', 
          type: 'fulfillment', 
          name: 'Create Shipment',
          config: { carrier: 'fedex', service: 'ground' },
          description: 'Create shipping label and schedule pickup'
        },
        { 
          id: 'customer-notify', 
          type: 'notification', 
          name: 'Notify Customer',
          config: { 
            type: 'email',
            template: 'order-shipped',
            include_tracking: true
          },
          description: 'Send shipping confirmation to customer'
        }
      ]
    }
  }

  useEffect(() => {
    const workflowData = workflowTemplates[parseInt(id)]
    if (workflowData) {
      setWorkflow(workflowData)
    }
  }, [id])

  const executeWorkflow = async () => {
    if (!workflow) return

    setIsRunning(true)
    setExecutionResults([])
    setCurrentStep(0)

    try {
      for (let i = 0; i < workflow.nodes.length; i++) {
        const node = workflow.nodes[i]
        setCurrentStep(i)

        // Simulate node execution
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

        const success = Math.random() > 0.1 // 90% success rate
        const result = {
          nodeId: node.id,
          nodeName: node.name,
          status: success ? 'success' : 'error',
          message: success 
            ? `${node.name} executed successfully`
            : `Error in ${node.name}: Connection timeout`,
          timestamp: new Date().toISOString(),
          duration: Math.floor(Math.random() * 3000) + 500
        }

        setExecutionResults(prev => [...prev, result])

        if (!success && !settings.autoRetry) {
          toast.error(`Workflow failed at step: ${node.name}`)
          break
        }

        if (!success && settings.autoRetry) {
          toast.warning(`Retrying ${node.name}...`)
          await new Promise(resolve => setTimeout(resolve, 1000))
          // Retry logic would go here
        }
      }

      setCurrentStep(null)
      setIsRunning(false)
      toast.success('Workflow completed successfully!')

    } catch (error) {
      setIsRunning(false)
      setCurrentStep(null)
      toast.error('Workflow execution failed')
    }
  }

  const stopWorkflow = () => {
    setIsRunning(false)
    setCurrentStep(null)
    toast.info('Workflow execution stopped')
  }

  const exportResults = () => {
    const exportData = {
      workflow: workflow.name,
      executedAt: new Date().toISOString(),
      results: executionResults,
      settings
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = `workflow-${workflow.id}-results.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
    toast.success('Results exported successfully')
  }

  if (!workflow) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">Loading workflow...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{workflow.name}</h1>
          <p className="text-gray-600">{workflow.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workflow Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Workflow Controls</h3>
              
              <div className="space-y-4">
                <button
                  onClick={executeWorkflow}
                  disabled={isRunning}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isRunning ? (
                    <>
                      <SafeIcon icon={FiIcons.FiLoader} className="w-5 h-5 animate-spin" />
                      <span>Running...</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiPlay} className="w-5 h-5" />
                      <span>Execute Workflow</span>
                    </>
                  )}
                </button>

                {isRunning && (
                  <button
                    onClick={stopWorkflow}
                    className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiStop} className="w-5 h-5" />
                    <span>Stop Execution</span>
                  </button>
                )}

                {executionResults.length > 0 && (
                  <button
                    onClick={exportResults}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <SafeIcon icon={FiDownload} className="w-5 h-5" />
                    <span>Export Results</span>
                  </button>
                )}
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Execution Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Auto Retry</span>
                  <input
                    type="checkbox"
                    checked={settings.autoRetry}
                    onChange={(e) => setSettings({...settings, autoRetry: e.target.checked})}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Max Retries: {settings.maxRetries}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={settings.maxRetries}
                    onChange={(e) => setSettings({...settings, maxRetries: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timeout (seconds): {settings.timeout / 1000}
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="120000"
                    step="10000"
                    value={settings.timeout}
                    onChange={(e) => setSettings({...settings, timeout: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Save Results</span>
                  <input
                    type="checkbox"
                    checked={settings.saveResults}
                    onChange={(e) => setSettings({...settings, saveResults: e.target.checked})}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Visualization and Results */}
          <div className="lg:col-span-2">
            {/* Workflow Steps */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Workflow Steps</h3>
              
              <div className="space-y-4">
                {workflow.nodes.map((node, index) => {
                  const result = executionResults.find(r => r.nodeId === node.id)
                  const isCurrent = currentStep === index
                  const isCompleted = result !== undefined
                  
                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border rounded-lg p-4 ${
                        isCurrent ? 'border-blue-300 bg-blue-50' :
                        isCompleted ? (result.status === 'success' ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50') :
                        'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCurrent ? 'bg-blue-500' :
                            isCompleted ? (result.status === 'success' ? 'bg-green-500' : 'bg-red-500') :
                            'bg-gray-300'
                          }`}>
                            {isCurrent ? (
                              <SafeIcon icon={FiIcons.FiLoader} className="w-4 h-4 text-white animate-spin" />
                            ) : isCompleted ? (
                              result.status === 'success' ? (
                                <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-white" />
                              ) : (
                                <SafeIcon icon={FiAlertCircle} className="w-4 h-4 text-white" />
                              )
                            ) : (
                              <span className="text-white text-sm font-medium">{index + 1}</span>
                            )}
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900">{node.name}</h4>
                            <p className="text-sm text-gray-500">{node.description}</p>
                          </div>
                        </div>

                        {result && (
                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              {result.duration}ms
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(result.timestamp).toLocaleTimeString()}
                            </div>
                          </div>
                        )}
                      </div>

                      {result && result.message && (
                        <div className="mt-3 pl-11">
                          <p className={`text-sm ${
                            result.status === 'success' ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {result.message}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Execution Summary */}
            {executionResults.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Execution Summary</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {executionResults.filter(r => r.status === 'success').length}
                    </div>
                    <div className="text-sm text-gray-600">Successful</div>
                  </div>
                  
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">
                      {executionResults.filter(r => r.status === 'error').length}
                    </div>
                    <div className="text-sm text-gray-600">Failed</div>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {executionResults.reduce((sum, r) => sum + r.duration, 0)}ms
                    </div>
                    <div className="text-sm text-gray-600">Total Time</div>
                  </div>
                </div>

                <div className="space-y-2">
                  {executionResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center space-x-2">
                        <SafeIcon 
                          icon={result.status === 'success' ? FiCheckCircle : FiAlertCircle} 
                          className={`w-4 h-4 ${result.status === 'success' ? 'text-green-500' : 'text-red-500'}`}
                        />
                        <span className="text-sm font-medium">{result.nodeName}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {result.duration}ms
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkflowRunner