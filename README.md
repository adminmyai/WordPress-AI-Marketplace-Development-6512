# Universal AI SaaS Platform

A comprehensive AI consulting platform with ready-to-use templates, workflows, and tools built with React, Supabase, and Stripe.

## Features

- **AI Tools Marketplace**: Next-level SEO AI tools and automation
- **Template Library**: Ready-to-use templates for common AI use cases
- **Workflow Automation**: N8N workflows and SaaS tool templates
- **Membership System**: Tiered pricing with Stripe integration
- **User Authentication**: Secure auth with Supabase
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Live data synchronization

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Payments**: Stripe
- **Animations**: Framer Motion
- **Icons**: React Icons
- **State Management**: Zustand
- **Notifications**: React Hot Toast

## Setup Instructions

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd universal-ai-saas
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase and Stripe credentials

3. **Supabase Setup**
   - Create a new Supabase project
   - Run the SQL schema (see schema.sql)
   - Enable Row Level Security
   - Set up authentication providers

4. **Stripe Setup**
   - Create Stripe account
   - Add products and prices
   - Set up webhooks for subscription management

5. **Run Development Server**
   ```bash
   npm run dev
   ```

## Database Schema

```sql
-- Users table (managed by Supabase Auth)
-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  tier TEXT NOT NULL,
  status TEXT NOT NULL,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Templates table
CREATE TABLE templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price_tier TEXT NOT NULL,
  features JSONB,
  tags TEXT[],
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tools table
CREATE TABLE tools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  price_tier TEXT NOT NULL,
  features JSONB,
  rating DECIMAL(2,1) DEFAULT 0,
  users_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Deployment

This app is ready for deployment on any platform that supports React applications:

- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the build folder or connect via Git
- **AWS S3 + CloudFront**: Upload build files to S3 bucket
- **WordPress Integration**: Build the app and integrate with WordPress

## WordPress Integration

To integrate with your WordPress site (universalai.com):

1. Build the production version:
   ```bash
   npm run build
   ```

2. Upload the `dist` folder contents to your WordPress site
3. Create a custom page template or use the files directly
4. Update your WordPress theme to include the React app

## Features Overview

### Membership Tiers
- **Starter ($99.99/month)**: Basic AI tools and templates
- **Professional ($299.99/month)**: Advanced features and priority support
- **Enterprise ($999.99/month)**: Full access with dedicated support

### AI Tools Categories
- SEO Tools with advanced analytics
- Content creation and optimization
- Chatbot builders with NLP
- Image generation and editing
- Code generation and debugging
- Business analytics and insights

### Template Library
- Customer support agents
- E-commerce chatbots
- Lead generation systems
- Social media automation
- Analytics dashboards
- Workflow automations

## Support

For support, email contactus@universalai.com or visit our help center.

## License

This project is proprietary software. All rights reserved.