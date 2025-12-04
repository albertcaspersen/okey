<template>
  <section class="profile-section">
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="profile-picture-container">
        <img src="/profile-fan.png" alt="Profil" class="profile-picture" />
      </div>
      <h1 class="profile-name">Sebastian R.</h1>
      <p class="profile-subtitle">FCN-fan siden 2018</p>
    </div>

    <!-- Stats Cards -->
    <div class="stats-container">
      <div class="stat-card">
        <div class="stat-number">2</div>
        <div class="stat-label">TRØJER</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">7</div>
        <div class="stat-label">KAMPE</div>
      </div>
      <div class="stat-card">
        <div class="stat-rank">
          <span class="rank-label">Top</span>
          <span class="rank-percent">3%</span>
        </div>
        <div class="stat-label">RANK</div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="actions-container">
      <button class="action-button">
        <span class="action-text">Indstillinger</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>
      <button class="action-button">
        <span class="action-text">Del din profil</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      </button>
      <button class="action-button logout">
        <span class="action-text">Log ud</span>
      </button>
    </div>
  </section>
</template>

<script setup>
// Component logic can be added here if needed
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
}

/* --- PROFILE SECTION --- */
.profile-section {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: var(--grid-margin) 1fr 1fr 1fr 1fr var(--grid-margin);
  margin-top: 7rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
}

/* Profile Header */
.profile-header {
  grid-column: 2 / -2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.profile-picture-container {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--neon);
  margin-bottom: 1.5rem;
  position: relative;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.6);
  display: block;
}

.profile-name {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
  text-align: center;
}

.profile-subtitle {
  font-size: 1rem;
  color: var(--text-muted);
  text-align: center;
}

/* Stats Container */
.stats-container {
  grid-column: 2 / -2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 1.25rem;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}

.stat-rank {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
}

.rank-label {
  font-size: 0.875rem;
  color: var(--text-main);
  font-weight: 500;
}

.rank-percent {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-main);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* Actions Container */
.actions-container {
  grid-column: 2 / -2;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-button {
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: 1.25rem;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-main);
}

.action-button:not(.logout) {
  justify-content: space-between;
}

.action-button.logout {
  justify-content: center;
  color: var(--neon);
}

.action-button:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-1px);
}

.action-button:active {
  transform: translateY(0);
}

.action-text {
  font-size: 1rem;
  font-weight: 500;
  color: inherit;
}

.action-button svg {
  color: var(--text-main);
  flex-shrink: 0;
}

.action-button.logout svg {
  display: none;
}

/* Responsive breakpoints */
@media (max-width: 460px) {
  .profile-section {
    grid-template-columns: 1rem 1fr 1fr 1fr 1fr 1rem;
    margin-top: 6rem;
    --grid-margin: 1rem;
  }
  
  .profile-picture-container {
    width: 100px;
    height: 100px;
    margin-bottom: 1.25rem;
  }
  
  .profile-name {
    font-size: 1.75rem;
  }
  
  .profile-subtitle {
    font-size: 0.9375rem;
  }
  
  .stats-container {
    gap: 0.625rem;
    margin-bottom: 1.5rem;
  }
  
  .stat-card {
    padding: 1.25rem 0.75rem;
    border-radius: 1rem;
  }
  
  .stat-number {
    font-size: 1.75rem;
    margin-bottom: 0.375rem;
  }
  
  .rank-percent {
    font-size: 1.5rem;
  }
  
  .stat-label {
    font-size: 0.6875rem;
  }
  
  .actions-container {
    gap: 0.625rem;
  }
  
  .action-button {
    padding: 0.875rem 1.25rem;
    border-radius: 1rem;
  }
  
  .action-text {
    font-size: 0.9375rem;
  }
  
  .action-button svg {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 375px) {
  .profile-section {
    grid-template-columns: 0.75rem 1fr 1fr 1fr 1fr 0.75rem;
    margin-top: 5.5rem;
  }
  
  .profile-picture-container {
    width: 90px;
    height: 90px;
    margin-bottom: 1rem;
  }
  
  .profile-name {
    font-size: 1.5rem;
  }
  
  .profile-subtitle {
    font-size: 0.875rem;
  }
  
  .stats-container {
    gap: 0.5rem;
    margin-bottom: 1.25rem;
  }
  
  .stat-card {
    padding: 1rem 0.625rem;
    border-radius: 0.875rem;
  }
  
  .stat-number {
    font-size: 1.5rem;
  }
  
  .rank-percent {
    font-size: 1.375rem;
  }
  
  .rank-label {
    font-size: 0.8125rem;
  }
  
  .stat-label {
    font-size: 0.625rem;
  }
  
  .action-button {
    padding: 0.75rem 1rem;
  }
  
  .action-text {
    font-size: 0.875rem;
  }
  
  .action-button svg {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 320px) {
  .profile-section {
    grid-template-columns: 0.5rem 1fr 1fr 1fr 1fr 0.5rem;
    margin-top: 5rem;
  }
  
  .profile-picture-container {
    width: 80px;
    height: 80px;
    margin-bottom: 0.875rem;
  }
  
  .profile-name {
    font-size: 1.375rem;
  }
  
  .profile-subtitle {
    font-size: 0.8125rem;
  }
  
  .stats-container {
    gap: 0.375rem;
    margin-bottom: 1rem;
  }
  
  .stat-card {
    padding: 0.875rem 0.5rem;
    border-radius: 0.75rem;
  }
  
  .stat-number {
    font-size: 1.375rem;
  }
  
  .rank-percent {
    font-size: 1.25rem;
  }
  
  .rank-label {
    font-size: 0.75rem;
  }
  
  .stat-label {
    font-size: 0.5625rem;
  }
  
  .actions-container {
    gap: 0.5rem;
  }
  
  .action-button {
    padding: 0.625rem 0.875rem;
    border-radius: 0.875rem;
  }
  
  .action-text {
    font-size: 0.8125rem;
  }
  
  .action-button svg {
    width: 14px;
    height: 14px;
  }
}
</style>
