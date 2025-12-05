<script setup>
import { ref, watch, onMounted, onUnmounted, provide } from 'vue'
import Scan from './Scan.vue'
import Feed from './Feed.vue'
import Locker from './Locker.vue'
import Profil from './Profil.vue'
import ProductDetails from './ProductDetails.vue'

// Aktiv navigation item
const activeNav = ref('scan')

// Product details view
const showProductDetails = ref(false)
const selectedProduct = ref(null)

const openProductDetails = (product = null) => {
  selectedProduct.value = product
  showProductDetails.value = true
  window.scrollTo({ top: 0, behavior: 'instant' })
}

const closeProductDetails = () => {
  showProductDetails.value = false
  selectedProduct.value = null
}

// Provide functions to child components
provide('openProductDetails', openProductDetails)

// Prevent scrolling on scan page and scroll to top on navigation
watch(activeNav, (newVal) => {
  // Scroll to top when navigating
  window.scrollTo({ top: 0, behavior: 'instant' })
  
  if (newVal === 'scan') {
    document.body.classList.add('no-scroll')
  } else {
    document.body.classList.remove('no-scroll')
  }
})

// Scroll to top when opening/closing product details
watch(showProductDetails, (newVal) => {
  if (newVal) {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
})

onMounted(() => {
  if (activeNav.value === 'scan') {
    document.body.classList.add('no-scroll')
  }
})

onUnmounted(() => {
  document.body.classList.remove('no-scroll')
})
</script>

<template>
  <main class="mobile-wrapper" :class="{ 'no-scroll': activeNav === 'scan' || showProductDetails }">
    
    <!-- PRODUCT DETAILS VIEW -->
    <ProductDetails 
      v-if="showProductDetails" 
      :productData="selectedProduct"
      @close="closeProductDetails" 
    />

    <!-- MAIN APP CONTENT -->
    <template v-else>
      <!-- NAVIGATION -->
      <nav class="top-nav">
        <div class="logo">
          <img src="/logo.svg" alt="Logo" />
        </div>
        <div class="profile-picture" @click="activeNav = 'profile'; window.scrollTo({ top: 0, behavior: 'instant' })">
          <img src="/profile-fan.png" alt="Profil" />
        </div>
      </nav>

      <!-- SCAN COMPONENT -->
      <Scan v-if="activeNav === 'scan'" />

      <!-- FEED COMPONENT -->
      <Feed v-if="activeNav === 'feed'" />

      <!-- LOCKER COMPONENT -->
      <Locker v-if="activeNav === 'locker'" />

      <!-- PROFIL COMPONENT -->
      <Profil v-if="activeNav === 'profile'" />
    </template>

    <!-- SPACER for at bottom nav ikke dækker -->
    <div v-if="!showProductDetails" class="spacer"></div>

    <!-- BOTTOM NAVIGATION BAR -->
    <nav v-if="!showProductDetails" class="bottom-nav">
      <button 
        class="nav-item" 
        :class="{ active: activeNav === 'feed' }"
        @click="activeNav = 'feed'; window.scrollTo({ top: 0, behavior: 'instant' })"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        <span>Feed</span>
      </button>

      <button 
        class="nav-item" 
        :class="{ active: activeNav === 'scan' }"
        @click="activeNav = 'scan'; window.scrollTo({ top: 0, behavior: 'instant' })"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        :class="{ active: activeNav === 'locker' }"
        @click="activeNav = 'locker'; window.scrollTo({ top: 0, behavior: 'instant' })"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.6 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.17a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
        </svg>
        <span>Locker</span>
      </button>

      <button 
        class="nav-item" 
        :class="{ active: activeNav === 'profile' }"
        @click="activeNav = 'profile'; window.scrollTo({ top: 0, behavior: 'instant' })"
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

<style>
/* Global CSS Variable for bottom-nav height - calculated as: top padding + nav-item height + bottom padding + safe area */
:root {
  --bottom-nav-height: calc(6px + 51px + 6px + env(safe-area-inset-bottom)); /* 6px top + nav-item (~51px: 7px+22px+3px+13px+7px) + 6px bottom + safe area */
}

@media (max-width: 460px) {
  :root {
    --bottom-nav-height: calc(6px + 50px + 6px + env(safe-area-inset-bottom)); /* 6px top + nav-item (~50px) + 6px bottom + safe area */
  }
}

/* iPhone 15 specific (393px) */
@media (max-width: 393px) {
  :root {
    --bottom-nav-height: calc(4px + 36px + 2px + env(safe-area-inset-bottom)); /* 4px top + nav-item (~36px) + 2px bottom + safe area */
  }
}

@media (max-width: 375px) {
  :root {
    --bottom-nav-height: calc(8px + 56px + 8px + env(safe-area-inset-bottom)); /* 8px top + nav-item (~56px) + 8px bottom + safe area */
  }
}

@media (max-width: 320px) {
  :root {
    --bottom-nav-height: calc(8px + 54px + 8px + env(safe-area-inset-bottom)); /* 8px top + nav-item (~54px) + 8px bottom + safe area */
  }
}
</style>

<style scoped>
/* --- VARIABLER --- */
.mobile-wrapper {
  --bg-color: #F6F6F6;
  --card-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(0, 0, 0, 0.1);
  --neon: #E42223; /* Den vigtige sports-tech farve */
  --text-main: #1a1a1a;
  --text-muted: #666666;
  --grid-margin: 20px; /* Margin left/right for grid */
  
  font-family: 'Stack Sans Text', -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  min-height: 100vh;
  min-height: -webkit-fill-available; /* iOS Safari fix */
  width: 100%;
  max-width: 460px; /* Responsiv op til 460px */
  margin: 0 auto;
  position: relative;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  /* Support for safe areas */
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

.mobile-wrapper.no-scroll {
  overflow-y: hidden;
  max-height: 100vh;
  height: 100vh;
  
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
  padding-top: calc(28px + env(safe-area-inset-top)); 
  display: grid;
  grid-template-columns: var(--grid-margin) 1fr 1fr 1fr 1fr var(--grid-margin);
  align-items: center;
  z-index: 50;
}

.logo {
  grid-column: 2;
  display: flex;
  align-items: center;
}

.logo img {
  height: 56px;
  width: auto;
  display: block;
}

.profile-picture {
  grid-column: 5;
  justify-self: end;
  width: 52px;
  height: 52px;
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
  object-position: center;
  transform: scale(1.2);
  display: block;
}

/* --- BOTTOM NAVIGATION --- */
.spacer { 
  grid-column: 1 / -1;
  height: 70px; 
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 460px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--glass-border);
  display: grid;
  grid-template-columns: var(--grid-margin) 1fr 1fr 1fr 1fr var(--grid-margin);
  align-items: center;
  justify-items: center;
  padding: 6px 0;
  padding-bottom: calc(6px + env(safe-area-inset-bottom));
  padding-left: calc(0px + env(safe-area-inset-left));
  padding-right: calc(0px + env(safe-area-inset-right));
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
  gap: 3px;
  padding: 7px 0;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.nav-item:nth-child(1) { grid-column: 2; justify-self: center; }
.nav-item:nth-child(2) { grid-column: 3; justify-self: center; }
.nav-item:nth-child(3) { grid-column: 4; justify-self: center; }
.nav-item:nth-child(4) { grid-column: 5; justify-self: center; }

.nav-item svg {
  transition: all 0.2s ease;
  display: block;
  margin: 0 auto;
  flex-shrink: 0;

}

.nav-item span {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
  text-align: center;
  width: 100%;
}

.nav-item.active {
  color: var(--neon);
}

.nav-item.active span {
  color: var(--neon);
}

.nav-item:hover {
  color: var(--text-main);
}

/* Responsive breakpoints */
@media (max-width: 460px) {
  .mobile-wrapper {
    --grid-margin: 1rem;
  }
  
  .top-nav {
    padding-top: 24px;
  }
  
  .logo img {
    height: 52px;
  }
  
  .profile-picture {
    width: 48px;
    height: 48px;
  }
  
  .bottom-nav {
    padding: 6px 0;
    padding-bottom: calc(6px + env(safe-area-inset-bottom));
  }
  
  .nav-item {
    padding: 8px 0;
    gap: 4px;
  }
  
  .nav-item svg {
    width: 22px;
    height: 22px;
  }
  
  .nav-item span {
    font-size: 10px;
  }
  
  .spacer {
    height: 68px;
  }
}

/* iPhone 15 specific (393px) */
@media (max-width: 393px) {
  .bottom-nav {
    padding-top: 18px;
    padding-bottom: calc(-10px + env(safe-area-inset-bottom));
    align-items: center;
  }
  
  .nav-item {
    padding: 4px 0 0px 0px;
    gap: 1px;
  }
  
  .nav-item svg {
    width: 20px;
    height: 20px;

  }
  
  .nav-item span {
    font-size: 9px;
  }
  
  .spacer {
    height: 46px;
  }
}

@media (max-width: 375px) {
  .mobile-wrapper {
    --grid-margin: 0.75rem;
  }
  
  .top-nav {
    padding-top: 20px;
  }
  
  .logo img {
    height: 48px;
  }
  
  .profile-picture {
    width: 44px;
    height: 44px;
  }
  
  .bottom-nav {
    padding: 8px 0;
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
  }
  
  .nav-item {
    padding: 10px 0;
    gap: 5px;
  }
  
  .nav-item svg {
    width: 24px;
    height: 24px;
  }
  
  .nav-item span {
    font-size: 11px;
  }
  
  .spacer {
    height: 78px;
  }
}

@media (max-width: 320px) {
  .mobile-wrapper {
    --grid-margin: 0.5rem;
  }
  
  .top-nav {
    padding-top: 18px;
  }
  
  .logo img {
    height: 44px;
  }
  
  .profile-picture {
    width: 40px;
    height: 40px;
    border-width: 1.5px;
  }
  
  .bottom-nav {
    padding: 8px 0;
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
  }
  
  .nav-item {
    padding: 10px 0;
    gap: 5px;
  }
  
  .nav-item svg {
    width: 22px;
    height: 22px;
  }
  
  .nav-item span {
    font-size: 10px;
  }
  
  .spacer {
    height: 76px;
  }
}
</style>