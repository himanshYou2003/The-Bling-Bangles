'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import BangleModel from './BangleModel';

interface BangleCanvasProps {
  scrollProgress: any;
}

export default function BangleCanvas({ scrollProgress }: BangleCanvasProps) {
  const [cameraSettings, setCameraSettings] = useState({
    position: [0, 0, 5] as [number, number, number],
    fov: 45
  });

  useEffect(() => {
    const updateCameraSettings = () => {
      const width = window.innerWidth;
      
      // Mobile devices (< 768px)
      if (width < 768) {
        setCameraSettings({
          position: [0, 0, 6],
          fov: 50
        });
      }
      // Tablet devices (768px - 1024px)
      else if (width < 1024) {
        setCameraSettings({
          position: [0, 0, 5.5],
          fov: 47
        });
      }
      // Desktop (> 1024px)
      else {
        setCameraSettings({
          position: [0, 0, 5],
          fov: 45
        });
      }
    };

    // Set initial camera settings
    updateCameraSettings();

    // Update on window resize
    window.addEventListener('resize', updateCameraSettings);
    return () => window.removeEventListener('resize', updateCameraSettings);
  }, []);

  return (
    <div className="w-full h-full">
      <Canvas 
        shadows
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false
        }}
        camera={{ 
          position: cameraSettings.position, 
          fov: cameraSettings.fov 
        }}
      >
        <color attach="background" args={['#0B0B0B']} />
        <fog attach="fog" args={['#0B0B0B', 5, 15]} />
        
        <ambientLight intensity={0.3} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5} 
          castShadow 
          color="#E6C78B"
          shadow-mapSize-width={512}
          shadow-mapSize-height={512}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#D4A373" />
        
        <Suspense fallback={null}>
          <BangleModel scrollProgress={scrollProgress} />
          <Environment preset="studio" />
          <ContactShadows 
            position={[0, -2.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
            resolution={256}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
