import React, { useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import AITools from './pages/AITools'
import Templates from './pages/Templates'
import Workflows from './pages/Workflows'
import SEOTools from './pages/SEOTools'
import Pricing from './pages/Pricing'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard'
import AICreationStation from './pages/AICreationStation'
import ChatbotCreator from './pages/creators/ChatbotCreator'
import ImageGenerator from './pages/creators/ImageGenerator'
import VideoGenerator from './pages/creators/VideoGenerator'
import AgentBuilder from './pages/creators/AgentBuilder'
import WorkflowBuilder from './pages/creators/WorkflowBuilder'
import WorkflowRunner from './pages/workflows/WorkflowRunner'
import KeywordResearch from './pages/seo/KeywordResearch'
import ContentOptimizer from './pages/seo/ContentOptimizer'
import ResearchAgent from './pages/agents/ResearchAgent'
import useAuthStore from './store/authStore'
import './index.css'

function App() {
  const { initialize, loading } = useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <Router>
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff'
            }
          }}
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/tools" element={<Layout><AITools /></Layout>} />
          <Route path="/templates" element={<Layout><Templates /></Layout>} />
          <Route path="/workflows" element={<Layout><Workflows /></Layout>} />
          <Route path="/workflows/:id/builder" element={<Layout><WorkflowRunner /></Layout>} />
          <Route path="/seo-tools" element={<Layout><SEOTools /></Layout>} />
          <Route path="/seo-tools/1" element={<Layout><KeywordResearch /></Layout>} />
          <Route path="/seo-tools/2" element={<Layout><ContentOptimizer /></Layout>} />
          <Route path="/agents/research" element={<Layout><ResearchAgent /></Layout>} />
          <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
          <Route path="/create" element={<Layout><AICreationStation /></Layout>} />
          <Route path="/create/chatbots/:id" element={<Layout><ChatbotCreator /></Layout>} />
          <Route path="/create/image/:id" element={<Layout><ImageGenerator /></Layout>} />
          <Route path="/create/video/:id" element={<Layout><VideoGenerator /></Layout>} />
          <Route path="/create/agents/:id" element={<Layout><AgentBuilder /></Layout>} />
          <Route path="/create/workflows/:id" element={<Layout><WorkflowBuilder /></Layout>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App