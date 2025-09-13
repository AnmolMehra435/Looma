// Type definitions for Three.js and related libraries
declare module 'three' {
  export * from 'three/src/Three';
}

declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import { Loader, LoadingManager, Group } from 'three';
  
  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (gltf: { scene: Group; animations: any[]; scene: Group; scenes: Group[]; cameras: any[]; asset: object }) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    parse(data: ArrayBuffer | string, path: string, onLoad: (gltf: any) => void, onError?: (event: ErrorEvent) => void): void;
  }
}

declare module '@react-three/fiber' {
  import { ReactNode } from 'react';
  import { Camera, Scene, WebGLRenderer, WebGLRendererParameters } from 'three';

  export interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
    children?: ReactNode;
    camera?: Partial<Camera>;
    style?: React.CSSProperties;
    gl?: WebGLRendererParameters;
    onCreated?: (state: { gl: WebGLRenderer; scene: Scene; camera: Camera }) => void;
  }

  export const Canvas: (props: CanvasProps) => JSX.Element;
  export const useFrame: (callback: (state: { clock: { getDelta: () => number } }) => void, renderPriority?: number) => void;
  export const useThree: () => {
    gl: WebGLRenderer;
    scene: Scene;
    camera: Camera;
    size: { width: number; height: number };
    viewport: { width: number; height: number; factor: number };
  };
}

declare module '@react-three/drei' {
  import { ReactNode } from 'react';
  import { Camera, Object3D } from 'three';

  export const OrbitControls: React.ForwardRefExoticComponent<
    {
      autoRotate?: boolean;
      autoRotateSpeed?: number;
      enablePan?: boolean;
      enableRotate?: boolean;
      enableZoom?: boolean;
      target?: [number, number, number];
      minPolarAngle?: number;
      maxPolarAngle?: number;
      minDistance?: number;
      maxDistance?: number;
      onChange?: () => void;
    } & React.RefAttributes<{ target: Object3D; update: () => void }>
  >;

  export const useGLTF: (url: string) => { scene: any };
  
  export const Grid: React.FC<{
    infiniteGrid?: boolean;
    cellSize?: number;
    cellThickness?: number;
    cellColor?: string;
    sectionSize?: number;
    sectionThickness?: number;
    sectionColor?: string;
    fadeDistance?: number;
    fadeStrength?: number;
    followCamera?: boolean;
  }>;
}
