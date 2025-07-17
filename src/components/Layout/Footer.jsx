import React from 'react'
import { Link } from 'react-router-dom'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'

const { FiMail, FiTwitter, FiLinkedin, FiGithub } = FiIcons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiIcons.FiZap} className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Universal AI</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              The ultimate AI consulting platform with ready-to-use templates, workflows, and tools. 
              Get real results with our next-level SEO AI tools and comprehensive consulting services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiTwitter} className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiLinkedin} className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiGithub} className="w-5 h-5" />
              </a>
              <a href="mailto:contactus@universalai.com" className="text-gray-400 hover:text-white transition-colors">
                <SafeIcon icon={FiMail} className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/tools" className="text-gray-300 hover:text-white transition-colors">AI Tools</Link></li>
              <li><Link to="/templates" className="text-gray-300 hover:text-white transition-colors">Templates</Link></li>
              <li><Link to="/workflows" className="text-gray-300 hover:text-white transition-colors">Workflows</Link></li>
              <li><Link to="/consulting" className="text-gray-300 hover:text-white transition-colors">Consulting</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/docs" className="text-gray-300 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="mailto:contactus@universalai.com" className="text-gray-300 hover:text-white transition-colors">Email Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Universal AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer