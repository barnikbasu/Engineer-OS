import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Torus, 
  Ring, 
  Sphere
} from '@react-three/drei';
import * as THREE from 'three';

const ReactorRing: React.FC<{ 
  radius: number; 
  tube: number; 
  speed: number; 
  color: string;
  opacity: number;
  rotationAxis?: 'x' | 'y' | 'z';
}> = ({ radius, tube, speed, color, opacity, rotationAxis = 'z' }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.getElapsedTime();
    if (rotationAxis === 'z') ref.current.rotation.z = time * speed;
    if (rotationAxis === 'y') ref.current.rotation.y = time * speed;
    if (rotationAxis === 'x') ref.current.rotation.x = time * speed;
  });

  return (
    <Torus ref={ref} args={[radius, tube, 16, 100]}>
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </Torus>
  );
};

const OrbitingBit: React.FC<{ angle: number; distance: number; speed: number; rotation: [number, number, number] }> = ({ angle, distance, speed, rotation }) => {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.getElapsedTime() * speed;
  });

  return (
    <group rotation={rotation}>
      <group ref={ref}>
        <mesh position={[distance, 0, 0]}>
          <octahedronGeometry args={[0.05]} />
          <meshBasicMaterial color="#E23636" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
};

export const ArcReactor: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(time * 4) * 0.05);
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = time * 0.1;
    }
  });

  return (
    <group>
      {/* Central Power Core */}
      <Float speed={5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere ref={coreRef} args={[0.5, 64, 64]}>
          <MeshDistortMaterial
            color="#E23636"
            distort={0.4}
            speed={5}
            roughness={0}
            metalness={1}
            emissive="#E23636"
            emissiveIntensity={2}
          />
        </Sphere>
        
        {/* Pulsating Inner Core */}
        <Sphere args={[0.4, 32, 32]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </Sphere>
        
        {/* Core Cage */}
        {[...Array(8)].map((_, i) => (
          <group key={`cage-${i}`} rotation={[0, 0, (i * Math.PI) / 4]}>
            <mesh position={[0.6, 0, 0]}>
              <boxGeometry args={[0.1, 0.02, 0.2]} />
              <meshBasicMaterial color="#ffb800" transparent opacity={0.8} />
            </mesh>
          </group>
        ))}
      </Float>

      {/* Main Energy Rings */}
      <group ref={shellRef}>
        <ReactorRing radius={1.2} tube={0.015} speed={1.2} color="#E23636" opacity={0.5} />
        <ReactorRing radius={1.25} tube={0.005} speed={-1.5} color="#ffffff" opacity={0.3} />
        
        <ReactorRing radius={1.6} tube={0.01} speed={-0.6} color="#E23636" opacity={0.3} rotationAxis="x" />
        <ReactorRing radius={2.0} tube={0.005} speed={0.4} color="#ffb800" opacity={0.4} rotationAxis="y" />
        
        {/* Segmented Outer Technical Ring */}
        <group rotation={[Math.PI / 2, 0, 0]}>
          {[...Array(24)].map((_, i) => (
            <group key={`segment-${i}`} rotation={[0, 0, (i * Math.PI * 2) / 24]}>
              <mesh position={[2.4, 0, 0]}>
                <boxGeometry args={[0.15, 0.02, 0.01]} />
                <meshBasicMaterial color="#E23636" transparent opacity={0.4} />
              </mesh>
              {i % 4 === 0 && (
                <mesh position={[2.5, 0, 0]}>
                  <boxGeometry args={[0.05, 0.1, 0.02]} />
                  <meshBasicMaterial color="#ffb800" transparent opacity={0.8} />
                </mesh>
              )}
            </group>
          ))}
        </group>
        
        {/* Orbiting Tech Bits */}
        {[...Array(6)].map((_, i) => (
          <OrbitingBit 
            key={`orbit-${i}`}
            angle={(i / 6) * Math.PI * 2}
            distance={3}
            speed={0.5 + Math.random()}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        ))}
      </group>

      {/* Volumetric Light Rays (Simulated) */}
      {[...Array(6)].map((_, i) => (
        <group key={`ray-${i}`} rotation={[0, 0, i * Math.PI / 3]}>
          <Ring args={[0.8, 4, 32]}>
            <meshBasicMaterial 
              color="#E23636" 
              transparent 
              opacity={0.01} 
              side={THREE.DoubleSide} 
            />
          </Ring>
        </group>
      ))}

      {/* Points/Particles inside core area */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={200}
            array={new Float32Array(600).map(() => (Math.random() - 0.5) * 6)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#E23636" size={0.015} transparent opacity={0.3} />
      </points>

      <pointLight intensity={10} color="#E23636" decay={2} distance={10} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#ffb800" />
      <pointLight position={[-3, -3, 2]} intensity={1} color="#E23636" />
    </group>
  );
};
