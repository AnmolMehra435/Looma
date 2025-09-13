import { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Extend JSX types for Three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      ambientLight: any;
      pointLight: any;
      primitive: any;
    }
  }
}

// Custom GLTF loader with error handling
interface ModelState {
  scene: THREE.Object3D | null;
  error: string | null;
  isLoading: boolean;
}

function useGLTFWithErrorHandling(url: string): ModelState {
  const [modelState, setModelState] = useState<ModelState>({
    scene: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    let mounted = true;
    
    const loadModel = async () => {
      try {
        setModelState(prev => ({ ...prev, isLoading: true, error: null }));
        
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader');
        const loader = new GLTFLoader();
        
        loader.load(
          url,
          (gltf) => {
            if (!mounted) return;
            setModelState({
              scene: gltf.scene,
              error: null,
              isLoading: false
            });
          },
          undefined,
          (errorEvent) => {
            if (!mounted) return;
            const errorMessage = errorEvent.message || 'Failed to load model';
            setModelState({
              scene: null,
              error: errorMessage,
              isLoading: false
            });
          }
        );
      } catch (err) {
        if (!mounted) return;
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setModelState({
          scene: null,
          error: errorMessage,
          isLoading: false
        });
      }
    };

    loadModel();
    
    return () => {
      mounted = false;
    };
  }, [url]);

  return modelState;
}

// Loading component - Using Three.js primitives
function Loader() {
  return (
    <mesh visible position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color="gray"
        transparent
        opacity={0.7}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

// Error component - Using Three.js text (simplified for now)
function ErrorMessage() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2, 0.5, 0.1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

interface ModelProps {
  url: string;
  scale?: number;
  autoRotate?: boolean;
  rotationSpeed?: number;
  lightIntensity?: number;
  showGrid?: boolean;
}

const Model: React.FC<ModelProps> = (props) => {
  const { 
    url, 
    scale = 0.5, 
    autoRotate = true, 
    rotationSpeed = 0.003,
    lightIntensity = 1,
    showGrid = false 
  } = props;
  
  const group = useRef<THREE.Group>(null);
  const { scene, error, isLoading } = useGLTFWithErrorHandling(url);
  const { camera } = useThree();
  const [gridPosition, setGridPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [gridSize, setGridSize] = useState(10);
  
  // Center and fit the model when loaded
  useEffect(() => {
    if (!scene || !camera) return;
    
    // Compute bounding box of the scene
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);
    
    // Center the model
    scene.position.x = -center.x;
    scene.position.y = -center.y;
    scene.position.z = -center.z;
    
    // Calculate the bottom position of the t-shirt model
    // Increased offset to 0.5 units to raise the grid higher
    const tshirtBottom = -center.y - (size.y / 2) + 0.5;
    
    // Position grid at the adjusted position below the t-shirt
    // The grid is now positioned slightly above the previous position
    setGridPosition([0, tshirtBottom, 0]);
    
    // Adjust the grid size to be slightly larger than the t-shirt's width
    setGridSize(Math.max(size.x, size.z) * 1.5);
    
    // Adjust camera to fit the model
    if (camera instanceof THREE.PerspectiveCamera) {
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2));
      
      // Position the camera with some padding
      camera.position.set(0, 0, cameraZ * 1.5);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [scene, camera]);

  // Auto-rotation effect
  useFrame(() => {
    if (group.current && autoRotate) {
      group.current.rotation.y += rotationSpeed!;
    }
  });

  // Show loading state
  if (isLoading) {
    return <Loader />;
  }

  // Show error state
  if (error || !scene) {
    return <ErrorMessage />;
  }
  // Render the model
  return (
    <group>
      <ambientLight intensity={0.5 * lightIntensity} />
      <pointLight position={[10, 10, 10]} intensity={lightIntensity} />
      <group ref={group} scale={[scale, scale, scale]}>
        <primitive object={scene} />
      </group>
      {showGrid && (
        <group position={gridPosition}>
          <gridHelper 
            args={[gridSize || 10, 20]} 
            rotation={[0, 0, 0]}
            position={[0, 0, 0]}
          />
        </group>
      )}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={rotationSpeed! * 100}
        target={[0, 0, 0]}
      />
    </group>
  );
};

interface ModelViewerProps extends Omit<ModelProps, 'url'> {
  modelPath: string;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
  modelPath,
  scale = 0.5,
  autoRotate = true,
  rotationSpeed = 0.003,
  lightIntensity = 1,
  showGrid = false
}) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ 
          position: [0, 0, 5],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
      >
        <Suspense fallback={<Loader />}>
          <Model 
            url={modelPath}
            scale={scale}
            autoRotate={autoRotate}
            rotationSpeed={rotationSpeed}
            lightIntensity={lightIntensity}
            showGrid={showGrid}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;
