import { Canvas } from '@react-three/fiber'
import { useMemo, Suspense } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import Galaxies from './Galaxies.jsx'
import useGalaxyScroll from '../hooks/useGalaxyScroll.js'

function createStarfield(width, height, seed = 291) {
  let state = seed >>> 0
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
  const count = 760
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const color = new THREE.Color()
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (random() - 0.5) * width * 2.4
    positions[i * 3 + 1] = (random() - 0.5) * height * 2.2
    positions[i * 3 + 2] = -4 - random() * 12
    color.setHSL(0.68 + random() * 0.12, 0.18 + random() * 0.25, 0.66 + random() * 0.3)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  return geometry
}

function Starfield() {
  const { viewport } = useThree()
  const geometry = useMemo(() => createStarfield(viewport.width, viewport.height), [viewport.width, viewport.height])
  return <points geometry={geometry} frustumCulled={false}><pointsMaterial size={0.024} sizeAttenuation vertexColors transparent opacity={0.48} depthWrite={false} /></points>
}

function SceneContents({ progressRef }) {
  return <>
    <ambientLight intensity={0.2} />
    <Starfield />
    <Suspense fallback={null}><Galaxies progressRef={progressRef} /></Suspense>
  </>
}

export default function Scene() {
  const progressRef = useGalaxyScroll()
  return <div className="webgl-scene" aria-hidden="true"><Canvas camera={{ position: [0, 0, 8.5], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }} fallback={<div className="webgl-fallback" />}><SceneContents progressRef={progressRef} /></Canvas></div>
}
