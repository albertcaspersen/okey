<template>
  <!-- BENTO GRID (Gamification) -->
  <section class="bento-section">
    <div class="section-header">
      <h2>Track. Trade. Showcase.</h2>
    </div>

    <div class="grid-container">
      
      <!-- Box 1: Autenticitet (Bred) -->
      <div class="box wide glow-effect">
        <div class="badge">Officiel Ejer</div>
        <span class="live-indicator">● LIVE</span>
        <div class="box-content">
          <h3>FCN Home 24/25</h3>
          <p>Serial #8921-A • Match Worn</p>
        </div>
        <!-- 3D Model Container -->
        <div ref="modelContainer" class="model-container"></div>
        <!-- Baggrundsglød -->
        <div class="neon-blur"></div>
      </div>

      <!-- Box 2: Fan Score (Kvadratisk) -->
      <div class="box square">
        <span class="box-label">Fan Score</span>
        <div class="chart-container">
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle" stroke-dasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <span class="score-text">85<small>%</small></span>
        </div>
      </div>

      <!-- Box 3: Rewards (Kvadratisk) -->
      <div class="box square reward-box">
        <span class="box-label">Rewards</span>
        <div class="reward-icon">🎟️</div>
        <div class="reward-text">+2 Tickets</div>
      </div>

      <!-- Box 4: Market Value -->
      <div class="box market-value">
        <span class="box-label">Market Value</span>
        <div class="value-content">
          <span class="value-amount">€1,250</span>
          <span class="value-change positive">+12%</span>
        </div>
      </div>

      <!-- Box 5: Offers -->
      <div class="box offers">
        <span class="box-label">Offers</span>
        <div class="offers-count">3</div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { loadThree } from './utils/threeLoader.js'

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
    const height = modelContainer.value.clientHeight || 300
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
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  // Animation loop
  function animate() {
    animationId = requestAnimationFrame(animate)
    if (model) {
      model.rotation.y += 0.005 // Slow rotation
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
      
      model.position.x = -center.x * scale + 2 // Offset til højre
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
/* --- VARIABLER --- */
:root {
  --bg-color: #F5F5F5;
  --card-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(0, 0, 0, 0.1);
  --neon: #FF6B35;
  --text-main: #1a1a1a;
  --text-muted: #666666;
  --grid-margin: 1.25rem;
}

/* --- BENTO GRID --- */
.bento-section { 
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: var(--grid-margin) 1fr 1fr 1fr 1fr var(--grid-margin);
  margin-top: 7rem;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-header {
  grid-column: 2 / -2;
  display: flex; justify-content: space-between; align-items: baseline;
}
.section-header h2 { 
    font-size: 2rem; 
    font-weight: 700;
    margin-bottom: 1rem;
}
.live-indicator { 
  position: absolute; 
  top: 1rem; 
  right: 1rem; 
  color: var(--neon); 
  font-size: 0.625rem; 
  font-weight: 700; 
  letter-spacing: 0.03125rem; 
  z-index: 3;
}

.grid-container {
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
  align-content: start;
}

.box {
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 1.25rem;
  padding: 1rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.box.wide { grid-column: 1 / -1; display: flex; flex-direction: column; justify-content: space-between; height: 14rem; position: relative; }
.box.square { grid-column: span 2; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }

/* Authentic Box specific */
.badge {
  background: var(--neon); color: black;
  font-size: 0.625rem; font-weight: 800; text-transform: uppercase;
  padding: 0.25rem 0.5rem; border-radius: 0.375rem; align-self: flex-start;
  z-index: 2;
}
.box-content { z-index: 2; }
.box-content h3 { font-size: 1.125rem; margin-bottom: 0.25rem; }
.box-content p { font-size: 0.75rem; color: var(--text-muted); }
.model-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 200px;
  min-height: 200px;
  z-index: 1;
  pointer-events: none;
}
.model-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
.neon-blur {
  position: absolute; top: -1.875rem; right: -1.875rem;
  width: 6.25rem; height: 6.25rem; background: var(--neon);
  filter: blur(3rem); opacity: 0.15;
}

/* Fan Score specific */
.box-label { position: absolute; top: 1rem; left: 1rem; font-size: 0.6875rem; color: var(--text-muted); }
.chart-container { position: relative; width: 4.375rem; height: 4.375rem; display: flex; align-items: center; justify-content: center; }
.circular-chart { width: 100%; height: 100%; transform: rotate(-90deg); }
.circle-bg { fill: none; stroke: rgba(0, 0, 0, 0.1); stroke-width: 0.1875rem; }
.circle { fill: none; stroke: var(--neon); stroke-width: 0.1875rem; stroke-linecap: round; }
.score-text { position: absolute; font-weight: 700; font-size: 1rem; color: var(--text-main); }
.score-text small { font-size: 0.625rem; opacity: 0.7; }

/* Rewards specific */
.reward-icon { font-size: 2rem; margin-bottom: 0.25rem; }
.reward-text { font-size: 0.875rem; font-weight: 600; }

/* Market Value specific */
.box.market-value { 
  grid-column: 1 / 4; 
  display: flex; 
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  min-height: 8rem;
}
.value-content { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; margin-top: 0.5rem; }
.value-amount { font-size: 1.5rem; font-weight: 700; }
.value-change { font-size: 0.875rem; font-weight: 600; }
.value-change.positive { color: var(--neon); }
.value-change.negative { color: #ff4444; }

/* Offers specific */
.box.offers {
  grid-column: 4 / 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 8rem;
}
.offers-count { font-size: 2rem; font-weight: 700; }
</style>

