<template>
  <div class="authenticated-screen">
    <div class="authenticated-content">
      <!-- Close button -->
      <button class="close-btn" @click="$emit('close')">✕</button>
      
      <!-- 3D Model Container -->
      <div ref="modelContainer" class="model-container"></div>
      
      <!-- Authentication message -->
      <div class="auth-message">
        <h2>Your game shirt is 100% authentic</h2>
      </div>
      
      <!-- Baggrundsglød -->
      <div class="neon-blur"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { loadThree } from './utils/threeLoader.js'

defineEmits(['close'])

const modelContainer = ref(null)
let scene, camera, renderer, model, animationId, handleResize
let THREE = null
let GLTFLoader = null

onMounted(async () => {
  // Load three.js fra lokal installation
  try {
    const threeLibs = await loadThree()
    THREE = threeLibs.THREE
    GLTFLoader = threeLibs.GLTFLoader
  } catch (error) {
    console.error('Failed to load three.js:', error)
    return
  }
  if (!modelContainer.value) {
    console.error('Model container not found')
    return
  }

  // Wait a bit to ensure container has size
  setTimeout(() => {
    if (!modelContainer.value) return

    // Scene setup
    scene = new THREE.Scene()
    
    // Camera setup
    const width = modelContainer.value.clientWidth || 400
    const height = modelContainer.value.clientHeight || 400
    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.set(0, 0, 5)

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      canvas: document.createElement('canvas')
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0) // Transparent background
    modelContainer.value.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)
    
    // Directional light der lyser direkte ned på modellen
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5)
    directionalLight.position.set(0, 5, 0) // Placeret direkte over modellen
    scene.add(directionalLight)

    // Animation loop
    function animate() {
      animationId = requestAnimationFrame(animate)
      if (model) {
        model.rotation.y += 0.002 // Slow rotation
      }
      renderer.render(scene, camera)
    }
    
    // Start animation loop immediately
    animate()

    // Load GLB model
    const loader = new GLTFLoader()
    loader.load(
      '/shirt.glb',
      (gltf) => {
        model = gltf.scene
        scene.add(model)
        
        // Center and scale model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2 / maxDim
        model.scale.multiplyScalar(scale)
        
        model.position.x = -center.x * scale
        model.position.y = -center.y * scale
        model.position.z = -center.z * scale
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%')
      },
      (error) => {
        console.error('Error loading model:', error)
      }
    )

    // Handle resize
    handleResize = () => {
      if (!modelContainer.value) return
      const width = modelContainer.value.clientWidth
      const height = modelContainer.value.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)
  }, 100)
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (handleResize) {
    window.removeEventListener('resize', handleResize)
  }
  if (renderer) {
    renderer.dispose()
  }
  if (modelContainer.value && renderer?.domElement) {
    modelContainer.value.removeChild(renderer.domElement)
  }
})
</script>

<style scoped>
.authenticated-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.authenticated-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.close-btn {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.model-container {
  width: 100%;
  max-width: 400px;
  height: 400px;
  min-width: 200px;
  min-height: 200px;
  position: relative;
  z-index: 1;
  pointer-events: none;
}

.model-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}

.auth-message {
  margin-top: 3rem;
  text-align: center;
  z-index: 2;
  position: relative;
}

.auth-message h2 {
  color: white;
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.2;
  max-width: 90%;
  margin: 0 auto;
}

.neon-blur {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background: #FF6B35;
  filter: blur(100px);
  opacity: 0.2;
  z-index: 0;
}

@media (max-width: 480px) {
  .auth-message h2 {
    font-size: 1.5rem;
  }
  
  .model-container {
    max-width: 300px;
    height: 300px;
  }
}
</style>

