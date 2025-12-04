<template>
  <div class="authenticated-screen">
    <!-- Navigation Bar -->
    <nav class="top-nav">
      <button class="nav-back" @click="$emit('close')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="nav-title">Højlund Signed Game Jersey</h1>
      <button class="nav-search">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
    </nav>

    <div class="authenticated-content">
      <!-- 3D Model Container -->
      <div ref="modelContainer" class="model-container"></div>
      
      <!-- Authentication message -->
      <div class="auth-message">
        <p>YOUR GAME JERSEY IS 100% AUTHENTIC</p>
      </div>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="btn-primary" @click="handleViewDetails">VIEW PRODUCT DETAILS</button>
        <button class="btn-primary">ADD TO MY COLLECTION</button>
        <button class="btn-secondary">ACCESS REWARDS</button>
        <button class="btn-secondary">REGISTER FOR EARLY ACCESS</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { loadThree } from './utils/threeLoader.js'

const emit = defineEmits(['close'])

// Inject the openProductDetails function from App
const openProductDetails = inject('openProductDetails', () => {})

const handleViewDetails = () => {
  emit('close') // Close authenticated screen first
  openProductDetails() // Then open product details
}

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
      // Model rotation removed
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
        
        // Change model color to red (#E42223) and apply logo
        const redColor = new THREE.Color(0xE42223)
        
        // Create a canvas texture with red background and logo
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = 512
        canvas.height = 512
        
        // Fill with red color
        ctx.fillStyle = '#E42223'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Load logo image and draw it centered on chest area
        const logoImg = new Image()
        logoImg.crossOrigin = 'anonymous'
        logoImg.onload = () => {
          // Position logo on chest (upper center area)
          const logoSize = 120
          const x = (canvas.width - logoSize) / 2
          const y = canvas.height * 0.25 // Upper part for chest
          ctx.drawImage(logoImg, x, y, logoSize, logoSize)
          
          // Create texture from canvas
          const combinedTexture = new THREE.CanvasTexture(canvas)
          combinedTexture.flipY = false
          combinedTexture.needsUpdate = true
          
          // Apply texture to all meshes
          model.traverse((child) => {
            if (child.isMesh) {
              if (child.material) {
                // Handle both single material and array of materials
                const materials = Array.isArray(child.material) ? child.material : [child.material]
                materials.forEach((material) => {
                  if (material) {
                    material.color = redColor
                    material.map = combinedTexture
                    material.needsUpdate = true
                  }
                })
              }
            }
          })
        }
        logoImg.onerror = () => {
          // If logo fails to load, just use red color
          model.traverse((child) => {
            if (child.isMesh) {
              if (child.material) {
                const materials = Array.isArray(child.material) ? child.material : [child.material]
                materials.forEach((material) => {
                  if (material) {
                    material.color = redColor
                    material.needsUpdate = true
                  }
                })
              }
            }
          })
        }
        logoImg.src = '/logo.svg'
        
        scene.add(model)
        
        // Center and scale model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        const size = box.getSize(new THREE.Vector3())
        
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 3 / maxDim
        model.scale.multiplyScalar(scale)
        
        // Center the model at origin
        model.position.set(0, 0, 0)
        
        // Adjust position to account for original center offset
        const newBox = new THREE.Box3().setFromObject(model)
        const newCenter = newBox.getCenter(new THREE.Vector3())
        model.position.sub(newCenter)
        
        // Move model down slightly
        model.position.y -= 0.3
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
  background: #ffffff;
  z-index: 2000;
  overflow-y: auto;
  max-width: 460px;
  margin: 0 auto;
}

/* Navigation Bar */
.top-nav {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  z-index: 100;
}

.nav-back,
.nav-search {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;
}

.nav-back:hover,
.nav-search:hover {
  opacity: 0.6;
}

.nav-title {
  flex: 1;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  color: #1a1a1a;
  margin: 0;
  padding: 0 1rem;
  line-height: 1.2;
}

.authenticated-content {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1.25rem;
  padding-bottom: 4rem;
}

.model-container {
  width: 100%;
  max-width: 100%;
  height: 50vh;
  min-height: 300px;
  max-height: 500px;
  position: relative;
  z-index: 1;
  pointer-events: none;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.model-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
  margin: 0 auto;
}

.auth-message {
  text-align: center;
  z-index: 2;
  position: relative;
  margin-bottom: 2rem;
}

.auth-message p {
  color: #1a1a1a;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin: 0;
}

.action-buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 100%;
}

.btn-primary,
.btn-secondary {
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn-primary {
  background: #1a1a1a;
  color: #ffffff;
}

.btn-primary:hover {
  background: #333333;
}

.btn-secondary {
  background: transparent;
  color: #1a1a1a;
  border: 1.5px solid #1a1a1a;
}

.btn-secondary:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* Responsive breakpoints */
@media (max-width: 460px) {
  .authenticated-screen {
    max-width: 100%;
  }
  
  .top-nav {
    padding: 0.875rem 1rem;
  }
  
  .nav-title {
    font-size: 0.875rem;
    padding: 0 0.75rem;
  }
  
  .nav-back,
  .nav-search {
    padding: 0.4rem;
  }
  
  .nav-back svg,
  .nav-search svg {
    width: 20px;
    height: 20px;
  }
  
  .model-container {
    height: 40vh;
    min-height: 250px;
    max-height: 400px;
    margin-bottom: 1.5rem;
  }

  .authenticated-content {
    padding: 1.5rem 1rem;
    padding-bottom: 3rem;
  }
  
  .auth-message {
    margin-bottom: 1.5rem;
  }
  
  .auth-message p {
    font-size: 0.8125rem;
  }
  
  .action-buttons {
    gap: 0.625rem;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 0.875rem 1.25rem;
    font-size: 0.8125rem;
  }
}

@media (max-width: 375px) {
  .top-nav {
    padding: 0.75rem 0.875rem;
  }
  
  .nav-title {
    font-size: 0.8125rem;
    padding: 0 0.5rem;
  }
  
  .nav-back svg,
  .nav-search svg {
    width: 18px;
    height: 18px;
  }
  
  .model-container {
    height: 35vh;
    min-height: 220px;
    max-height: 350px;
    margin-bottom: 1.25rem;
  }

  .authenticated-content {
    padding: 1.25rem 0.875rem;
    padding-bottom: 2.5rem;
  }
  
  .auth-message p {
    font-size: 0.75rem;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
  }
}

@media (max-width: 320px) {
  .top-nav {
    padding: 0.625rem 0.75rem;
  }
  
  .nav-title {
    font-size: 0.75rem;
    padding: 0 0.375rem;
  }
  
  .nav-back svg,
  .nav-search svg {
    width: 16px;
    height: 16px;
  }
  
  .model-container {
    height: 30vh;
    min-height: 200px;
    max-height: 300px;
    margin-bottom: 1rem;
  }

  .authenticated-content {
    padding: 1rem 0.75rem;
    padding-bottom: 2rem;
  }
  
  .auth-message {
    margin-bottom: 1rem;
  }
  
  .auth-message p {
    font-size: 0.6875rem;
  }
  
  .action-buttons {
    gap: 0.5rem;
  }
  
  .btn-primary,
  .btn-secondary {
    padding: 0.625rem 0.875rem;
    font-size: 0.6875rem;
  }
}
</style>

