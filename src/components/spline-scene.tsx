"use client"

import { useEffect, useState } from "react"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF, Float } from "@react-three/drei"

function Model({ url, position, scale, rotation }:any) {
  const { scene }:any = useGLTF(url)

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive object={scene} position={position} scale={scale} rotation={rotation} />
    </Float>
  )
}

export default function SplineScene() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="w-full h-screen absolute inset-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="purple" intensity={0.5} />

          {/* Duck model as a placeholder - you can replace with your own models */}
          <Model url="/assets/Duck.glb" position={[3, 0, 0]} scale={2} rotation={[0, -Math.PI / 4, 0]} />

          {/* Additional 3D elements */}
          <mesh position={[-3, 1, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#6d28d9" />
          </mesh>

          <mesh position={[-2, -2, -1]} rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1, 0.3, 16, 32]} />
            <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
          </mesh>

          <mesh position={[2, -1.5, -2]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="#4c1d95" metalness={0.5} roughness={0.3} />
          </mesh>

          <Environment preset="night" />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

