import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeGlobe() {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const sphereRef = useRef(null);
    const ringsRef = useRef([]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            45,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 10;
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lighting - dramatic lighting like the image
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        scene.add(ambientLight);

        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(5, 5, 5);
        scene.add(mainLight);

        const fillLight = new THREE.DirectionalLight(0x6688ff, 0.4);
        fillLight.position.set(-5, 0, -5);
        scene.add(fillLight);

        const rimLight = new THREE.DirectionalLight(0xff8844, 0.3);
        rimLight.position.set(0, -5, 5);
        scene.add(rimLight);

        // Create main sphere group
        const sphereGroup = new THREE.Group();

        // Main sphere with horizontal bands
        const sphereGeometry = new THREE.SphereGeometry(1.8, 64, 64);
        const sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            metalness: 0.95,
            roughness: 0.15,
        });
        const mainSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereGroup.add(mainSphere);

        // Add horizontal bands/stripes with varying sizes (smaller at poles, larger at equator)
        const numBands = 8;
        for (let i = 0; i < numBands; i++) {
            // Calculate latitude position (-1 to 1, where 0 is equator)
            const latitude = -1 + (i / (numBands - 1)) * 2;

            // Calculate radius at this latitude (using sphere equation)
            const radiusAtLatitude = Math.sqrt(1 - latitude * latitude) * 1.8;

            if (radiusAtLatitude > 0.1) { // Only create band if radius is significant
                const bandGeometry = new THREE.TorusGeometry(
                    radiusAtLatitude + 0.02,
                    0.04,
                    8,
                    64
                );
                const bandMaterial = new THREE.MeshStandardMaterial({
                    color: i % 2 === 0 ? 0x1a1a1a : 0x3a3a3a,
                    metalness: 0.9,
                    roughness: 0.2,
                });
                const band = new THREE.Mesh(bandGeometry, bandMaterial);
                band.rotation.x = Math.PI / 2;
                band.position.y = latitude * 1.8;
                sphereGroup.add(band);
            }
        }

        // Glowing core elements
        const glowGeometry = new THREE.SphereGeometry(0.3, 32, 32);
        const glowMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0xffffff,
            emissiveIntensity: 2,
        });

        // Top glow
        const topGlow = new THREE.Mesh(glowGeometry, glowMaterial);
        topGlow.position.y = 1.5;
        sphereGroup.add(topGlow);

        // Bottom glow
        const bottomGlow = new THREE.Mesh(glowGeometry, glowMaterial);
        bottomGlow.position.y = -1.5;
        sphereGroup.add(bottomGlow);

        // Add floating particles around the sphere
        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 300;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Random spherical distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = 3 + Math.random() * 2;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Random colors (shades of gray and blue)
            const colorChoice = Math.random();
            if (colorChoice < 0.5) {
                colors[i * 3] = 0.5 + Math.random() * 0.5;
                colors[i * 3 + 1] = 0.5 + Math.random() * 0.5;
                colors[i * 3 + 2] = 0.5 + Math.random() * 0.5;
            } else {
                colors[i * 3] = 0.3;
                colors[i * 3 + 1] = 0.5 + Math.random() * 0.3;
                colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
            }
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.08,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        // Add small orbital dots on specific paths
        const orbitDots = [];
        for (let i = 0; i < 12; i++) {
            const dotGeometry = new THREE.SphereGeometry(0.06, 8, 8);
            const dotMaterial = new THREE.MeshStandardMaterial({
                color: 0xff3366,
                emissive: 0xff0033,
                emissiveIntensity: 0.8,
                metalness: 0.5,
                roughness: 0.3,
            });
            const dot = new THREE.Mesh(dotGeometry, dotMaterial);
            scene.add(dot);
            orbitDots.push({
                mesh: dot,
                angle: (i / 12) * Math.PI * 2,
                radius: 4 + (i % 3) * 0.5,
                speed: 0.01 + (i % 3) * 0.005,
            });
        }

        // Add geometric pattern lines
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = [];
        const numLines = 20;

        for (let i = 0; i < numLines; i++) {
            const angle = (i / numLines) * Math.PI * 2;
            const radius = 5;
            linePositions.push(
                Math.cos(angle) * radius, 0, Math.sin(angle) * radius,
                Math.cos(angle + 0.1) * radius, 0, Math.sin(angle + 0.1) * radius
            );
        }

        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x444444,
            transparent: true,
            opacity: 0.3,
        });
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        scene.add(lines);

        scene.add(sphereGroup);
        sphereRef.current = sphereGroup;

        // Create multiple orbital rings
        const rings = [];

        // Ring 1 - Large horizontal
        const ring1Geometry = new THREE.TorusGeometry(3.2, 0.06, 16, 100);
        const ring1Material = new THREE.MeshStandardMaterial({
            color: 0x555555,
            metalness: 0.9,
            roughness: 0.2,
        });
        const ring1 = new THREE.Mesh(ring1Geometry, ring1Material);
        ring1.rotation.x = Math.PI / 2;
        scene.add(ring1);
        rings.push(ring1);

        // Ring 2 - Medium tilted
        const ring2Geometry = new THREE.TorusGeometry(2.8, 0.05, 16, 100);
        const ring2Material = new THREE.MeshStandardMaterial({
            color: 0x666666,
            metalness: 0.85,
            roughness: 0.25,
        });
        const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
        ring2.rotation.x = Math.PI / 3;
        ring2.rotation.z = Math.PI / 4;
        scene.add(ring2);
        rings.push(ring2);

        // Ring 3 - Small perpendicular
        const ring3Geometry = new THREE.TorusGeometry(2.5, 0.04, 16, 100);
        const ring3Material = new THREE.MeshStandardMaterial({
            color: 0x777777,
            metalness: 0.8,
            roughness: 0.3,
        });
        const ring3 = new THREE.Mesh(ring3Geometry, ring3Material);
        ring3.rotation.y = Math.PI / 2;
        ring3.rotation.x = Math.PI / 6;
        scene.add(ring3);
        rings.push(ring3);

        // Ring 4 - Outer ring
        const ring4Geometry = new THREE.TorusGeometry(3.5, 0.05, 16, 100);
        const ring4Material = new THREE.MeshStandardMaterial({
            color: 0x444444,
            metalness: 0.9,
            roughness: 0.2,
        });
        const ring4 = new THREE.Mesh(ring4Geometry, ring4Material);
        ring4.rotation.x = Math.PI / 2.5;
        ring4.rotation.y = Math.PI / 3;
        scene.add(ring4);
        rings.push(ring4);

        // Ring 5 - Diagonal
        const ring5Geometry = new THREE.TorusGeometry(2.2, 0.04, 16, 100);
        const ring5Material = new THREE.MeshStandardMaterial({
            color: 0x888888,
            metalness: 0.85,
            roughness: 0.25,
        });
        const ring5 = new THREE.Mesh(ring5Geometry, ring5Material);
        ring5.rotation.x = Math.PI / 4;
        ring5.rotation.y = -Math.PI / 6;
        scene.add(ring5);
        rings.push(ring5);

        // Ring 6 - Steep angle
        const ring6Geometry = new THREE.TorusGeometry(3.0, 0.045, 16, 100);
        const ring6Material = new THREE.MeshStandardMaterial({
            color: 0x666666,
            metalness: 0.88,
            roughness: 0.22,
        });
        const ring6 = new THREE.Mesh(ring6Geometry, ring6Material);
        ring6.rotation.x = Math.PI / 1.5;
        ring6.rotation.z = Math.PI / 5;
        scene.add(ring6);
        rings.push(ring6);

        // Ring 7 - Nearly vertical
        const ring7Geometry = new THREE.TorusGeometry(2.6, 0.035, 16, 100);
        const ring7Material = new THREE.MeshStandardMaterial({
            color: 0x999999,
            metalness: 0.82,
            roughness: 0.28,
        });
        const ring7 = new THREE.Mesh(ring7Geometry, ring7Material);
        ring7.rotation.y = Math.PI / 1.8;
        ring7.rotation.z = -Math.PI / 4;
        scene.add(ring7);
        rings.push(ring7);

        ringsRef.current = rings;

        // Animation loop with time-based smooth rotations
        let animationId;
        let time = 0;

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            time += 0.01;

            // Rotate sphere with smooth oscillation
            if (sphereRef.current) {
                sphereRef.current.rotation.y += 0.005;
                sphereRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
            }

            // Animate orbital dots
            orbitDots.forEach((dotData) => {
                dotData.angle += dotData.speed;
                dotData.mesh.position.x = Math.cos(dotData.angle) * dotData.radius;
                dotData.mesh.position.z = Math.sin(dotData.angle) * dotData.radius;
                dotData.mesh.position.y = Math.sin(dotData.angle * 2) * 0.5;
            });

            // Rotate particles slowly
            if (particles) {
                particles.rotation.y = time * 0.05;
            }

            // Rotate geometric lines
            if (lines) {
                lines.rotation.y = time * 0.02;
            }

            // Rotate rings with coordinated patterns (2x speed)
            // Pattern: Each ring's speed is related to its index (Fibonacci-like progression)
            if (rings[0]) {
                // Ring 1 - Base rhythm
                rings[0].rotation.z = time * 0.6;
                rings[0].rotation.y = Math.sin(time * 1.0) * 0.2;
            }

            if (rings[1]) {
                // Ring 2 - Golden ratio relationship to Ring 1
                rings[1].rotation.x = time * 1.0;
                rings[1].rotation.z = Math.cos(time * 0.6) * 0.3;
            }

            if (rings[2]) {
                // Ring 3 - Counter-rotation with wave
                rings[2].rotation.y = -time * 0.8;
                rings[2].rotation.x = Math.sin(time * 1.4) * 0.25;
            }

            if (rings[3]) {
                // Ring 4 - Harmonic oscillation
                rings[3].rotation.x = time * 0.7 + Math.sin(time * 2.0) * 0.1;
                rings[3].rotation.y = -time * 0.5;
            }

            if (rings[4]) {
                // Ring 5 - Phase-shifted from Ring 1
                rings[4].rotation.x = -time * 0.9;
                rings[4].rotation.y = Math.cos(time * 1.2) * 0.2;
            }

            if (rings[5]) {
                // Ring 6 - Complex wave pattern
                rings[5].rotation.z = time * 1.1 + Math.sin(time * 3.0) * 0.15;
                rings[5].rotation.x = Math.cos(time * 1.6) * 0.3;
            }

            if (rings[6]) {
                // Ring 7 - Synchronized with Ring 1 but perpendicular
                rings[6].rotation.y = -time * 0.6;
                rings[6].rotation.z = Math.sin(time * 1.0) * 0.25;
            }
            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            if (!containerRef.current) return;

            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} className="w-full h-full" />;
}
