<template>
  <!-- BENTO GRID (Gamification) -->
  <section class="bento-section">
    <div class="section-header">
      <h2>Track. Trade. <br> Showcase.</h2>
    </div>

    <div class="grid-container">
      
      <!-- Box 1: Autenticitet (Bred) -->
      <div class="box wide glow-effect">
        <div class="badge-container">
          <div class="badge">Officiel Ejer</div>
          <div class="player-name">R. HØJLUND</div>
        </div>
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

  <!-- REWARDS SECTION -->
  <section class="rewards-section">
    <!-- Header -->
    <div class="section-header">
      <h2>Rewards</h2>
    </div>

    <!-- Total Score Card -->
    <div class="total-score-card">
      <div class="logo-bg">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <div class="score-header">
        <span class="score-label">TOTAL SCORE</span>
      </div>
      <div class="score-value">1240</div>
      <div class="score-actions">
        <button class="btn-leaderboard">Leaderboard</button>
        <button class="btn-history">Historik</button>
      </div>
    </div>

    <!-- Active Raffles -->
    <div class="raffles-section">
      <div class="section-title">
        <svg class="title-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
        <h3>Aktive Raffles</h3>
      </div>
      <div class="raffle-card">
        <div class="raffle-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
        </div>
        <div class="raffle-content">
          <h4>Vind en signeret bold</h4>
          <p>Scan din trøje inden 1. marts</p>
        </div>
        <button class="btn-participate">Deltag</button>
      </div>
    </div>

    <!-- Badges Section -->
    <div class="badges-section">
      <h3 class="section-title-text">Dine Badges</h3>
      <div class="badges-grid">
        <div class="badge-card">
          <div class="badge-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 20.24 17 20.24 17 22"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
          </div>
          <span class="badge-name">First 1000</span>
        </div>
        <div class="badge-card">
          <div class="badge-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 12h20M12 2v20M17 7l-5-5-5 5M17 17l-5 5-5-5"></path>
            </svg>
          </div>
          <span class="badge-name">Winter Warrior</span>
        </div>
        <div class="badge-card">
          <div class="badge-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
          </div>
          <span class="badge-name">Hat-trick Hero</span>
        </div>
        <div class="badge-card">
          <div class="badge-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
            </svg>
          </div>
          <span class="badge-name">Derby Day</span>
        </div>
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
  --bg-color: #F6F6F6;
  --card-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(0, 0, 0, 0.1);
  --neon: #E42223;
  --text-main: #1a1a1a;
  --text-muted: #666666;
  --grid-margin: 1.25rem;
  --dark-card: rgba(30, 30, 30, 0.9);
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

.bento-section .section-header {
  grid-column: 2 / -2;
  display: flex; justify-content: space-between; align-items: baseline;
}
.bento-section .section-header h2 { 
    font-size: 2rem; 
    font-weight: 500;
    margin-bottom: 1rem;
}
.live-indicator { 
  position: absolute; 
  top: 1rem; 
  right: 1rem; 
  color: var(--neon); 
  font-size: 0.625rem; 
  font-weight: 700; 
  letter-spacing: 0.03rem; 
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
}

.box.wide { grid-column: 1 / -1; display: flex; flex-direction: column; justify-content: space-between; height: 14rem; position: relative; }
.box.square { grid-column: span 2; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }

/* Authentic Box specific */
.badge-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-self: flex-start;
  z-index: 2;
}

.badge {
  background: var(--neon); color: rgb(255, 255, 255);
  font-size: 0.625rem; font-weight: 800; text-transform: uppercase;
  padding: 0.25rem 0.5rem; border-radius: 0.375rem;
}

.player-name {
  background: var(--text-muted); color: rgb(255, 255, 255);
  font-size: 0.625rem; font-weight: 800; text-transform: uppercase;
  padding: 0.25rem 0.5rem; border-radius: 0.375rem;
  text-align: center;
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
  filter: blur(3rem); opacity: 0.35;
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

/* --- REWARDS SECTION --- */
.rewards-section {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: var(--grid-margin) 1fr 1fr 1fr 1fr var(--grid-margin);
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
}

.section-header {
  grid-column: 2 / -2;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 500;
  color: var(--text-main);
}

/* Total Score Card */
.total-score-card {
  grid-column: 2 / -2;
  background: var(--neon);
  border-radius: 1.5rem;
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}

.logo-bg {
  position: absolute;
  top: 50%;
  left: 70%;
  transform: translate(-50%, -50%);
  opacity: 0.10;
  z-index: 0;
  pointer-events: none;
}

.logo-bg img {
  width: 200px;
  height: auto;
  display: block;
  filter: grayscale(100%);
}

.score-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.score-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  letter-spacing: 1px;
}

.trophy-icon {
  width: 48px;
  height: 48px;
  opacity: 0.3;
  color: white;
}

.trophy-icon svg {
  width: 100%;
  height: 100%;
}

.score-value {
  font-size: 4rem;
  font-weight: 900;
  color: white;
  line-height: 1;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.score-actions {
  display: flex;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
}

.btn-leaderboard,
.btn-history {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-leaderboard {
  background: white;
  color: var(--neon);
}

.btn-leaderboard:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-history {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(10px);
}

.btn-history:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Raffles Section */
.raffles-section {
  grid-column: 2 / -2;
  margin-bottom: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.title-icon {
  width: 20px;
  height: 20px;
  color: var(--neon);
  flex-shrink: 0;
}

.section-title h3,
.section-title-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
}

.raffle-card {
  background: var(--dark-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 1.25rem;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.raffle-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: white;
}

.raffle-icon svg {
  width: 32px;
  height: 32px;
}

.raffle-content {
  flex: 1;
}

.raffle-content h4 {
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
}

.raffle-content p {
  font-size: 0.875rem;
  color: var(--text-muted);
}

.btn-participate {
  padding: 0.625rem 1.25rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.btn-participate:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Badges Section */
.badges-section {
  grid-column: 2 / -2;
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.badge-card {
  background: var(--dark-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 1.25rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  aspect-ratio: 1;
}

.badge-icon {
  width: 40px;
  height: 40px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-icon svg {
  width: 100%;
  height: 100%;
}

.badge-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  text-align: center;
}

@media (max-width: 480px) {
  .score-value {
    font-size: 3rem;
  }
  
  .total-score-card {
    padding: 1.5rem;
  }
  
  .badges-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>

