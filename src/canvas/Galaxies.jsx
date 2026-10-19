import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { galaxyFragmentShader, galaxyVertexShader } from './ParticlesShader.js'

function randomFactory(seed) {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

function createGalaxyData(count, seed) {
  const random = randomFactory(seed)
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const variations = new Float32Array(count)
  const radii = new Float32Array(count)
  const halo = new Float32Array(count)
  const arms = 4

  for (let i = 0; i < count; i += 1) {
    const isHalo = random() < 0.13
    const radius = isHalo ? 1.05 + Math.pow(random(), 0.82) * 2.25 : Math.pow(random(), 0.64) * 2.45
    const arm = Math.floor(random() * arms)
    const armJitter = (random() + random() + random() - 1.5) * 0.48
    const angle = isHalo ? random() * Math.PI * 2 : (arm / arms) * Math.PI * 2 + radius * 1.48 + armJitter
    const spread = (random() - 0.5) * (isHalo ? 0.24 : 0.035 + radius * 0.065)
    positions[i * 3] = Math.cos(angle) * radius + spread
    positions[i * 3 + 1] = (random() - 0.5) * (isHalo ? 0.64 : 0.035 + radius * 0.055)
    positions[i * 3 + 2] = Math.sin(angle) * radius + spread
    sizes[i] = isHalo ? 0.4 + Math.pow(random(), 4) * 2.3 : 0.55 + Math.pow(random(), 4) * 4.2
    variations[i] = isHalo ? random() * 0.5 : 0.22 + random() * 0.78
    radii[i] = radius
    halo[i] = isHalo ? 1 : 0
  }

  return { positions, sizes, variations, radii, halo }
}

function Galaxy({ count, seed, color, groupRef, materialRef, reverse = false }) {
  const geometry = useMemo(() => {
    const data = createGalaxyData(count, seed)
    const value = new THREE.BufferGeometry()
    value.setAttribute('position', new THREE.BufferAttribute(data.positions, 3))
    value.setAttribute('aSize', new THREE.BufferAttribute(data.sizes, 1))
    value.setAttribute('aRandom', new THREE.BufferAttribute(data.variations, 1))
    value.setAttribute('aRadius', new THREE.BufferAttribute(data.radii, 1))
    value.setAttribute('aHalo', new THREE.BufferAttribute(data.halo, 1))
    return value
  }, [count, seed])

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uSeed: { value: seed * 0.001 },
    uColor: { value: new THREE.Color(color) },
  }), [color, seed])
  const reduceMotion = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  useFrame((state) => {
    uniforms.uTime.value = reduceMotion ? 0 : state.clock.elapsedTime
  })

  return <group ref={groupRef} rotation={[0.46, 0, reverse ? -0.1 : 0.1]}>
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial ref={materialRef} uniforms={uniforms} vertexShader={galaxyVertexShader} fragmentShader={galaxyFragmentShader} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  </group>
}

function createTidalData(count = 700) {
  const random = randomFactory(242)
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i += 1) {
    const t = random()
    const side = random() > 0.5 ? 1 : -1
    const distance = 0.22 + t * 2.2
    positions[i * 3] = side * distance
    positions[i * 3 + 1] = Math.sin(t * Math.PI) * (0.18 + random() * 0.34) + (random() - 0.5) * 0.12
    positions[i * 3 + 2] = (random() - 0.5) * 0.32
  }
  return positions
}

export default function Galaxies({ progressRef }) {
  const milkyWayRef = useRef()
  const andromedaRef = useRef()
  const milkyMaterial = useRef()
  const andromedaMaterial = useRef()
  const tidalMaterial = useRef()
  const tidalRef = useRef()
  const { viewport } = useThree()
  const reduceMotion = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const screenWidth = typeof window === 'undefined' ? 1280 : window.innerWidth
  const mobile = screenWidth < 680
  const scaleFactor = mobile ? 0.47 : Math.min(1, Math.max(0.64, screenWidth / 1300))

  useFrame((state, delta) => {
    const progress = progressRef.current
    const approach = THREE.MathUtils.smoothstep(progress, 0.02, 0.92)
    const elapsed = state.clock.elapsedTime
    const start = mobile ? Math.min(1.1, viewport.width * 0.27) : Math.min(viewport.width * 0.15, 1.6)
    const collisionGap = mobile ? 0.14 : 0.24
    const gap = THREE.MathUtils.lerp(start, collisionGap, approach)
    const centerX = mobile ? 0 : THREE.MathUtils.lerp(1.2 + viewport.width * 0.25, -0.85, approach)

    const sparkle = reduceMotion ? 1 : 0.94 + Math.sin(elapsed * 1.4) * 0.06
    if (milkyWayRef.current) {
      milkyWayRef.current.position.set(centerX - gap, mobile ? -1.1 : 0.12, 0)
      if (!reduceMotion) milkyWayRef.current.rotation.y += delta * (0.025 + progress * 0.055)
      milkyWayRef.current.rotation.x = THREE.MathUtils.lerp(0.5, 0.9, approach)
      milkyWayRef.current.scale.setScalar(THREE.MathUtils.lerp(0.86, 0.97, approach) * scaleFactor * sparkle)
    }
    if (andromedaRef.current) {
      andromedaRef.current.position.set(centerX + gap, mobile ? -1.25 : -0.1, -0.18)
      if (!reduceMotion) andromedaRef.current.rotation.y -= delta * (0.02 + progress * 0.05)
      andromedaRef.current.rotation.x = THREE.MathUtils.lerp(-0.28, 0.48, approach)
      andromedaRef.current.scale.setScalar(THREE.MathUtils.lerp(0.72, 0.93, approach) * scaleFactor)
    }
    for (const material of [milkyMaterial.current, andromedaMaterial.current]) {
      if (material) {
        material.uniforms.uProgress.value = approach
        material.uniforms.uTime.value = reduceMotion ? 0 : elapsed
      }
    }
    if (tidalMaterial.current) tidalMaterial.current.opacity = Math.pow(approach, 1.45) * 0.38
    if (tidalRef.current) {
      tidalRef.current.position.set(centerX, mobile ? -1.15 : 0, -0.35)
      tidalRef.current.scale.setScalar(0.55 + approach * 0.45)
    }
  })

  const count = typeof window !== 'undefined' && window.matchMedia('(max-width: 680px)').matches ? 5200 : 10500
  const tidalGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(createTidalData(), 3))
    return geometry
  }, [])

  return <>
    <Galaxy count={count} seed={17} color="#9a58ff" groupRef={milkyWayRef} materialRef={milkyMaterial} />
    <Galaxy count={Math.round(count * 0.82)} seed={83} color="#5d75f4" groupRef={andromedaRef} materialRef={andromedaMaterial} reverse />
    <points ref={tidalRef} geometry={tidalGeometry} frustumCulled={false}>
      <pointsMaterial ref={tidalMaterial} color="#c7a1ff" size={0.026} sizeAttenuation transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  </>
}
