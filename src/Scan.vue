<template>
  <!-- HERO SECTION -->
  <header class="hero">
    <!-- Baggrundsbillede med overlay -->
    <div class="hero-bg"></div>
    
    <div class="text-block">
      <h1>OWN THE<br>GAME.</h1>
      <p>Gør din trøjesamling digital. <br> 100% Autentisk. 100% Din.</p>
    </div>

    <!-- Glass Action Card -->
    <div class="glass-card floating" @click="openCamera">
      <div class="gc-text">
        <span class="label">Har du en trøje?</span>
        <span class="action">Scan og Validér</span>
      </div>
      <div class="gc-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
          <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
          <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
          <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
          <rect x="7" y="7" width="10" height="10" rx="1"></rect>
        </svg>
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
    
    // Calculate responsive QR box size (60% of viewport width, max 300px)
    const viewportWidth = window.innerWidth
    const qrBoxSize = Math.min(Math.floor(viewportWidth * 0.6), 300)
    
    // Initialize QR code scanner
    html5QrCode = new Html5Qrcode(qrScannerContainer.value.id)
    
    // Start scanning with improved settings
    await html5QrCode.start(
      {
        facingMode: 'environment' // Use back camera on mobile
      },
      {
        fps: 30, // Increased FPS for better scanning
        qrbox: { width: qrBoxSize, height: qrBoxSize }, // Responsive scanning area
        aspectRatio: 1.0,
        disableFlip: false // Allow rotation
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
  --bg-color: #F6F6F6;
  --card-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(0, 0, 0, 0.1);
  --neon: #E42223;
  --text-main: #1a1a1a;
  --text-muted: #666666;
  --grid-margin: 20px;
}

/* --- HERO --- */
.hero {
  grid-column: 1 / -1;
  height: 100vh;
  max-height: 100vh;
  position: relative;
  display: grid;
  grid-template-columns: var(--grid-margin) 1fr 1fr 1fr 1fr var(--grid-margin);
  grid-template-rows: auto;
  align-content: start;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0; left: 0; width: 105%; height: 100%;
  background-image: url('/pics/image 19.JPG'); 
  background-size: cover;
  background-position: 70% bottom;
  background-repeat: no-repeat;
  z-index: 0;
}

.hero-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.text-block {
  grid-column: 2 / -2;
  grid-row: 1;
  position: relative;
  z-index: 10;
  padding-top: 2rem;
  align-self: start;
}

.text-block h1 {
  font-size: 4rem;
  line-height: 0.9;
  font-weight: 500;
  margin-bottom: 12px;
  text-transform: uppercase;
  color: white;
}
.text-block p {
  color: rgb(216, 216, 216);
  font-size: 1rem;
  margin-bottom: 0;
  max-width: 80%;
}

/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 50px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: fixed;
  bottom: calc(var(--bottom-nav-height) + 1rem);
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2 * var(--grid-margin));
  max-width: calc(460px - 2 * var(--grid-margin));
  z-index: 50;
}

