import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Float, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

export const HolographicCore: React.FC = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.2;
      sphereRef.current.rotation.z = time * 0.1;
    }
    if (ringRef.current) {
        ringRef.current.rotation.z = time * 0.3;
        ringRef.current.rotation.x = time * 0.15;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={sphereRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#00f2ff"
            attach="material"
            distort={0.4}
            speed={4}
            transparent
            opacity={0.3}
            roughness={0}
            metalness={1}
            wireframe
          />
        </Sphere>
        
        <Sphere args={[0.9, 32, 32]}>
          <meshBasicMaterial color="#00f2ff" transparent opacity={0.1} />
        </Sphere>
      </Float>

      <group ref={ringRef}>
         <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.5, 0.02, 16, 100]} />
            <meshBasicMaterial color="#00f2ff" transparent opacity={0.4} />
         </mesh>
         <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
            <torusGeometry args={[1.8, 0.01, 16, 100]} />
            <meshBasicMaterial color="#0066ff" transparent opacity={0.2} />
         </mesh>
      </group>

      <pointLight position={[0, 0, 0]} intensity={2} color="#00f2ff" />
    </group>
  );
};
