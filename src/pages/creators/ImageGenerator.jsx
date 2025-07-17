import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import toast from 'react-hot-toast'

const { FiImage, FiSettings, FiDownload, FiZap, FiGrid, FiSliders, FiPlus, FiTrash2 } = FiIcons

const ImageGenerator = () => {
  const { id } = useParams()
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [generatedImages, setGeneratedImages] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedModel, setSelectedModel] = useState('SD 1.5')
  const [settings, setSettings] = useState({
    width: 512,
    height: 512,
    guidance_scale: 7.5,
    num_inference_steps: 30,
    seed: -1,
    batch_size: 1,
  })

  const fileInputRef = useRef(null)
  
  // Models available for image generation
  const models = [
    { id: 'sd15', name: 'SD 1.5', description: 'Original Stable Diffusion model' },
    { id: 'sd21', name: 'SD 2.1', description: 'Improved image quality and coherence' },
    { id: 'sdxl', name: 'SDXL', description: 'Highest quality with enhanced details' },
  ]

  // Templates for different image styles
  const templates = [
    { 
      id: 'product-photography',
      name: 'Product Photography',
      prompt: 'Professional product photography of [PRODUCT], studio lighting, white background, high resolution, commercial photography, professional photo',
      negativePrompt: 'blurry, low quality, distorted, deformed, amateur'
    },
    { 
      id: 'digital-art',
      name: 'Digital Art',
      prompt: 'Digital art of [SUBJECT], vibrant colors, detailed, fantasy style, 4k, trending on artstation',
      negativePrompt: 'blurry, low quality, distorted, deformed, amateur, photographic'
    },
    { 
      id: 'photorealistic',
      name: 'Photorealistic',
      prompt: 'Photorealistic image of [SUBJECT], 8k, high detail, natural lighting, sharp focus',
      negativePrompt: 'cartoon, painting, drawing, anime, illustration, low quality, blurry'
    }
  ]

  const handleGenerateImages = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }
    
    setIsGenerating(true)
    
    try {
      // Simulate API call to Stable Diffusion
      setTimeout(() => {
        // For demo purposes, generate placeholder images
        const demoImages = Array(settings.batch_size).fill().map((_, i) => ({
          id: `img-${Date.now()}-${i}`,
          url: `https://picsum.photos/${settings.width}/${settings.height}?random=${Math.random()}`,
          prompt,
          settings: { ...settings, model: selectedModel }
        }))
        
        setGeneratedImages(prev => [...demoImages, ...prev])
        setIsGenerating(false)
        toast.success(`Generated ${settings.batch_size} images`)
      }, 2000)
    } catch (error) {
      toast.error('Failed to generate images')
      setIsGenerating(false)
    }
  }

  const handleDownloadImage = (imageUrl) => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `stable-diffusion-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Image downloaded')
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real implementation, this would upload the image
      // and use it for img2img or as a ControlNet reference
      toast.success(`Uploaded ${file.name} as reference image`)
    }
  }

  const applyTemplate = (template) => {
    setPrompt(template.prompt)
    setNegativePrompt(template.negativePrompt)
    toast.success(`Applied ${template.name} template`)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stable Diffusion Studio</h1>
          <p className="text-gray-600">Generate images using Stable Diffusion with advanced controls</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              {/* Prompt Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A professional photograph of a cat wearing a business suit..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Negative Prompt</label>
                <textarea
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="blurry, bad anatomy, low quality..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Model Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <div className="grid grid-cols-3 gap-2">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model.name)}
                      className={`p-2 text-center text-sm rounded-lg border ${
                        selectedModel === model.name
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Dimensions</label>
                  <div className="flex space-x-2">
                    <select
                      value={`${settings.width}x${settings.height}`}
                      onChange={(e) => {
                        const [width, height] = e.target.value.split('x').map(Number)
                        setSettings({ ...settings, width, height })
                      }}
                      className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    >
                      <option value="512x512">512x512</option>
                      <option value="768x768">768x768</option>
                      <option value="512x768">512x768</option>
                      <option value="768x512">768x512</option>
                      <option value="1024x1024">1024x1024</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guidance Scale: {settings.guidance_scale}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={settings.guidance_scale}
                    onChange={(e) =>
                      setSettings({ ...settings, guidance_scale: parseFloat(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Steps: {settings.num_inference_steps}
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="1"
                    value={settings.num_inference_steps}
                    onChange={(e) =>
                      setSettings({ ...settings, num_inference_steps: parseInt(e.target.value) })
                    }
                    className="w-full"
                  />
                </div>

                <div className="flex justify-between">
                  <div className="w-1/2 pr-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seed</label>
                    <input
                      type="number"
                      min="-1"
                      value={settings.seed}
                      onChange={(e) => setSettings({ ...settings, seed: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1 text-sm"
                      placeholder="-1 for random"
                    />
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Batch Size</label>
                    <select
                      value={settings.batch_size}
                      onChange={(e) => setSettings({ ...settings, batch_size: parseInt(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1 text-sm"
                    >
                      <option value="1">1 image</option>
                      <option value="2">2 images</option>
                      <option value="4">4 images</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleGenerateImages}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <SafeIcon icon={FiIcons.FiLoader} className="w-5 h-5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiZap} className="w-5 h-5" />
                      <span>Generate</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiPlus} className="w-5 h-5" />
                  <span>Upload Reference Image</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </button>
              </div>
            </div>

            {/* Templates */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Templates</h3>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{template.prompt}</p>
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

          {/* Generated Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900">Generated Images</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                    <SafeIcon icon={FiGrid} className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                    <SafeIcon icon={FiSliders} className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {generatedImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                  <SafeIcon icon={FiImage} className="w-16 h-16 mb-4" />
                  <p className="text-lg">No images generated yet</p>
                  <p className="text-sm mt-2">Enter a prompt and click Generate</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {generatedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-4">
                        <button
                          onClick={() => handleDownloadImage(image.url)}
                          className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <SafeIcon icon={FiDownload} className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                          onClick={() => {
                            setGeneratedImages(prev => prev.filter(img => img.id !== image.id))
                            toast.success('Image removed')
                          }}
                          className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <SafeIcon icon={FiTrash2} className="w-5 h-5 text-gray-700" />
                        </button>
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

export default ImageGenerator