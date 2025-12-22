import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere, Box, Torus, Float } from '@react-three/drei';
import * as THREE from 'three';

// Animated 3D Shape Component
function AnimatedShape() {
    const meshRef = useRef();
    const torus1Ref = useRef();
    const torus2Ref = useRef();
    const torus3Ref = useRef();
    const torus4Ref = useRef();
    const torus5Ref = useRef();
    const particlesRef = useRef();

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Rotate the main sphere
        if (meshRef.current) {
            meshRef.current.rotation.x = time * 0.2;
            meshRef.current.rotation.y = time * 0.3;
        }

        // Rotate ring 1
        if (torus1Ref.current) {
            torus1Ref.current.rotation.x = time * 0.4;
            torus1Ref.current.rotation.z = time * 0.3;
        }

        // Rotate ring 2
        if (torus2Ref.current) {
            torus2Ref.current.rotation.y = time * 0.5;
            torus2Ref.current.rotation.z = -time * 0.2;
        }

        // Rotate ring 3
        if (torus3Ref.current) {
            torus3Ref.current.rotation.x = -time * 0.3;
            torus3Ref.current.rotation.y = time * 0.4;
        }

        // Rotate ring 4
        if (torus4Ref.current) {
            torus4Ref.current.rotation.z = time * 0.35;
            torus4Ref.current.rotation.x = time * 0.25;
        }

        // Rotate ring 5
        if (torus5Ref.current) {
            torus5Ref.current.rotation.y = -time * 0.3;
            torus5Ref.current.rotation.x = time * 0.2;
        }

        // Rotate particles
        if (particlesRef.current) {
            particlesRef.current.rotation.y = time * 0.1;
        }
    });

    // Create particle positions
    const particleCount = 100;
    const particles = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const radius = 3 + Math.random() * 2;

        particles[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        particles[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        particles[i * 3 + 2] = radius * Math.cos(phi);
    }

    return (
        <group>
            {/* Main geometric core - Icosahedron with wireframe */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <group ref={meshRef}>
                    {/* Solid icosahedron */}
                    <mesh scale={1.5}>
                        <icosahedronGeometry args={[1, 1]} />
                        <meshStandardMaterial
                            color="#ff3366"
                            roughness={0.1}
                            metalness={0.9}
                            emissive="#ff0033"
                            emissiveIntensity={0.5}
                        />
                    </mesh>

                    {/* Wireframe overlay */}
                    <mesh scale={1.52}>
                        <icosahedronGeometry args={[1, 0]} />
                        <meshBasicMaterial
                            color="#ff6688"
                            wireframe
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                </group>
            </Float>

            {/* Ring 1 - Solid, horizontal */}
            <Torus ref={torus1Ref} args={[2.5, 0.15, 16, 100]} position={[0, 0, 0]}>
                <meshStandardMaterial
                    color="#ff4466"
                    emissive="#ff0033"
                    emissiveIntensity={0.3}
                    metalness={0.8}
                    roughness={0.2}
                />
            </Torus>

            {/* Ring 2 - Wireframe, perpendicular */}
            <Torus ref={torus2Ref} args={[2.8, 0.1, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <meshStandardMaterial
                    color="#ff6688"
                    emissive="#ff0033"
                    emissiveIntensity={0.2}
                    metalness={0.7}
                    roughness={0.3}
                    wireframe
                />
            </Torus>

            {/* Ring 3 - Solid, diagonal */}
            <Torus ref={torus3Ref} args={[3.0, 0.12, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                <meshStandardMaterial
                    color="#ff3355"
                    emissive="#ff0033"
                    emissiveIntensity={0.25}
                    metalness={0.75}
                    roughness={0.25}
                />
            </Torus>

            {/* Ring 4 - Wireframe, different angle */}
            <Torus ref={torus4Ref} args={[3.2, 0.08, 16, 100]} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
                <meshStandardMaterial
                    color="#ff5577"
                    emissive="#ff0033"
                    emissiveIntensity={0.15}
                    metalness={0.6}
                    roughness={0.4}
                    wireframe
                />
            </Torus>

            {/* Ring 5 - Solid, another angle */}
            <Torus ref={torus5Ref} args={[3.4, 0.1, 16, 100]} position={[0, 0, 0]} rotation={[0, Math.PI / 3, Math.PI / 4]}>
                <meshStandardMaterial
                    color="#ff7799"
                    emissive="#ff0033"
                    emissiveIntensity={0.2}
                    metalness={0.65}
                    roughness={0.35}
                />
            </Torus>

            {/* Floating particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particleCount}
                        array={particles}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    color="#ff3366"
                    sizeAttenuation
                    transparent
                    opacity={0.6}
                />
            </points>
        </group>
    );
}

// Main 3D Scene Component
export default function ThreeScene() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
                {/* Enhanced Lighting */}
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#ff3366" />
                <pointLight position={[0, 10, 0]} intensity={0.8} color="#ff6688" />
                <spotLight position={[5, 5, 5]} intensity={0.5} color="#ff0033" />

                {/* 3D Objects */}
                <AnimatedShape />

                {/* Controls - allows mouse interaction */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={1}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
}
