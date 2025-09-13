import { useState, useRef, Suspense, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';

// Type for the component props
interface StudioProps {
  // Add any props you need here
}

// Dynamically import Three.js components with no SSR
const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
});

// Main Studio Component
const Studio: React.FC<StudioProps> = () => {
  const [showGrid, setShowGrid] = useState(false);
  const modelScale = 0.8; // Reduced scale to fit better
  const autoRotate = true;
  const rotationSpeed = 0.003;
  const lightIntensity = 1;
  
  // Tools for the left sidebar with better icons and tooltips
  const tools = [
    { 
      id: 'color', 
      name: 'Color Picker', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.486M7 17h.01" />
        </svg>
      )
    },
    { 
      id: 'addText', 
      name: 'Add Text', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      id: 'addImage', 
      name: 'Add Image', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      id: 'addStyle', 
      name: 'Add Style', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    { 
      id: 'referFriend', 
      name: 'Refer a Friend', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
  ];
  
  const [activeTool, setActiveTool] = useState<string | null>(null);
  
  const handleToolClick = (toolId: string) => {
    setActiveTool(activeTool === toolId ? null : toolId);
    // Add tool-specific logic here
    console.log(`Selected tool: ${toolId}`);
  };

  // Debug: Log when component mounts
  useEffect(() => {
    const modelPath = '/Animated Walking Tshirt.glb';
    console.log('Studio component mounted');
    console.log('Model path:', modelPath);
    
    // Verify the file exists
    fetch(modelPath)
      .then(response => {
        console.log('Model file status:', response.status);
        if (!response.ok) {
          throw new Error(`Failed to load model: ${response.status} ${response.statusText}`);
        }
        return response.blob();
      })
      .then(blob => {
        console.log('Model file size:', blob.size, 'bytes');
      })
      .catch(error => {
        console.error('Error loading model file:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar className="!bg-black" />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Sidebar - Tools */}
        <div className="w-16 bg-gray-900 text-white flex flex-col items-center py-4 space-y-6">
          {tools.map((tool) => (
            <div key={tool.id} className="relative group">
              <button
                className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all ${
                  activeTool === tool.id 
                    ? 'bg-blue-600 text-white transform scale-110' 
                    : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                }`}
                onClick={() => handleToolClick(tool.id)}
              >
                {tool.icon}
              </button>
              <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {tool.name}
                <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Main 3D Viewer Area */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-4 relative">
          {/* Grid Toggle - Bottom center of the page */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full shadow-lg">
            <span className="text-sm">Show Grid</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="w-[1000px] h-[500px] bg-white rounded-lg shadow-lg overflow-hidden relative">
            <ErrorBoundary fallback={
              <div className="w-full h-full flex items-center justify-center bg-red-50">
                <div className="text-center p-4">
                  <h3 className="text-lg font-medium text-red-700">Failed to load 3D viewer</h3>
                  <p className="text-sm text-red-600 mt-1">Please check the console for more details</p>
                </div>
              </div>
            }>
              <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              }>
                <div className="w-full h-full">
                  <ModelViewer 
                    modelPath="/Animated Walking Tshirt.glb"
                    scale={0.5} // Reduced scale to fit better in the container
                    autoRotate={true}
                    rotationSpeed={0.003}
                    lightIntensity={1}
                    showGrid={showGrid}
                  />
                </div>
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Studio;