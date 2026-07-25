"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Points, PointMaterial, Html } from "@react-three/drei";
import * as THREE from "three";
import { FaReact, FaDocker, FaPython } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";

const KubernetesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2L2 6.5v11L12 22l10-4.5v-11L12 2zM3.8 7.3L12 3.6l8.2 3.7v9.4L12 20.4l-8.2-3.7V7.3z" />
    <path d="M12 5.5l6.5 3v7l-6.5 3-6.5-3v-7z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
);

function NetworkGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  const starsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.15;
      globeRef.current.rotation.x += delta * 0.05;
    }
    if (starsRef.current) {
      starsRef.current.rotation.y -= delta * 0.08;
    }
  });

  // Generate random points for particle cloud
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = 2.5 + Math.random() * 0.5; // Orbit radius
    
    positions[i] = r * Math.sin(phi) * Math.cos(theta);
    positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i + 2] = r * Math.cos(phi);
  }

  return (
    <group>
      {/* Central Wireframe Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial 
          color="#00E5FF" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </mesh>

      {/* Outer Glow Grid Sphere */}
      <mesh>
        <sphereGeometry args={[1.51, 12, 12]} />
        <meshBasicMaterial 
          color="#8B5CF6" 
          wireframe 
          transparent 
          opacity={0.06} 
        />
      </mesh>

      {/* Orbiting Star Cloud */}
      <Points ref={starsRef} positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#2563EB"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>

      {/* Floating Interactive Tech Icons */}
      <OrbitingNode 
        icon={<VscAzure className="text-2xl text-[#0078D4]" />} 
        label="Azure" 
        radius={2.4} 
        speed={0.4} 
        phase={0} 
      />
      <OrbitingNode 
        icon={<FaDocker className="text-2xl text-[#2496ED]" />} 
        label="Docker" 
        radius={2.6} 
        speed={0.3} 
        phase={Math.PI / 2} 
      />
      <OrbitingNode 
        icon={<KubernetesIcon className="w-6 h-6 text-[#326CE5]" />} 
        label="K8s" 
        radius={2.5} 
        speed={0.5} 
        phase={Math.PI} 
      />
      <OrbitingNode 
        icon={<FaReact className="text-2xl text-[#61DAFB]" />} 
        label="React" 
        radius={2.3} 
        speed={0.45} 
        phase={Math.PI * 1.5} 
      />
      <OrbitingNode 
        icon={<FaPython className="text-2xl text-[#3776AB]" />} 
        label="Python" 
        radius={2.7} 
        speed={0.35} 
        phase={Math.PI * 0.7} 
      />
    </group>
  );
}

interface OrbitingNodeProps {
  icon: React.ReactNode;
  label: string;
  radius: number;
  speed: number;
  phase: number;
}

function OrbitingNode({ icon, label, radius, speed, phase }: OrbitingNodeProps) {
  const nodeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!nodeRef.current) return;
    const time = state.clock.getElapsedTime() * speed + phase;
    
    // Circular orbit on the XZ plane
    nodeRef.current.position.x = radius * Math.cos(time);
    nodeRef.current.position.z = radius * Math.sin(time);
    // Slight oscillation on the Y axis
    nodeRef.current.position.y = Math.sin(time * 2) * 0.4;
  });

  return (
    <group ref={nodeRef}>
      <Html distanceFactor={8} zIndexRange={[10, 0]}>
        <div className="flex select-none items-center space-x-1.5 rounded-full border border-white/10 bg-gray-950/80 px-3 py-1.5 shadow-lg shadow-black/50 backdrop-blur-md transition-all duration-300 hover:border-accent hover:scale-110">
          <div className="flex h-5 w-5 items-center justify-center">{icon}</div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300">{label}</span>
        </div>
      </Html>
    </group>
  );
}

export default function Globe3D() {
  return (
    <div className="relative h-[300px] w-full sm:h-[400px] md:h-[500px]">
      {/* Background soft radial ambient light behind the canvas */}
      <div className="absolute inset-0 m-auto h-[250px] w-[250px] rounded-full bg-accent/10 blur-[80px]" />
      
      <Canvas camera={{ position: [0, 0, 5.5], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <NetworkGlobe />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
