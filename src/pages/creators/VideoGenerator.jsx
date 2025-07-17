import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as FiIcons from 'react-icons/fi'
import SafeIcon from '../../common/SafeIcon'
import toast from 'react-hot-toast'

const { FiVideo, FiPlay, FiPause, FiUpload, FiDownload, FiZap, FiImage, FiClock } = FiIcons

const VideoGenerator = () => {
  const { id } = useParams()
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [generatedVideos, setGeneratedVideos] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedModel, setSelectedModel] = useState('ModelScope')
  const [currentVideo, setCurrentVideo] = useState(null)
  const [settings, setSettings] = useState({
    frames: 24,
    fps: 8,
    duration: 3,
    width: 512,
    height: 512,
    seed: -1
  })
  
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  
  // Models available for video generation
  const models = [
    { id: 'modelscope', name: 'ModelScope', description: 'Text to video synthesis model' },
    { id: 'text2video-zero', name: 'Text2Video-Zero', description: 'Zero-shot text to video generation' },
    { id: 'animatediff', name: 'AnimateDiff', description: 'Animation from still images' }
  ]

  // Templates for different video styles
  const templates = [
    { 
      id: 'product-showcase',
      name: 'Product Showcase',
      prompt: 'Professional video of [PRODUCT] rotating on a pedestal, studio lighting, white background, high resolution, commercial video',
      negativePrompt: 'blurry, low quality, distorted, deformed'
    },
    { 
      id: 'nature-scene',
      name: 'Nature Scene',
      prompt: 'Beautiful nature scene of [LANDSCAPE], cinematic, 4k, smooth camera movement',
      negativePrompt: 'blurry, low quality, distorted, deformed'
    },
    { 
      id: 'animation',
      name: 'Animation Style',
      prompt: 'Animated video of [SUBJECT], colorful, smooth animation, vibrant colors',
      negativePrompt: 'realistic, photographic, low quality'
    }
  ]

  const handleGenerateVideo = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt')
      return
    }
    
    setIsGenerating(true)
    
    try {
      // Simulate API call to video generation model
      setTimeout(() => {
        // For demo purposes, generate placeholder video
        const demoVideo = {
          id: `vid-${Date.now()}`,
          url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', // Demo video
          thumbnail: `https://picsum.photos/${settings.width}/${settings.height}?random=${Math.random()}`,
          prompt,
          settings: { ...settings, model: selectedModel },
          createdAt: new Date().toISOString()
        }
        
        setGeneratedVideos(prev => [demoVideo, ...prev])
        setIsGenerating(false)
        toast.success('Video generated successfully')
      }, 3000)
    } catch (error) {
      toast.error('Failed to generate video')
      setIsGenerating(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // In a real implementation, this would upload the image
      // and use it for img2vid
      toast.success(`Uploaded ${file.name} as reference image`)
    }
  }

  const handleDownloadVideo = (videoUrl) => {
    const link = document.createElement('a')
    link.href = videoUrl
    link.download = `generated-video-${Date.now()}.mp4`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Video downloaded')
  }

  const applyTemplate = (template) => {
    setPrompt(template.prompt)
    setNegativePrompt(template.negativePrompt)
    toast.success(`Applied ${template.name} template`)
  }

  const playVideo = (video) => {
    setCurrentVideo(video)
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play()
      }
    }, 100)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Generation Lab</h1>
          <p className="text-gray-600">Create videos from text using open-source models</p>
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
                  placeholder="A cinematic shot of a cat wearing a space suit on Mars..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Negative Prompt</label>
                <textarea
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="blurry, bad quality, low resolution..."
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Model Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <div className="grid grid-cols-1 gap-2">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model.name)}
                      className={`p-3 text-left rounded-lg border ${
                        selectedModel === model.name
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">{model.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{model.description}</div>
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
                      <option value="640x480">640x480</option>
                      <option value="768x512">768x512</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="w-1/2 pr-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (s)</label>
                    <select
                      value={settings.duration}
                      onChange={(e) => {
                        const duration = parseInt(e.target.value)
                        setSettings({ ...settings, duration, frames: duration * settings.fps })
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1 text-sm"
                    >
                      <option value="2">2 seconds</option>
                      <option value="3">3 seconds</option>
                      <option value="4">4 seconds</option>
                      <option value="5">5 seconds</option>
                    </select>
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">FPS</label>
                    <select
                      value={settings.fps}
                      onChange={(e) => {
                        const fps = parseInt(e.target.value)
                        setSettings({ ...settings, fps, frames: settings.duration * fps })
                      }}
                      className="w-full border border-gray-300 rounded-lg px-3 py-1 text-sm"
                    >
                      <option value="8">8 fps</option>
                      <option value="12">12 fps</option>
                      <option value="24">24 fps</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-700">Frames</label>
                    <span className="text-xs text-gray-500">{settings.frames} frames</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <SafeIcon icon={FiClock} className="w-3 h-3" />
                    <span>
                      {settings.duration}s @ {settings.fps} fps
                    </span>
                  </div>
                </div>

                <div>
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
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleGenerateVideo}
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
                      <span>Generate Video</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <SafeIcon icon={FiImage} className="w-5 h-5" />
                  <span>Image to Video</span>
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

          {/* Video Preview and Generated Videos */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Video Preview</h2>
              
              {currentVideo ? (
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    src={currentVideo.url}
                    controls
                    className="w-full h-full"
                    poster={currentVideo.thumbnail}
                  ></video>
                  <div className="p-4">
                    <p className="text-sm text-gray-700 font-medium truncate">{currentVideo.prompt}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-gray-500">
                        {new Date(currentVideo.createdAt).toLocaleString()}
                      </div>
                      <button
                        onClick={() => handleDownloadVideo(currentVideo.url)}
                        className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700"
                      >
                        <SafeIcon icon={FiDownload} className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                  <SafeIcon icon={FiVideo} className="w-16 h-16 text-gray-400 mb-4" />
                  <p className="text-gray-500">No video selected</p>
                  <p className="text-sm text-gray-400 mt-2">Generate a video or select from below</p>
                </div>
              )}
            </div>

            {/* Generated Videos */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Generated Videos</h2>
              
              {generatedVideos.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                  <SafeIcon icon={FiVideo} className="w-12 h-12 mb-4" />
                  <p className="text-base">No videos generated yet</p>
                  <p className="text-sm mt-2">Enter a prompt and click Generate</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {generatedVideos.map((video) => (
                    <div
                      key={video.id}
                      className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => playVideo(video)}
                    >
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.prompt}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                            <SafeIcon icon={FiPlay} className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-sm text-gray-700 font-medium truncate">{video.prompt}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-xs text-gray-500">
                            {video.settings.duration}s • {video.settings.model}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDownloadVideo(video.url)
                              }}
                              className="p-1 text-gray-500 hover:text-gray-700"
                            >
                              <SafeIcon icon={FiDownload} className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
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

export default VideoGenerator