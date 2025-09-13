// TypeScript Version: 4.0

/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

// Minimal type declarations for Next.js
declare module 'next' {
  import { ComponentType } from 'react';
  
  export interface NextPage<P = {}, IP = P> {
    (props: P): JSX.Element | null;
    getInitialProps?(ctx: any): Promise<IP> | IP;
  }
}

declare module 'next/dynamic' {
  import { ComponentType } from 'react';
  
  function dynamic<T = any>(
    dynamicOptions: any,
    options?: any
  ): ComponentType<T>;
  
  export default dynamic;
}

// Type definitions for Three.js
declare module 'three' {
  export * from 'three/src/Three';
}

declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import { Loader, LoadingManager, Group } from 'three';
  
  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (gltf: { scene: Group; animations: any[]; scenes: Group[]; cameras: any[]; asset: object }) => void,
      onProgress?: (event: ProgressEvent) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}

// Type definitions for React Three Fiber
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

// Type definitions for Drei
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

// Ensure this is treated as a module
export {};
