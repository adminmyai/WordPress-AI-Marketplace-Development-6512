import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../common/SafeIcon'

const { FiCheck, FiCpu, FiCode } = FiIcons

const CreationCard = ({ station, index }) => {
  // Map station categories to proper routes
  const getStationRoute = () => {
    switch(station.category) {
      case 'chatbots':
        return `/create/chatbots/${station.id}`;
      case 'image':
        return `/create/image/${station.id}`;
      case 'video':
        return `/create/video/${station.id}`;
      case 'agents':
        return `/create/agents/${station.id}`;
      case 'workflows':
        return `/create/workflows/${station.id}`;
      default:
        return `/create/${station.category}/${station.id}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{station.name}</h3>
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Open Source
          </span>
        </div>
        <div className="p-2 bg-primary-50 rounded-lg">
          <SafeIcon icon={FiCpu} className="w-6 h-6 text-primary-600" />
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{station.description}</p>
      
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Features:</h4>
        <ul className="space-y-1">
          {station.features.map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
              <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {station.models && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Available Models:</h4>
          <div className="flex flex-wrap gap-2">
            {station.models.map((model, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-primary-50 text-primary-600 text-sm rounded"
              >
                {model}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {station.templates && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Workflow Templates:</h4>
          <div className="flex flex-wrap gap-2">
            {station.templates.map((template, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-secondary-50 text-secondary-600 text-sm rounded"
              >
                {template}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex gap-2">
        <Link
          to={getStationRoute()}
          className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
        >
          <SafeIcon icon={FiCode} className="w-4 h-4" />
          <span>Start Creating</span>
        </Link>
      </div>
    </motion.div>
  )
}

export default CreationCard