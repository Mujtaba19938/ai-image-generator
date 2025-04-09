// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
const App: React.FC = () => {
const [prompt, setPrompt] = useState('');
const [isGenerating, setIsGenerating] = useState(false);
const [generatedImage, setGeneratedImage] = useState('');
const [savedImages, setSavedImages] = useState<Array<{id: number, url: string, prompt: string}>>([]);
const [activeTab, setActiveTab] = useState('home');
const [isVoiceRecording, setIsVoiceRecording] = useState(false);
const [showExamples, setShowExamples] = useState(true);
const [darkMode, setDarkMode] = useState(false);
// Example prompts that users can click on
const examplePrompts = [
"A futuristic cityscape with flying cars and neon lights",
"A magical forest with glowing mushrooms and fairy lights",
"An underwater kingdom with mermaids and colorful coral reefs",
"A steampunk-inspired mechanical dragon"
];
useEffect(() => {
if (generatedImage) {
const newSavedImage = {
id: Date.now(),
url: generatedImage,
prompt: prompt
};
setSavedImages(prev => [newSavedImage, ...prev]);
}
}, [generatedImage]);
useEffect(() => {
if (activeTab === 'analytics') {
const chartDom = document.getElementById('analytics-chart');
if (chartDom) {
const myChart = echarts.init(chartDom);
const option = {
animation: false,
title: {
text: 'Image Generation Statistics',
left: 'center',
textStyle: {
color: darkMode ? '#e5e7eb' : '#333'
}
},
tooltip: {
trigger: 'axis'
},
legend: {
data: ['Images Generated', 'Saved Images'],
bottom: 10,
textStyle: {
color: darkMode ? '#e5e7eb' : '#333'
}
},
xAxis: {
type: 'category',
data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
axisLine: {
lineStyle: {
color: darkMode ? '#4b5563' : '#d1d5db'
}
},
axisLabel: {
color: darkMode ? '#9ca3af' : '#6b7280'
}
},
yAxis: {
type: 'value',
axisLine: {
lineStyle: {
color: darkMode ? '#4b5563' : '#d1d5db'
}
},
axisLabel: {
color: darkMode ? '#9ca3af' : '#6b7280'
},
splitLine: {
lineStyle: {
color: darkMode ? '#374151' : '#e5e7eb'
}
}
},
series: [
{
name: 'Images Generated',
type: 'line',
data: [12, 8, 15, 9, 23, 18, 10]
},
{
name: 'Saved Images',
type: 'line',
data: [5, 3, 8, 4, 12, 7, 6]
}
]
};
myChart.setOption(option);
return () => {
myChart.dispose();
};
}
}
}, [activeTab, darkMode]);
const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setPrompt(e.target.value);
};
const handleExampleClick = (example: string) => {
setPrompt(example);
setShowExamples(false);
};
const handleGenerateImage = () => {
if (!prompt.trim()) return;
setIsGenerating(true);
// Simulate API call with timeout
setTimeout(() => {
// Generate a random image using Stable Diffusion API
const imagePrompt = encodeURIComponent(prompt);
const imageUrl = `https://readdy.ai/api/search-image?query=Photorealistic high quality image of ${imagePrompt}. Highly detailed with perfect lighting, 8k resolution, professional photography with dramatic composition and artistic flair. Beautiful color grading with perfect exposure and contrast. Cinematic atmosphere with depth of field&width=800&height=600&seq=12345&orientation=landscape`;
setGeneratedImage(imageUrl);
setIsGenerating(false);
}, 2000);
};
const handleVoiceInput = () => {
setIsVoiceRecording(!isVoiceRecording);
// In a real app, this would trigger the Web Speech API
if (!isVoiceRecording) {
// Simulate voice recording
setTimeout(() => {
setPrompt("A magical forest with glowing mushrooms and fairy lights");
setIsVoiceRecording(false);
}, 2000);
}
};
const handleDeleteImage = (id: number) => {
setSavedImages(prev => prev.filter(img => img.id !== id));
};
const handleDownloadImage = (url: string) => {
// In a real app, this would trigger a download
window.open(url, '_blank');
};
const handleShareImage = (url: string) => {
// In a real app, this would open a share dialog
alert('Sharing functionality would be implemented here');
};
return (
<div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
{/* Header */}
<header className={`${darkMode ? 'bg-gray-800 shadow-md' : 'bg-white shadow-sm'}`}>
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
<div className="flex items-center">
<i className="fas fa-brain text-purple-600 text-2xl mr-2"></i>
<h1 className="text-xl font-bold text-purple-600">DreamCanvas AI</h1>
</div>
<nav className="flex items-center space-x-6">
<button
onClick={() => setActiveTab('home')}
className={`px-3 py-2 cursor-pointer whitespace-nowrap ${activeTab === 'home' ? 'text-purple-600 font-medium' : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}`}
>
Home
</button>
<button
onClick={() => setActiveTab('gallery')}
className={`px-3 py-2 cursor-pointer whitespace-nowrap ${activeTab === 'gallery' ? 'text-purple-600 font-medium' : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}`}
>
Gallery
</button>
<button
onClick={() => setActiveTab('analytics')}
className={`px-3 py-2 cursor-pointer whitespace-nowrap ${activeTab === 'analytics' ? 'text-purple-600 font-medium' : `${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}`}
>
Analytics
</button>
<button
onClick={() => setDarkMode(!darkMode)}
className={`ml-4 p-2 rounded-full transition cursor-pointer !rounded-button whitespace-nowrap ${darkMode ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'}`}
>
<i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
</button>
<a href="https://readdy.ai/home/535d3084-10fb-4a33-bba0-69e99028ec14/630d6354-089b-4494-b7eb-1d7f41c4e9de" data-readdy="true" className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition cursor-pointer !rounded-button whitespace-nowrap">
<i className="fas fa-user-circle"></i>
<span>Sign In</span>
</a>
</nav>
</div>
</header>
{/* Main Content */}
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
{activeTab === 'home' && (
<>
{/* Hero Section */}
<div className="relative rounded-xl overflow-hidden mb-12 bg-gradient-to-r from-purple-900 to-indigo-800 text-white">
<div className="flex flex-col md:flex-row">
<div className="p-8 md:p-12 md:w-1/2 z-10">
<h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Ideas Into Stunning Images</h2>
<p className="text-lg mb-6 text-purple-100">
Harness the power of AI to create beautiful, unique visuals from simple text descriptions.
Perfect for artists, designers, and creative minds.
</p>
<button
onClick={() => document.getElementById('prompt-input')?.focus()}
className="bg-white text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition shadow-lg cursor-pointer !rounded-button whitespace-nowrap"
>
Start Creating Now
</button>
</div>
<div className="md:w-1/2 h-64 md:h-auto">
<img
src="https://public.readdy.ai/ai/img_res/b6af8ecbe231dd736c49c150edcfc126.jpg"
alt="AI Image Generation"
className="w-full h-full object-cover"
/>
</div>
</div>
</div>
{/* Prompt Input Section */}
<div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 mb-8`}>
<h2 className="text-xl font-semibold mb-4">Create Your Image</h2>
<div className="relative mb-4">
<div className="flex">
<input
id="prompt-input"
type="text"
value={prompt}
onChange={handlePromptChange}
placeholder="Describe the image you want to create..."
className={`w-full px-4 py-3 border rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'}`}
onFocus={() => setShowExamples(true)}
/>
<button
onClick={handleVoiceInput}
className={`px-4 border border-l-0 cursor-pointer !rounded-button whitespace-nowrap ${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300'} ${isVoiceRecording ? 'text-red-500' : darkMode ? 'text-gray-300' : 'text-gray-500'}`}
>
<i className={`fas ${isVoiceRecording ? 'fa-stop' : 'fa-microphone'}`}></i>
</button>
<button
onClick={handleGenerateImage}
disabled={isGenerating || !prompt.trim()}
className="ml-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer !rounded-button whitespace-nowrap"
>
{isGenerating ? (
<span className="flex items-center">
<i className="fas fa-spinner fa-spin mr-2"></i>
Generating...
</span>
) : (
<span className="flex items-center">
<i className="fas fa-magic mr-2"></i>
Generate
</span>
)}
</button>
</div>
{showExamples && prompt === '' && (
<div className="mt-3">
<p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Try these examples:</p>
<div className="flex flex-wrap gap-2">
{examplePrompts.map((example, index) => (
<button
key={index}
onClick={() => handleExampleClick(example)}
className={`px-3 py-1 text-sm transition cursor-pointer !rounded-button whitespace-nowrap rounded-full ${darkMode ? 'bg-purple-900 text-purple-300 hover:bg-purple-800' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
>
{example.length > 30 ? example.substring(0, 30) + '...' : example}
</button>
))}
</div>
</div>
)}
</div>
{/* Advanced Options (collapsed by default) */}
<div className={`border-t pt-4 mt-4 ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
<button className={`flex items-center text-sm cursor-pointer !rounded-button whitespace-nowrap ${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
<i className="fas fa-sliders-h mr-2"></i>
Advanced Options
<i className="fas fa-chevron-down ml-2"></i>
</button>
</div>
</div>
{/* Generated Image Display */}
{generatedImage && (
<div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 mb-8`}>
<h2 className="text-xl font-semibold mb-4">Your Generated Image</h2>
<div className="relative group">
<img
src={generatedImage}
alt="AI Generated"
className="w-full h-auto rounded-lg shadow-sm"
/>
<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
<div className="flex space-x-3">
<button
onClick={() => handleDownloadImage(generatedImage)}
className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-download text-gray-700"></i>
</button>
<button
onClick={() => handleShareImage(generatedImage)}
className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-share-alt text-gray-700"></i>
</button>
<button
className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-heart text-gray-700"></i>
</button>
</div>
</div>
</div>
<div className="mt-4">
<h3 className="text-sm font-medium text-gray-500">Prompt</h3>
<p className="text-gray-700">{prompt}</p>
</div>
</div>
)}
{/* Recent Generations */}
{savedImages.length > 0 && (
<div className="mb-8">
<div className="flex justify-between items-center mb-4">
<h2 className="text-xl font-semibold">Recent Generations</h2>
<button
onClick={() => setActiveTab('gallery')}
className="text-purple-600 hover:text-purple-800 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
>
View All <i className="fas fa-arrow-right ml-1"></i>
</button>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
{savedImages.slice(0, 3).map(image => (
<div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden group relative">
<img
src={image.url}
alt={image.prompt}
className="w-full h-48 object-cover"
/>
<div className="p-3">
<p className={`text-sm line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{image.prompt}</p>
</div>
<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
<div className="flex space-x-2">
<button
onClick={() => handleDownloadImage(image.url)}
className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-download text-gray-700"></i>
</button>
<button
onClick={() => handleShareImage(image.url)}
className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-share-alt text-gray-700"></i>
</button>
<button
onClick={() => handleDeleteImage(image.id)}
className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-trash text-gray-700"></i>
</button>
</div>
</div>
</div>
))}
</div>
</div>
)}
{/* Feature Highlights */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
<div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6`}>
<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
<i className="fas fa-bolt text-purple-600 text-xl"></i>
</div>
<h3 className="text-lg font-semibold mb-2">Fast Generation</h3>
<p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Create stunning images in seconds with our powerful AI models.</p>
</div>
<div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6`}>
<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
<i className="fas fa-paint-brush text-blue-600 text-xl"></i>
</div>
<h3 className="text-lg font-semibold mb-2">Creative Control</h3>
<p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Fine-tune your creations with advanced customization options.</p>
</div>
<div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6`}>
<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
<i className="fas fa-cloud-download-alt text-green-600 text-xl"></i>
</div>
<h3 className="text-lg font-semibold mb-2">Easy Sharing</h3>
<p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Download and share your creations across all your favorite platforms.</p>
</div>
</div>
</>
)}
{activeTab === 'gallery' && (
<div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6`}>
<h2 className="text-xl font-semibold mb-6">Your Image Gallery</h2>
{savedImages.length === 0 ? (
<div className="text-center py-12">
<div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
<i className={`fas fa-images text-2xl ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}></i>
</div>
<h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>No images yet</h3>
<p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Generate your first image to start building your gallery</p>
<button
onClick={() => setActiveTab('home')}
className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition cursor-pointer !rounded-button whitespace-nowrap"
>
Create an Image
</button>
</div>
) : (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
{savedImages.map(image => (
<div key={image.id} className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden group relative`}>
<img
src={image.url}
alt={image.prompt}
className="w-full h-48 object-cover"
/>
<div className="p-3">
<p className={`text-sm line-clamp-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{image.prompt}</p>
</div>
<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
<div className="flex space-x-2">
<button
onClick={() => handleDownloadImage(image.url)}
className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-download text-gray-700"></i>
</button>
<button
onClick={() => handleShareImage(image.url)}
className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-share-alt text-gray-700"></i>
</button>
<button
onClick={() => handleDeleteImage(image.id)}
className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition cursor-pointer !rounded-button whitespace-nowrap"
>
<i className="fas fa-trash text-gray-700"></i>
</button>
</div>
</div>
</div>
))}
</div>
)}
</div>
)}
{activeTab === 'analytics' && (
<div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6`}>
<h2 className="text-xl font-semibold mb-6">Analytics Dashboard</h2>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
<div className="bg-purple-50 rounded-lg p-4">
<div className="flex justify-between items-start">
<div>
<p className="text-sm text-purple-600 font-medium">Total Images</p>
<h3 className="text-2xl font-bold mt-1">{savedImages.length}</h3>
</div>
<div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
<i className="fas fa-images text-purple-600"></i>
</div>
</div>
<p className="text-xs text-purple-500 mt-2">
<i className="fas fa-arrow-up mr-1"></i>
12% increase from last week
</p>
</div>
<div className="bg-blue-50 rounded-lg p-4">
<div className="flex justify-between items-start">
<div>
<p className="text-sm text-blue-600 font-medium">API Credits</p>
<h3 className="text-2xl font-bold mt-1">250</h3>
</div>
<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
<i className="fas fa-ticket-alt text-blue-600"></i>
</div>
</div>
<p className="text-xs text-blue-500 mt-2">
<i className="fas fa-arrow-down mr-1"></i>
50 used this month
</p>
</div>
<div className="bg-green-50 rounded-lg p-4">
<div className="flex justify-between items-start">
<div>
<p className="text-sm text-green-600 font-medium">Downloads</p>
<h3 className="text-2xl font-bold mt-1">45</h3>
</div>
<div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
<i className="fas fa-download text-green-600"></i>
</div>
</div>
<p className="text-xs text-green-500 mt-2">
<i className="fas fa-arrow-up mr-1"></i>
8% increase from last week
</p>
</div>
</div>
<div className="mb-8">
<h3 className="text-lg font-medium mb-4">Usage Statistics</h3>
<div id="analytics-chart" style={{ width: '100%', height: '400px' }}></div>
</div>
<div>
<h3 className="text-lg font-medium mb-4">Recent Activity</h3>
<div className="border rounded-lg overflow-hidden">
<table className="min-w-full divide-y divide-gray-200">
<thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
<tr>
<th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Date</th>
<th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Prompt</th>
<th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Status</th>
</tr>
</thead>
<tbody className={`${darkMode ? 'bg-gray-800 divide-y divide-gray-700' : 'bg-white divide-y divide-gray-200'}`}>
{savedImages.slice(0, 5).map((image, index) => (
<tr key={image.id}>
<td className={`px-6 py-4 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
{new Date(image.id).toLocaleDateString()}
</td>
<td className={`px-6 py-4 text-sm max-w-xs truncate ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
{image.prompt}
</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
Completed
</span>
</td>
</tr>
))}
{savedImages.length === 0 && (
<tr>
<td colSpan={3} className={`px-6 py-4 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
No activity yet
</td>
</tr>
)}
</tbody>
</table>
</div>
</div>
</div>
)}
</main>
{/* Footer */}
<footer className="bg-gray-800 text-white py-12">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
<div>
<div className="flex items-center mb-4">
<i className="fas fa-brain text-purple-400 text-2xl mr-2"></i>
<h3 className="text-xl font-bold text-white">DreamCanvas AI</h3>
</div>
<p className="text-gray-400 mb-4">
Transform your ideas into stunning visuals with the power of AI.
</p>
<div className="flex space-x-4">
<a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
<i className="fab fa-twitter"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
<i className="fab fa-facebook"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
<i className="fab fa-instagram"></i>
</a>
<a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">
<i className="fab fa-github"></i>
</a>
</div>
</div>
<div>
<h4 className="text-lg font-medium mb-4">Product</h4>
<ul className="space-y-2">
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Features</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Pricing</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">API</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Integrations</a></li>
</ul>
</div>
<div>
<h4 className="text-lg font-medium mb-4">Resources</h4>
<ul className="space-y-2">
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Documentation</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Tutorials</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Blog</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Support</a></li>
</ul>
</div>
<div>
<h4 className="text-lg font-medium mb-4">Company</h4>
<ul className="space-y-2">
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">About</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Careers</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Privacy</a></li>
<li><a href="#" className="text-gray-400 hover:text-white transition cursor-pointer">Terms</a></li>
</ul>
</div>
</div>
<div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
<p className="text-gray-400 text-sm">
&copy; 2025 DreamCanvas AI. All rights reserved.
</p>
<div className="flex items-center space-x-4 mt-4 md:mt-0">
<span className="text-gray-400 text-sm">Payment methods:</span>
<i className="fab fa-cc-visa text-gray-300"></i>
<i className="fab fa-cc-mastercard text-gray-300"></i>
<i className="fab fa-cc-paypal text-gray-300"></i>
<i className="fab fa-cc-apple-pay text-gray-300"></i>
</div>
</div>
</div>
</footer>
</div>
);
};
export default App
