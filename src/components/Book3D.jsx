import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

function BookPage({ position, rotation, color = '#e8e0d0', delay = 0 }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay
    if (mesh.current) {
      mesh.current.rotation.y = Math.sin(t * 0.4) * 0.3 + rotation[1]
      mesh.current.position.y = Math.sin(t * 0.5 + delay) * 0.02 + position[1]
    }
  })
  return (
    <mesh ref={mesh} position={position} rotation={rotation} castShadow>
      <boxGeometry args={[1.4, 1.8, 0.01]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.05} />
    </mesh>
  )
}

function BookCover() {
  const group = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.25) * 0.15
      group.current.rotation.x = Math.sin(t * 0.18) * 0.05
    }
  })

  return (
    <group ref={group}>
      {/* Back cover */}
      <mesh position={[0, 0, -0.12]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.9, 0.04]} />
        <meshStandardMaterial color="#1a0a2e" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Spine */}
      <mesh position={[-0.76, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 1.9, 0.28]} />
        <meshStandardMaterial color="#2d1060" roughness={0.1} metalness={0.5} />
      </mesh>

      {/* Pages stack */}
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[0.01 * i, 0, -0.08 + i * 0.025]} castShadow>
          <boxGeometry args={[1.44, 1.85, 0.02]} />
          <meshStandardMaterial color={`hsl(45, ${20 + i * 5}%, ${88 - i * 2}%)`} roughness={0.6} />
        </mesh>
      ))}

      {/* Front cover */}
      <mesh position={[0, 0, 0.1]} castShadow>
        <boxGeometry args={[1.5, 1.9, 0.04]} />
        <meshStandardMaterial color="#120830" roughness={0.15} metalness={0.4} />
      </mesh>

      {/* Gold title bar on cover */}
      <mesh position={[0, 0.4, 0.13]}>
        <boxGeometry args={[1.0, 0.06, 0.005]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.05} metalness={0.95} emissive="#c9a84c" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 0.25, 0.13]}>
        <boxGeometry args={[0.7, 0.06, 0.005]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.05} metalness={0.95} emissive="#c9a84c" emissiveIntensity={0.2} />
      </mesh>

      {/* Animated open page */}
      <BookPage position={[0.3, 0, 0.12]} rotation={[0, -0.4, 0]} color="#f5f0e8" delay={0} />
      <BookPage position={[0.5, 0, 0.14]} rotation={[0, -0.7, 0]} color="#f0ebe0" delay={1} />
    </group>
  )
}

function FloatingParticles() {
  const count = 120
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [])

  const mesh = useRef()
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.03
      mesh.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.1
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#c9a84c" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function GlowOrb({ position, color, intensity = 1 }) {
  const mesh = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(t * 0.5) * 0.3
      mesh.current.material.emissiveIntensity = 0.5 + Math.sin(t) * 0.3
    }
  })
  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.7} />
    </mesh>
  )
}

export default function Book3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        dpr={[1, 2]}
        shadows
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <pointLight position={[-3, 2, 3]} intensity={1.5} color="#7c3aed" />
        <pointLight position={[3, -2, 2]} intensity={1} color="#c9a84c" />
        <pointLight position={[0, 3, 1]} intensity={0.8} color="#3b82f6" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <BookCover />
        </Float>

        <FloatingParticles />

        <GlowOrb position={[-2.5, 1, -1]} color="#7c3aed" />
        <GlowOrb position={[2.5, -1, -1]} color="#c9a84c" />
        <GlowOrb position={[0, -2, -2]} color="#3b82f6" />

        <Stars radius={40} depth={50} count={800} factor={3} saturation={0} fade speed={0.5} />

        <fog attach="fog" args={['#050508', 10, 30]} />
      </Canvas>
    </div>
  )
}
