<template>
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
        <div class="trophy-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 20.24 17 20.24 17 22"></path>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
          </svg>
        </div>
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
// Component logic can be added here if needed
</script>

<style scoped>
/* --- VARIABLER --- */
:root {
  --bg-color: #F5F5F5;
  --card-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(0, 0, 0, 0.1);
  --neon: #E42223;
  --text-main: #1a1a1a;
  --text-muted: #666666;
  --grid-margin: 1.25rem;
  --dark-card: rgba(30, 30, 30, 0.9);
}

/* --- REWARDS SECTION --- */
.rewards-section {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: var(--grid-margin) 1fr 1fr 1fr 1fr var(--grid-margin);
  margin-top: 7rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
}

.section-header {
  grid-column: 2 / -2;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
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

