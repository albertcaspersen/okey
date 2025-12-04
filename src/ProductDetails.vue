<template>
  <div class="product-details">
    <!-- Sticky Header -->
    <header class="sticky-header">
      <button class="back-btn" @click="$emit('close')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
      </button>
      <h1 class="header-title">{{ product.name }}</h1>
      <button class="favorite-btn" @click="toggleFavorite">
        <svg :class="{ filled: isFavorite }" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
    </header>

    <!-- Scrollable Content -->
    <div class="scroll-content">
      <!-- Product Info -->
      <section class="product-info">
        <p class="serial">Serial #{{ product.serial }}</p>
        
        <!-- Tags -->
        <div class="tags">
          <span class="tag">{{ product.type }}</span>
          <span class="tag">{{ product.season }}</span>
          <span class="tag highlight">{{ product.condition }}</span>
        </div>
      </section>

      <!-- Stats Grid -->
      <section class="stats-grid">
        <!-- Value Card -->
        <div class="stat-card value-card">
          <span class="stat-label">Markedsværdi</span>
          <div class="stat-value">
            <span class="amount">€{{ product.value.toLocaleString() }}</span>
            <span class="change positive">+{{ product.valueChange }}%</span>
          </div>
          <div class="value-chart">
            <svg viewBox="0 0 100 30" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="var(--neon)"
                stroke-width="2"
                points="0,25 15,22 30,18 45,20 60,12 75,8 90,5 100,3"
              />
            </svg>
          </div>
        </div>

        <!-- Rarity Card -->
        <div class="stat-card rarity-card">
          <span class="stat-label">Sjældenhed</span>
          <div class="stars-row">
            <svg v-for="n in 5" :key="n" width="18" height="18" viewBox="0 0 24 24" :class="{ filled: n <= product.rarityStars }">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
          </div>
        </div>

        <!-- Offers Card -->
        <div class="stat-card offers-card">
          <span class="stat-label">Aktive Bud</span>
          <div class="offers-count">{{ product.offers }}</div>
          <span class="highest-offer">Højeste: €{{ product.highestOffer.toLocaleString() }}</span>
        </div>
      </section>

      <!-- Owner History -->
      <section class="card-section">
        <h3 class="section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Ejerskabshistorik
        </h3>
        
        <div class="history-timeline">
          <div v-for="(event, index) in product.history" :key="index" class="history-item">
            <div class="timeline-dot" :class="{ current: index === 0 }"></div>
            <div class="timeline-content">
              <div class="event-header">
                <span class="event-type">{{ event.type }}</span>
                <span class="event-date">{{ event.date }}</span>
              </div>
              <p class="event-owner">{{ event.owner }}</p>
              <p v-if="event.price" class="event-price">€{{ event.price.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Details -->
      <section class="card-section">
        <h3 class="section-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          Detaljer
        </h3>
        
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Klub</span>
            <span class="detail-value">{{ product.club }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Spiller</span>
            <span class="detail-value">{{ product.player }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Nummer</span>
            <span class="detail-value">#{{ product.number }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Størrelse</span>
            <span class="detail-value">{{ product.size }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Sæson</span>
            <span class="detail-value">{{ product.season }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Type</span>
            <span class="detail-value">{{ product.type }}</span>
          </div>
        </div>
      </section>

      <!-- Action Buttons -->
      <section class="actions-section">
        <button class="btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          Sælg Trøje
        </button>
        <div class="secondary-actions">
          <button class="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span>Del</span>
          </button>
          <button class="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>Download</span>
          </button>
          <button class="btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span>Vurder</span>
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'
import { loadThree } from './utils/threeLoader.js'

defineEmits(['close'])

const props = defineProps({
  productData: {
    type: Object,
    default: null
  }
})

// Default product data (can be overridden via props)
const product = ref(props.productData || {
  name: 'FCN Home 24/25',
  serial: '8921-A',
  type: 'Match Worn',
  season: '2024/25',
  condition: 'Mint',
  value: 1250,
  valueChange: 12,
  rarityStars: 3,
  offers: 3,
  highestOffer: 1100,
  club: 'FC Nordsjælland',
  player: 'R. Højlund',
  number: 9,
  size: 'L',
  history: [
    { type: 'Nuværende Ejer', date: 'Dec 2024', owner: 'Dig', price: null },
    { type: 'Købt', date: 'Nov 2024', owner: 'Fra: FC Nordsjælland', price: 950 },
    { type: 'Match Worn', date: 'Okt 2024', owner: 'FCN vs. Brøndby (2-1)', price: null },
    { type: 'Produceret', date: 'Aug 2024', owner: 'Adidas', price: null },
  ]
})

const isFavorite = ref(false)
const modelContainer = ref(null)

let scene, camera, renderer, model, animationId, handleResize
let THREE = null
let GLTFLoader = null

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

onMounted(async () => {
  try {
    const threeLibs = await loadThree()
    THREE = threeLibs.THREE
    GLTFLoader = threeLibs.GLTFLoader
  } catch (error) {
    console.error('Failed to load three.js:', error)
    return
  }

  if (!modelContainer.value) return

  setTimeout(() => {
    if (!modelContainer.value) return

    scene = new THREE.Scene()
    
    const width = modelContainer.value.clientWidth || 300
    const height = modelContainer.value.clientHeight || 300
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.set(0, 0, 5)

    renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    modelContainer.value.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5)
    directionalLight.position.set(0, 5, 5)
    scene.add(directionalLight)

    function animate() {
      animationId = requestAnimationFrame(animate)
      if (model) {
        model.rotation.y += 0.003
      }
      renderer.render(scene, camera)
    }
    
    animate()

    const loader = new GLTFLoader()
    loader.load('/shirt.glb', (gltf) => {
      model = gltf.scene
      const redColor = new THREE.Color(0xE42223)
      
      model.traverse((child) => {
        if (child.isMesh && child.material) {
          const materials = Array.isArray(child.material) ? child.material : [child.material]
          materials.forEach((material) => {
            if (material) {
              material.color = redColor
              material.needsUpdate = true
            }
          })
        }
      })
      
      scene.add(model)
      
      const box = new THREE.Box3().setFromObject(model)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2.2 / maxDim
      model.scale.multiplyScalar(scale)
      
      model.position.x = -center.x * scale
      model.position.y = -center.y * scale
      model.position.z = -center.z * scale
    })

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
  if (animationId) cancelAnimationFrame(animationId)
  if (handleResize) window.removeEventListener('resize', handleResize)
  if (renderer) renderer.dispose()
  if (modelContainer.value && renderer?.domElement) {
    modelContainer.value.removeChild(renderer.domElement)
  }
})
</script>

<style scoped>
/* --- VARIABLES --- */
.product-details {
  --bg-color: #F6F6F6;
  --card-bg: rgba(255, 255, 255, 0.85);
  --glass-border: rgba(0, 0, 0, 0.08);
  --neon: #E42223;
  --text-main: #1a1a1a;
  --text-muted: #666666;
  --dark-card: rgba(30, 30, 30, 0.95);
  --spacing: 1rem;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 200;
}

/* Sticky Header */
.sticky-header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem var(--spacing);
  padding-top: max(0.75rem, env(safe-area-inset-top));
  background: rgba(246, 246, 246, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  z-index: 100;
  flex-shrink: 0;
}

.back-btn,
.favorite-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.back-btn:active,
.favorite-btn:active {
  transform: scale(0.95);
}

.back-btn svg {
  color: var(--text-main);
}

.favorite-btn svg {
  color: var(--text-muted);
  transition: all 0.2s ease;
}

.favorite-btn svg.filled {
  fill: var(--neon);
  stroke: var(--neon);
}

.header-title {
  flex: 1;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
  text-align: center;
  margin: 0 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Scrollable Content */
.scroll-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  padding: var(--spacing);
  padding-bottom: calc(var(--spacing) + env(safe-area-inset-bottom));
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Hero Section */
.hero-section {
  background: var(--dark-card);
  border-radius: 1.25rem;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

.model-wrapper {
  position: relative;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.model-container {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
}

.model-container canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}

.neon-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: var(--neon);
  filter: blur(60px);
  opacity: 0.4;
  z-index: 1;
}

.status-badges {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  align-items: flex-end;
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem 0.6rem;
  border-radius: 2rem;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.badge.live {
  background: rgba(228, 34, 35, 0.2);
  color: var(--neon);
}

/* Product Info */
.product-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.serial {
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-family: 'SF Mono', Monaco, monospace;
  margin: 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.4rem 0.75rem;
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  border-radius: 2rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--text-main);
}

.tag.highlight {
  background: var(--neon);
  color: white;
  border-color: var(--neon);
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.625rem;
}

.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  border-radius: 1rem;
  padding: 1rem;
  position: relative;
  overflow: hidden;
}

.stat-label {
  display: block;
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  margin-bottom: 0.375rem;
}

/* Value Card */
.value-card {
  grid-column: 1 / -1;
}

.value-card .stat-value {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.value-card .amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
}

.value-card .change {
  font-size: 0.75rem;
  font-weight: 600;
}

.value-card .change.positive {
  color: #22c55e;
}

.value-chart {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;
  opacity: 0.25;
}

.value-chart svg {
  width: 100%;
  height: 100%;
}

/* Rarity Card */
.rarity-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--card-bg);
  min-height: 100px;
  position: relative;
}

.rarity-card .stat-label {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
}

.stars-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stars-row svg {
  fill: rgba(0, 0, 0, 0.1);
  stroke: none;
  transition: fill 0.2s ease;
}

.stars-row svg.filled {
  fill: var(--neon);
  filter: drop-shadow(0 0 3px rgba(228, 34, 35, 0.4));
}

/* Offers Card */
.offers-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100px;
  position: relative;
}

.offers-card .stat-label {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
}

.offers-count {
  font-size: 2rem;
  font-weight: 700;
  color: var(--neon);
  line-height: 1;
  margin-top: 1.2rem;
  margin-bottom: 0.25rem;
}

.highest-offer {
  font-size: 0.6875rem;
  color: var(--text-muted);
}

/* Card Sections */
.card-section {
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  border-radius: 1rem;
  padding: 1rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 1rem 0;
}

.section-title svg {
  color: var(--neon);
  flex-shrink: 0;
}

/* History Timeline */
.history-timeline {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  position: relative;
  padding-left: 1.25rem;
}

.history-timeline::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: var(--glass-border);
}

.history-item {
  position: relative;
}

.timeline-dot {
  position: absolute;
  left: -1.25rem;
  top: 3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.15);
  border: 2px solid var(--bg-color);
}

.timeline-dot.current {
  background: var(--neon);
  box-shadow: 0 0 0 3px rgba(228, 34, 35, 0.2);
}

.timeline-content {
  min-height: 2rem;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.125rem;
}

.event-type {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--text-main);
}

.event-date {
  font-size: 0.6875rem;
  color: var(--text-muted);
}

.event-owner {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0;
}

.event-price {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--neon);
  margin: 0.125rem 0 0 0;
}

/* Details Grid */
.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.875rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.detail-label {
  font-size: 0.625rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.detail-value {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-main);
}

/* Actions Section */
.actions-section {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-top: 0.5rem;
  padding-bottom: 1rem;
}

.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.875rem;
  background: var(--neon);
  border: none;
  border-radius: 0.875rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:active {
  transform: scale(0.98);
}

.secondary-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.btn-secondary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.75rem 0.5rem;
  background: var(--card-bg);
  border: 1px solid var(--glass-border);
  border-radius: 0.875rem;
  color: var(--text-main);
  font-size: 0.6875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:active {
  transform: scale(0.95);
  background: rgba(0, 0, 0, 0.05);
}

.btn-secondary svg {
  color: var(--text-muted);
}

.btn-secondary span {
  line-height: 1;
}

/* Responsive - Small phones */
@media (max-width: 375px) {
  .product-details {
    --spacing: 0.875rem;
  }

  .sticky-header {
    padding: 0.625rem var(--spacing);
  }

  .back-btn,
  .favorite-btn {
    width: 36px;
    height: 36px;
  }

  .header-title {
    font-size: 0.9375rem;
  }

  .model-wrapper {
    height: 180px;
  }

  .value-card .amount {
    font-size: 1.375rem;
  }

  .offers-count {
    font-size: 1.75rem;
  }

  .auth-score {
    width: 50px;
    height: 50px;
  }

  .auth-score .score {
    font-size: 0.8125rem;
  }
}

/* Responsive - Very small phones */
@media (max-width: 320px) {
  .product-details {
    --spacing: 0.75rem;
  }

  .model-wrapper {
    height: 160px;
  }

  .stats-grid {
    gap: 0.5rem;
  }

  .stat-card {
    padding: 0.875rem;
  }

  .value-card .amount {
    font-size: 1.25rem;
  }

  .btn-primary {
    padding: 0.75rem;
    font-size: 0.8125rem;
  }

  .btn-secondary {
    padding: 0.625rem 0.375rem;
    font-size: 0.625rem;
  }
}
</style>
