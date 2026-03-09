import face from './assets/face.svg'
import shadow from './assets/shadow.png'
import { useEffect, useRef } from 'react'
import {
  Scene,
  AmbientLight,
  PlaneGeometry,
  MeshBasicMaterial,
  DirectionalLight,
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  MeshStandardMaterial,
  CylinderGeometry,
  Mesh,
  SRGBColorSpace
} from 'three'

// Replace these with your base64 or URLs
const faceImage = face.src
const shadowImage = shadow.src

export interface CertifiedDeveloperCoinProps {
  className?: string
}

export default function CertifiedDeveloperCoin({
  className = ''
}: CertifiedDeveloperCoinProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mountEl = mountRef.current
    if (!mountEl) return

    // Scene setup
    const scene = new Scene()

    // Camera
    const camera = new PerspectiveCamera(40, 1)
    camera.position.z = 5

    // Create render
    const renderer = new WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(mountEl.clientWidth, mountEl.clientHeight)
    renderer.domElement.className =
      'absolute inset-0 !w-full !h-full cursor-pointer'

    renderer.outputColorSpace = SRGBColorSpace

    // Add renderer canvas to DOM
    mountEl.appendChild(renderer.domElement)

    // Texture loader
    const loader = new TextureLoader()
    // Load textures
    const faceTexture = loader.load(faceImage)
    const shadowTexture = loader.load(shadowImage)

    faceTexture.colorSpace = SRGBColorSpace
    shadowTexture.colorSpace = SRGBColorSpace

    // Materials for coin
    const materials = [
      // Edge
      new MeshStandardMaterial({
        color: 0x3c3c3c,
        metalness: 0.4,
        roughness: 0.6
      }),

      // Front
      new MeshStandardMaterial({
        map: faceTexture,
        metalness: 0.5,
        roughness: 0.3
      }),

      // Back
      new MeshStandardMaterial({
        map: faceTexture,
        metalness: 0.5,
        roughness: 0.3
      })
    ]

    // Fake soft shadow plane under coin
    const shadowPlane = new Mesh(
      new PlaneGeometry(3, 3),
      new MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        opacity: 0.3,
        depthWrite: false
      })
    )
    shadowPlane.rotation.x = -Math.PI / 2
    shadowPlane.position.y = -1
    scene.add(shadowPlane)

    // Coin geometry and mesh
    const geometry = new CylinderGeometry(1, 1, 0.1, 64)
    const coin = new Mesh(geometry, materials)
    coin.rotation.x = Math.PI / 2
    scene.add(coin)

    // Lights for coin shine
    scene.add(new AmbientLight(0xffffff, 2))
    const directionalLight = new DirectionalLight(0xffffff, 0.3)
    directionalLight.intensity = 3
    directionalLight.position.set(3, 3, 5)
    scene.add(directionalLight)

    // Handle window resize
    const onResize = () => {
      const mountEl = mountRef.current
      if (!mountEl) return
      const pixelRatio = window.devicePixelRatio
      const mountBounding = mountEl.getBoundingClientRect()
      camera.aspect = mountBounding.width / mountBounding.height
      camera.updateProjectionMatrix()
      renderer.setSize(
        mountBounding.width * pixelRatio,
        mountBounding.height * pixelRatio
      )
    }

    // Mouse movement handling for subtle coin tilt
    let targetTiltX = 0
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      targetTiltX = x * 0.9
    }

    // Spin control
    let spinning = false
    let spinStartTime = 0
    let initialZ = 0
    const spinDuration = 2000
    const totalSpin = Math.PI * 4

    const onClick = () => {
      if (!spinning) {
        spinning = true
        spinStartTime = performance.now()
        initialZ = coin.rotation.z
      }
    }

    // Animation loop
    function animate(time?: number) {
      window.requestAnimationFrame(animate)

      if (spinning && time !== undefined) {
        const elapsed = time - spinStartTime
        const progress = Math.min(elapsed / spinDuration, 1)
        const eased = (1 - Math.cos(progress * Math.PI)) / 2
        coin.rotation.z = initialZ + totalSpin * eased

        if (progress >= 1) {
          spinning = false
        }
      }

      if (!spinning) {
        coin.rotation.z = targetTiltX
      }

      renderer.render(scene, camera)
    }

    // Init and attach events
    animate()
    onResize()
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    mountEl.addEventListener('click', onClick)

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      mountEl.removeEventListener('click', onClick)

      renderer.dispose()
      geometry.dispose()
      materials.forEach((m) => m.dispose())
      faceTexture.dispose()
      shadowTexture.dispose()

      scene.remove(shadowPlane)
      shadowPlane.geometry.dispose()
      shadowPlane.material.dispose()

      scene.remove(coin)
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className={`relative aspect-square w-full ${className}`}
    />
  )
}