.glass-card:hover {
  transform: translate(-50%, -2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.glass-card:active {
  transform: translateY(0);
}

.gc-icon {
  width: 44px; height: 44px;
  background: var(--text-main);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: rgb(255, 255, 255);
  transform: translateX(6px);
}

.gc-text { 
  display: flex; 
  flex-direction: column; 
  flex: 1; 
  margin-left: 0.5rem;
}
.gc-text .label { font-size: 11px; color: var(--text-muted); text-transform: uppercase; }
.gc-text .action { font-size: 15px; font-weight: 600; color: var(--text-main); }

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
  width: min(60vw, 300px);
  height: min(60vw, 300px);
  border: 2px solid #E42223;
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
  border: 3px solid #E42223;
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
  background: rgba(228, 34, 35, 0.9);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  text-align: center;
  max-width: 80%;
  z-index: 1001;
}

/* Responsive breakpoints */
@media (max-width: 460px) {
  .hero {
    grid-template-columns: 1rem 1fr 1fr 1fr 1fr 1rem;
    --grid-margin: 1rem;
  }
  
  .hero-bg {
    width: 100%;
    background-position: 65% center;
    background-size: cover;
  }
  
  .text-block {
    margin-top: 6rem;
  }
  
  .text-block h1 {
    font-size: 3.5rem;
  }
  
  .text-block p {
    font-size: 0.9375rem;
    max-width: 85%;
  }
  
  .glass-card {
    padding: 12px 18px;
    border-radius: 40px;
    bottom: calc(var(--bottom-nav-height) + 1rem);
    width: calc(100% - 2rem);
    max-width: calc(460px - 2rem);
  }
  
  .gc-icon {
    width: 40px;
    height: 40px;
    font-size: 18px;
  }
  
  .gc-text .label {
    font-size: 10px;
  }
  
  .gc-text .action {
    font-size: 14px;
  }
  
  .scanning-frame {
    width: min(60vw, 280px);
    height: min(60vw, 280px);
  }
  
  .scanning-text {
    font-size: 13px;
    padding: 0.4rem 0.875rem;
  }
  
  .close-btn {
    width: 44px;
    height: 44px;
    font-size: 22px;
  }
  
  .camera-controls {
    padding: 1.5rem;
  }
  
  .error-message {
    padding: 0.875rem 1.25rem;
    font-size: 0.875rem;
    max-width: 85%;
  }
}

@media (max-width: 375px) {
  .hero {
    grid-template-columns: 0.75rem 1fr 1fr 1fr 1fr 0.75rem;
  }
  
  .hero-bg {
    width: 100%;
    background-position: 60% center;
    background-size: cover;
  }
  
  .text-block {
    margin-top: 5.5rem;
  }
  
  .text-block h1 {
    font-size: 3.25rem;
  }
  
  .text-block p {
    font-size: 0.875rem;
    max-width: 90%;
  }
  
  .glass-card {
    padding: 10px 16px;
    border-radius: 35px;
    bottom: calc(var(--bottom-nav-height) + 1rem);
    width: calc(100% - 1.5rem);
    max-width: calc(460px - 1.5rem);
  }
  
  .gc-icon {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
  
  .gc-text .label {
    font-size: 9px;
  }
  
  .gc-text .action {
    font-size: 13px;
  }
  
  .gc-arrow {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
  
  .scanning-frame {
    width: min(60vw, 260px);
    height: min(60vw, 260px);
  }
  
  .scanning-text {
    font-size: 12px;
    padding: 0.375rem 0.75rem;
    margin-top: 1.5rem;
  }
  
  .close-btn {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  
  .camera-controls {
    padding: 1.25rem;
  }
  
  .error-message {
    padding: 0.75rem 1rem;
    font-size: 0.8125rem;
    max-width: 90%;
  }
}

@media (max-width: 320px) {
  .hero {
    grid-template-columns: 0.5rem 1fr 1fr 1fr 1fr 0.5rem;
  }
  
  .hero-bg {
    width: 100%;
    background-position: 55% center;
    background-size: cover;
  }
  
  .text-block {
    margin-top: 5rem;
  }
  
  .text-block h1 {
    font-size: 3rem;
  }
  
  .text-block p {
    font-size: 0.8125rem;
    max-width: 95%;
  }
  
  .glass-card {
    padding: 8px 14px;
    border-radius: 30px;
    bottom: calc(var(--bottom-nav-height) + 1rem);
    width: calc(100% - 1rem);
    max-width: calc(460px - 1rem);
  }
  
  .gc-icon {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  .gc-text .label {
    font-size: 8px;
  }
  
  .gc-text .action {
    font-size: 12px;
  }
  
  .scanning-frame {
    width: min(60vw, 240px);
    height: min(60vw, 240px);
  }
  
  .scanning-text {
    font-size: 11px;
    padding: 0.3rem 0.625rem;
    margin-top: 1.25rem;
  }
  
  .close-btn {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
  
  .camera-controls {
    padding: 1rem;
  }
  
  .error-message {
    padding: 0.625rem 0.875rem;
    font-size: 0.75rem;
    max-width: 95%;
  }
}
</style>

