'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

interface BangleModelProps {
  scrollProgress: any;
}

export default function BangleModel({ scrollProgress }: BangleModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Load the model from the public directory
  const { scene } = useGLTF('/assets/bangles.glb');

  // Clone the scene to avoid mutating the cached version
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Create material once and cache it
  const bangleMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#E6C78B",
        metalness: 1,
        roughness: 0.1,
        envMapIntensity: 2.5,
      }),
    []
  );

  // Apply materials only once when component mounts
  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = bangleMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [clonedScene, bangleMaterial]);

  useFrame((state) => {
    if (meshRef.current) {
      const scroll = scrollProgress.get();
      
      // Responsive base scale based on viewport width
      let baseScale = 1.3;
      let scrollScale = 0.3;
      
      // Mobile devices (< 768px)
      if (viewport.width < 7) {
        baseScale = 0.8;
        scrollScale = 0.2;
      } 
      // Tablet devices (768px - 1024px)
      else if (viewport.width < 10) {
        baseScale = 1.1;
        scrollScale = 0.2;
      }
      // Desktop (> 1024px)
      else {
        baseScale = 1.3;
        scrollScale = 0.3;
      }
      
      // Apply rotation and responsive scale
      meshRef.current.rotation.y = scroll * Math.PI * 2;
      meshRef.current.scale.setScalar(baseScale + scroll * scrollScale); 
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0} floatIntensity={0.6}>
      <Center>
        <primitive 
          ref={meshRef} 
          object={clonedScene} 
          position={[0, 0, 0]}
        />
      </Center>
    </Float>
  );
}

useGLTF.preload('/assets/bangles.glb');
