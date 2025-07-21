import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PricingCard from '../components/PricingCard'
import stripePromise from '../config/stripe'
import { supabase } from '../config/supabase'
import useAuthStore from '../store/authStore'
import toast from 'react-hot-toast'

const Pricing = () => {
  const { user } = useAuthStore()

  const plans = [
    {
      name: 'Starter',
      price: 99.99,
      description: 'Perfect for individuals and small teams',
      features: [
        'Access to 100+ AI Templates',
        'Basic SEO Tools',
        '5 Workflow Templates',
        'Email Support',
        'Basic Analytics',
        'Open Source Tools Access'
      ],
      stripeId: 'price_starter'
    },
    {
      name: 'Professional',
      price: 299.99,
      description: 'Best for growing businesses',
      features: [
        'Access to 1000+ AI Templates',
        'Advanced SEO AI Tools',
        '50 Workflow Templates',
        'Priority Support',
        'Advanced Analytics',
        'Custom Bot Templates',
        'N8N Workflow Integration',
        'Auto-Testing Templates'
      ],
      stripeId: 'price_professional'
    },
    {
      name: 'Enterprise',
      price: 999.99,
      description: 'For large organizations',
      features: [
        'Unlimited AI Templates',
        'Next-Level SEO AI Tools',
        'Unlimited Workflows',
        '24/7 Dedicated Support',
        'Custom Analytics Dashboard',
        'White-Label Solutions',
        'API Access',
        'Custom Integrations',
        'Personal AI Consultant'
      ],
      stripeId: 'price_enterprise'
    }
  ]

  const handleSubscribe = async (plan) => {
    if (!user) {
      toast.error('Please sign in to subscribe')
      return
    }

    try {
      toast.success(`Starting ${plan.name} plan subscription process...`)
      // Redirect to registration when not logged in
      if (!user) {
        window.location.href = '/register'
        return
      }
    } catch (error) {
      console.error('Subscription error:', error)
      toast.error('Failed to start subscription process')
    }
  }

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Choose Your AI Power Level
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Get access to premium AI tools, templates, and consulting services.
            All plans include open source tools for maximum profits.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PricingCard
                plan={plan}
                isPopular={plan.name === 'Professional'}
                onSubscribe={handleSubscribe}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Need Custom Solutions?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact us for enterprise-level custom AI solutions and consulting
          </p>
          <a
            href="mailto:contactus@universalai.com"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  )
}

export default Pricing