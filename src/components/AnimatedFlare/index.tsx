import flare from './flare.png'
import React, { useRef, useEffect } from 'react'
import {
  Texture,
  Scene,
  Camera,
  WebGLRenderer,
  TextureLoader,
  ClampToEdgeWrapping,
  ShaderMaterial,
  PlaneGeometry,
  Mesh
} from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Wave-like distortion
    float waveX = sin(uv.y * 10.0 + uTime * 1.5) * 0.01;
    float waveY = cos(uv.x * 10.0 + uTime * 1.2) * 0.01;
    uv.x += waveX;
    uv.y += waveY;

    vec4 tex = texture2D(uTexture, uv);

    // Optional flicker
    float flicker = 0.95 + 0.05 * sin(uTime * 5.0);
    tex.rgb *= flicker;

    gl_FragColor = tex;
  }
`

export interface AnimatedFlareProps {
  children?: React.ReactNode
  className?: string
}

export default function AnimatedFlare({
  className = '',
  children
}: AnimatedFlareProps) {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const ref = mountRef.current
    if (!ref) return

    const scene = new Scene()
    const camera = new Camera()
    const renderer = new WebGLRenderer({ alpha: true })

    renderer.domElement.className = 'blur-sm'
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.inset = '0px'
    renderer.domElement.style.zIndex = '0'

    const setCanvasSize = () => {
      renderer.setSize(ref.clientWidth, ref.clientHeight)
    }

    setCanvasSize()
    ref.appendChild(renderer.domElement)

    const uniforms = {
      uTime: { value: 0 },
      uTexture: { value: null as Texture | null }
    }

    const loader = new TextureLoader()
    loader.load(flare.src, (texture) => {
      texture.wrapS = texture.wrapT = ClampToEdgeWrapping
      uniforms.uTexture.value = texture

      const material = new ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true
      })

      const geometry = new PlaneGeometry(2, 2)
      const mesh = new Mesh(geometry, material)
      scene.add(mesh)

      const animate = (time: number) => {
        uniforms.uTime.value = time * 0.001
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
      }
      animate(0)
    })

    window.addEventListener('resize', setCanvasSize)

    return () => {
      renderer.dispose()
      window.removeEventListener('resize', setCanvasSize)
      ref.removeChild(renderer.domElement)
    }
  }, [mountRef])

  return (
    <div ref={mountRef} className={className}>
      {children}
    </div>
  )
}
