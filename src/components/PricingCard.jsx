import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'
import useAuthStore from '../store/authStore'

const { FiCheck, FiZap, FiStar, FiCrown } = FiIcons

const PricingCard = ({ plan, isPopular, onSubscribe }) => {
  const { user } = useAuthStore()

  const getIcon = (tier) => {
    switch (tier) {
      case 'Starter': return FiZap
      case 'Professional': return FiStar
      case 'Enterprise': return FiCrown
      default: return FiZap
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative bg-white rounded-2xl shadow-xl p-8 ${isPopular ? 'ring-2 ring-primary-500' : ''}`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mb-4">
          <SafeIcon icon={getIcon(plan.name)} className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <div className="text-4xl font-bold text-gray-900 mb-2">
          ${plan.price} <span className="text-lg font-normal text-gray-600">/month</span>
        </div>
        <p className="text-gray-600">{plan.description}</p>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3">
            <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {user ? (
        <button
          onClick={() => onSubscribe(plan)}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isPopular 
              ? 'bg-primary-600 text-white hover:bg-primary-700' 
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          Upgrade Now
        </button>
      ) : (
        <Link
          to="/register"
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors text-center block ${
            isPopular 
              ? 'bg-primary-600 text-white hover:bg-primary-700' 
              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
          }`}
        >
          Get Started
        </Link>
      )}
    </motion.div>
  )
}

export default PricingCard