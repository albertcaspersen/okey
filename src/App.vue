<script setup>
import { ref } from 'vue'
import Scan from './Scan.vue'
import Locker from './Locker.vue'

// Aktiv navigation item
const activeNav = ref('scan')
</script>

<template>
  <main class="mobile-wrapper">
    
    <!-- NAVIGATION -->
    <nav class="top-nav">
      <div class="logo">O—KEY<span class="reg">®</span></div>
      <div class="profile-picture">
        <img src="/profile-fan.jpg" alt="Profil" />
      </div>
    </nav>

    <!-- SCAN COMPONENT -->
    <Scan v-if="activeNav === 'scan'" />

    <!-- LOCKER COMPONENT -->
    <Locker v-if="activeNav === 'locker'" />

    <!-- SPACER for at bottom nav ikke dækker -->
    <div class="spacer"></div>

    <!-- BOTTOM NAVIGATION BAR -->
    <nav class="bottom-nav">
      <button 
        class="nav-item" 
        :class="{ active: activeNav === 'locker' }"
        @click="activeNav = 'locker'"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>Locker</span>
      </button>

      <button 
        class="nav-item scan-btn" 
        :class="{ active: activeNav === 'scan' }"
        @click="activeNav = 'scan'"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 7V5a2 2 0 0 1 2-2h2"></path>
          <path d="M17 3h2a2 2 0 0 1 2 2v2"></path>
          <path d="M21 17v2a2 2 0 0 1-2 2h-2"></path>
          <path d="M7 21H5a2 2 0 0 1-2-2v-2"></path>
          <rect x="7" y="7" width="10" height="10" rx="1"></rect>
        </svg>
        <span>Scan</span>
      </button>

      <button 
        class="nav-item" 
        :class="{ active: activeNav === 'rewards' }"
        @click="activeNav = 'rewards'"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
          <path d="M4 22h16"></path>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
        </svg>
        <span>Rewards</span>
      </button>

      <button 
        class="nav-item" 
        :class="{ active: activeNav === 'profile' }"
        @click="activeNav = 'profile'"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>Profil</span>
      </button>
    </nav>

  </main>
</template>

<style scoped>
/* --- VARIABLER --- */
.mobile-wrapper {
  --bg-color: #F5F5F5;
  --card-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(0, 0, 0, 0.1);
  --neon: #FF6B35; /* Den vigtige sports-tech farve */
  --text-main: #1a1a1a;
  --text-muted: #666666;
  --grid-margin: 20px; /* Margin left/right for grid */
  
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  min-height: 100vh;
  width: 100%;
  max-width: 430px; /* iPhone Pro Max bredde */
  margin: 0 auto;
  position: relative;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  
  /* Main grid container - 4 kolonner */
  display: grid;
  grid-template-columns: var(--grid-margin) 1fr 1fr 1fr 1fr var(--grid-margin);
}

/* --- NAV --- */
.top-nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 28px; 
  display: grid;
  grid-template-columns: var(--grid-margin) 1fr 1fr 1fr 1fr var(--grid-margin);
  align-items: center;
  z-index: 50;
}

.logo {
  grid-column: 2;
  
  font-weight: 900;
  font-size: 20px;
  letter-spacing: -0.5px;
}
.logo .reg { font-size: 10px; vertical-align: top; }

.profile-picture {
  grid-column: 5;
  justify-self: end;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--neon);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.profile-picture:hover {
  transform: scale(1.05);
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* --- BOTTOM NAVIGATION --- */
.spacer { 
  grid-column: 1 / -1;
  height: 90px; 
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--glass-border);
  display: grid;
  grid-template-columns: var(--grid-margin) 1fr 1fr 1fr 1fr var(--grid-margin);
  align-items: center;
  padding: 12px 0;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  z-index: 100;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
}

.nav-item {
  background: none;
  border: none;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 0;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item:nth-child(1) { grid-column: 2; }
.nav-item:nth-child(2) { grid-column: 3; }
.nav-item:nth-child(3) { grid-column: 4; }
.nav-item:nth-child(4) { grid-column: 5; }

.nav-item svg {
  transition: all 0.2s ease;
}

.nav-item span {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
}

.nav-item.active {
  color: var(--neon);
}

.nav-item.active span {
  color: var(--neon);
}

.nav-item:not(.scan-btn):hover {
  color: var(--text-main);
}

/* Scan button - fremhævet */
.scan-btn {
  position: relative;
}


.scan-btn svg {
  position: relative;
  z-index: 1;
  width: 26px;
  height: 26px;
}

.scan-btn span {
  position: relative;
  z-index: 1;
}
</style>