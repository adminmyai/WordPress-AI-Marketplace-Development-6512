import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import toast from 'react-hot-toast'

const { FiSend, FiMessageSquare, FiSettings, FiSave, FiUpload, FiDownload, FiRefreshCw } = FiIcons

const ChatbotCreator = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('chat')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedModel, setSelectedModel] = useState('Llama-2')
  const [settings, setSettings] = useState({
    temperature: 0.7,
    maxTokens: 1024,
    systemPrompt: 'You are a helpful AI assistant that provides accurate and concise information.',
    knowledgeBase: null
  })
  
  const messagesEndRef = useRef(null)
  
  // Models available for the chatbot
  const models = [
    { id: 'llama2', name: 'Llama-2', description: 'Meta AI\'s open-source large language model' },
    { id: 'mistral', name: 'Mistral-7B', description: 'Efficient and powerful open-source LLM' },
    { id: 'vicuna', name: 'Vicuna', description: 'Fine-tuned LLaMA with conversational abilities' },
    { id: 'openhermes', name: 'OpenHermes', description: 'Instruction-tuned language model' },
  ]
  
  // Templates for different chatbot use cases
  const templates = [
    { 
      id: 'customer-service', 
      name: 'Customer Service', 
      systemPrompt: 'You are a helpful customer service representative. Be polite, professional, and try to resolve customer issues effectively.',
      sampleQuestions: [
        'I haven\'t received my order yet.',
        'How do I return a product?',
        'Can you check the status of my order?'
      ]
    },
    { 
      id: 'technical-support', 
      name: 'Technical Support', 
      systemPrompt: 'You are a technical support specialist. Help users troubleshoot and resolve technical issues with patience and clarity.',
      sampleQuestions: [
        'My application keeps crashing.',
        'How do I reset my password?',
        'I\'m having trouble connecting to the internet.'
      ]
    },
    { 
      id: 'sales-assistant', 
      name: 'Sales Assistant', 
      systemPrompt: 'You are a knowledgeable sales assistant. Help customers find products that meet their needs and provide detailed information about offerings.',
      sampleQuestions: [
        'What product would you recommend for a beginner?',
        'Can you tell me more about your premium plan?',
        'What are the differences between your basic and pro versions?'
      ]
    }
  ]

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || isProcessing) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsProcessing(true)

    try {
      // Simulate API call to LLM
      setTimeout(() => {
        const botResponse = { 
          role: 'assistant', 
          content: `This is a simulated response from the ${selectedModel} model. In a production environment, this would connect to an actual LLM API or a local model.`
        }
        setMessages(prev => [...prev, botResponse])
        setIsProcessing(false)
      }, 1000)
    } catch (error) {
      toast.error('Failed to get response from the model.')
      setIsProcessing(false)
    }
  }

  const applyTemplate = (template) => {
    setSettings(prev => ({
      ...prev,
      systemPrompt: template.systemPrompt
    }))
    toast.success(`Applied ${template.name} template`)
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real implementation, this would process the file
      // and use it as a knowledge base for the chatbot
      setSettings(prev => ({
        ...prev,
        knowledgeBase: file.name
      }))
      toast.success(`Uploaded ${file.name} as knowledge base`)
    }
  }

  const exportChat = () => {
    const chatExport = {
      model: selectedModel,
      settings,
      messages: messages.filter(msg => msg.role !== 'system')
    }
    
    const blob = new Blob([JSON.stringify(chatExport, null, 2)], { type: 'application/json' })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = 'chatbot-conversation.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
    toast.success('Conversation exported successfully')
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Open Source Chatbot Builder</h1>
          <p className="text-gray-600">Create and test custom chatbots using open-source LLMs</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'chat'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMessageSquare} className="w-4 h-4" />
                <span>Chat</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'settings'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiSettings} className="w-4 h-4" />
                <span>Settings</span>
              </div>
            </button>
          </div>

          {/* Chat Interface */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[600px]">
              <div className="flex-1 overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <SafeIcon icon={FiMessageSquare} className="w-16 h-16 mb-4" />
                    <p className="text-lg">Start a conversation with your chatbot</p>
                    <p className="text-sm mt-2">Using model: {selectedModel}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === 'user'
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {message.content}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
              <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    disabled={isProcessing}
                  />
                  <button
                    type="submit"
                    disabled={isProcessing || !input.trim()}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    {isProcessing ? (
                      <SafeIcon icon={FiRefreshCw} className="w-5 h-5 animate-spin" />
                    ) : (
                      <SafeIcon icon={FiSend} className="w-5 h-5" />
                    )}
                    <span>Send</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Settings Interface */}
          {activeTab === 'settings' && (
            <div className="p-6 space-y-6">
              {/* Model Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Model Selection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {models.map((model) => (
                    <div
                      key={model.id}
                      onClick={() => setSelectedModel(model.name)}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        selectedModel === model.name
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{model.name}</h4>
                          <p className="text-sm text-gray-500">{model.description}</p>
                        </div>
                        {selectedModel === model.name && (
                          <div className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                            <SafeIcon icon={FiIcons.FiCheck} className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Templates */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Templates</h3>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                      <p className="text-sm text-gray-500 mb-4">{template.systemPrompt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {template.sampleQuestions.map((question, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {question}
                          </span>
                        ))}
                      </div>
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

              {/* Parameters */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Model Parameters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Temperature: {settings.temperature}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={settings.temperature}
                      onChange={(e) =>
                        setSettings({ ...settings, temperature: parseFloat(e.target.value) })
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>More Deterministic</span>
                      <span>More Random</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Max Tokens: {settings.maxTokens}
                    </label>
                    <input
                      type="range"
                      min="256"
                      max="4096"
                      step="256"
                      value={settings.maxTokens}
                      onChange={(e) =>
                        setSettings({ ...settings, maxTokens: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Shorter</span>
                      <span>Longer</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      System Prompt
                    </label>
                    <textarea
                      value={settings.systemPrompt}
                      onChange={(e) => setSettings({ ...settings, systemPrompt: e.target.value })}
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Knowledge Base */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Knowledge Base</h3>
                <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="mb-4">
                    <SafeIcon icon={FiUpload} className="w-10 h-10 text-gray-400 mx-auto" />
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload documents to use as a knowledge base for your chatbot
                  </p>
                  <div className="flex flex-col items-center space-y-2">
                    <label className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors cursor-pointer">
                      <span>Upload Files</span>
                      <input
                        type="file"
                        accept=".pdf,.txt,.doc,.docx"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    {settings.knowledgeBase && (
                      <p className="text-sm text-gray-600">
                        Current: <span className="font-medium">{settings.knowledgeBase}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={exportChat}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4" />
                  <span>Export Chat</span>
                </button>
                <button
                  onClick={() => {
                    toast.success('Chatbot settings saved!')
                    setActiveTab('chat')
                  }}
                  className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <SafeIcon icon={FiSave} className="w-4 h-4" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatbotCreator