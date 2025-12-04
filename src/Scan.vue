<template>
  <!-- HERO SECTION -->
  <header class="hero">
    <!-- Baggrundsbillede med overlay -->
    <div class="hero-bg"></div>
    
    <div class="hero-content">
      <div class="text-block">
        <h1>OWN THE<br>GAME.</h1>
        <p>Gør din trøjesamling digital. 100% Autentisk. 100% Din.</p>
      </div>

      <!-- Glass Action Card -->
      <div class="glass-card floating" @click="openCamera">
        <div class="gc-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
            <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
            <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
            <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
            <rect x="7" y="7" width="10" height="10" rx="1"></rect>
          </svg>
        </div>
        <div class="gc-text">
          <span class="label">Har du en trøje?</span>
          <span class="action">Scan & Validér</span>
        </div>
        <button class="gc-arrow">→</button>
      </div>
    </div>
  </header>

  <!-- Camera Modal -->
  <div v-if="isCameraOpen && !showAuthenticated" class="camera-modal" @click.self="closeCamera">
    <div class="camera-container">
      <div ref="qrScannerContainer" id="qr-scanner" class="qr-scanner-container"></div>
      <div class="camera-controls">
        <button class="close-btn" @click="closeCamera">✕</button>
      </div>
      <div v-if="error" class="error-message">{{ error }}</div>
      <div class="scanning-overlay">
        <div class="scanning-frame"></div>
        <p class="scanning-text">Ret QR-koden inden for rammen</p>
      </div>
    </div>
  </div>

  <!-- Authenticated Screen -->
  <Authenticated v-if="showAuthenticated" @close="closeAuthenticated" />
</template>

<script setup>
import { ref, onUnmounted, nextTick } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'
import Authenticated from './Authenticated.vue'

const isCameraOpen = ref(false)
const qrScannerContainer = ref(null)
const showAuthenticated = ref(false)
const error = ref(null)
let html5QrCode = null

const openCamera = async () => {
  try {
    error.value = null
    isCameraOpen.value = true
    
    // Wait for DOM to update
    await nextTick()
    
    if (!qrScannerContainer.value) return
    
    // Initialize QR code scanner
    html5QrCode = new Html5Qrcode(qrScannerContainer.value.id)
    
    // Start scanning
    await html5QrCode.start(
      {
        facingMode: 'environment' // Use back camera on mobile
      },
      {
        fps: 10, // Frames per second
        qrbox: { width: 250, height: 250 }, // Scanning area
        aspectRatio: 1.0
      },
      (decodedText, decodedResult) => {
        // QR code detected - show authenticated screen
        onQRCodeScanned(decodedText)
      },
      (errorMessage) => {
        // Ignore scanning errors (they happen frequently during scanning)
        // Only log if it's a real error
        if (errorMessage && !errorMessage.includes('NotFoundException')) {
          console.log('QR scan error:', errorMessage)
        }
      }
    )
  } catch (err) {
    console.error('Error accessing camera:', err)
    error.value = err.name === 'NotAllowedError' 
      ? 'Kameraadgang blev afvist. Tillad kameraadgang i browserindstillingerne.'
      : err.name === 'NotFoundError'
      ? 'Ingen kamera fundet.'
      : 'Kunne ikke åbne kameraet. Prøv igen.'
  }
}

const onQRCodeScanned = (qrCodeText) => {
  // Stop scanning
  if (html5QrCode) {
    html5QrCode.stop().then(() => {
      html5QrCode.clear()
      html5QrCode = null
    }).catch(() => {
      html5QrCode = null
    })
  }
  
  // Show authenticated screen (regardless of QR code content)
  isCameraOpen.value = false
  showAuthenticated.value = true
}

const closeCamera = async () => {
  // Stop QR scanner
  if (html5QrCode) {
    try {
      await html5QrCode.stop()
      html5QrCode.clear()
    } catch (err) {
      console.log('Error stopping scanner:', err)
    }
    html5QrCode = null
  }
  
  isCameraOpen.value = false
  error.value = null
}

const closeAuthenticated = () => {
  showAuthenticated.value = false
}

// Cleanup on unmount
onUnmounted(async () => {
  await closeCamera()
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
  --grid-margin: 20px;
}

/* --- HERO --- */
.hero {
  grid-column: 1 / -1;
  height: 90vh;
  position: relative;
  display: grid;
  grid-template-columns: var(--grid-margin) 1fr 1fr 1fr 1fr var(--grid-margin);
  align-content: end;
}

.hero-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 110%;
  /* Billede af fodboldtrøje tekstur */
  background-image: url('https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=2564&auto=format&fit=crop'); 
  background-size: cover;
  background-position: center bottom;
  z-index: 0;
}
/* Mørk fade i bunden og toppen for læsbarhed */
.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(245,245,245,0.3), rgba(245,245,245,0) 40%, rgba(245,245,245,0.95) 90%);
}

.hero-content {
  grid-column: 2 / -2;
  position: relative;
  z-index: 10;
  margin-bottom: 20px;
}

.text-block h1 {
  font-size: 3rem;
  line-height: 0.9;
  font-weight: 500;
  margin-bottom: 12px;
  text-transform: uppercase;
}
.text-block p {
  color: var(--text-muted);
  font-size: 16px;
  margin-bottom: 32px;
  max-width: 80%;
}

/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.glass-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.glass-card:active {
  transform: translateY(0);
}

.gc-icon {
  width: 44px; height: 44px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--neon);
}

.gc-text { display: flex; flex-direction: column; flex: 1; }
.gc-text .label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; }
.gc-text .action { font-size: 15px; font-weight: 600; color: var(--text-main); }

.gc-arrow {
  background: var(--text-main);
  color: black;
  border: none;
  width: 36px; height: 36px;
  border-radius: 50%;
  font-weight: bold;
}

/* Camera Modal */
.camera-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.qr-scanner-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.qr-scanner-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scanning-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 100;
}

.scanning-frame {
  width: 250px;
  height: 250px;
  border: 2px solid #FF6B35;
  border-radius: 12px;
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
  position: relative;
}

.scanning-frame::before,
.scanning-frame::after {
  content: '';
  position: absolute;
  width: 30px;
  height: 30px;
  border: 3px solid #FF6B35;
}

.scanning-frame::before {
  top: -3px;
  left: -3px;
  border-right: none;
  border-bottom: none;
}

.scanning-frame::after {
  bottom: -3px;
  right: -3px;
  border-left: none;
  border-top: none;
}

.scanning-text {
  margin-top: 2rem;
  color: white;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.camera-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

.close-btn {
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
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.capture-btn {
  background: transparent;
  border: 4px solid white;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.capture-circle {
  width: 56px;
  height: 56px;
  background: white;
  border-radius: 50%;
}

.capture-btn:active {
  transform: scale(0.9);
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 107, 53, 0.9);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  text-align: center;
  max-width: 80%;
  z-index: 1001;
}
</style>

