<template>
  <!-- FC NORDSJÆLLAND FEED -->
  <section class="feed-section">
    <div class="section-header">
      <h2><span class="welcome-text">Velkommen</span><br>Sebastian R.</h2>
    </div>

    <!-- Feed Posts -->
    <div class="feed-container">
      
      <!-- Post 1 -->
      <article class="feed-post">
        <div class="post-image">
          <img src="https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&q=80" alt="Fodbold kamp" class="feed-image" />
          <div class="post-badge">POLL</div>
          <div class="post-text-overlay">
            <h3>Hvem starter inde?</h3>
            <p>Gæt startopstillingen mod FCK</p>
          </div>
        </div>
      </article>

      <!-- Post 2 -->
      <article class="feed-post">
        <div class="post-image">
          <img src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80" alt="Træning" class="feed-image" />
          <div class="post-badge">OFFER</div>
          <div class="post-text-overlay">
            <h3>20% på halsedisse</h3>
            <p>Kun for O-KEY medlemmer</p>
          </div>
        </div>
      </article>

      <!-- Post 3 -->
      <article class="feed-post">
        <div class="post-image">
          <img src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80" alt="Spiller" class="feed-image" />
          <div class="post-badge">NEWS</div>
          <div class="post-text-overlay">
            <h3>Ny spiller præsenteret!</h3>
            <p>Velkommen til holdet</p>
          </div>
        </div>
      </article>

      <!-- Post 4 -->
      <article class="feed-post">
        <div class="post-image">
          <img src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80" alt="Kampdag" class="feed-image" />
          <div class="post-badge">MATCH</div>
          <div class="post-text-overlay">
            <h3>Kampdag!</h3>
            <p>Kom og støt holdet på stadion</p>
          </div>
        </div>
      </article>

      <!-- Post 5 -->
      <article class="feed-post">
        <div class="post-image">
          <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80" alt="Målscene" class="feed-image" />
          <div class="post-badge">HIGHLIGHT</div>
          <div class="post-text-overlay">
            <h3>Målscenen!</h3>
            <p>Se højdepunktet fra kampen</p>
          </div>
        </div>
      </article>

    </div>
  </section>
</template>

<script setup>
// Feed component - can be extended with API calls to fetch real FC Nordsjælland content
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

/* --- FEED SECTION --- */
.feed-section {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: var(--grid-margin) 1fr 1fr 1fr 1fr var(--grid-margin);
  margin-top: 7rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
}

.section-header {
  grid-column: 2 / -2;
  margin-bottom: 1.5rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 500;
  color: var(--text-main);
}

.welcome-text {
  color: var(--text-muted);
  font-weight: 400;
  font-size: 1.2rem;
}

.feed-container {
  grid-column: 2 / -2;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Feed Post */
.feed-post {
  display: flex;
  flex-direction: column;
  gap: 0;
  border-radius: 1.25rem;
  overflow: hidden;
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
}

.post-image {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.feed-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 16 / 9;
  display: block;
}

.post-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--neon);
  color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
}

.post-text-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
}

.post-text-overlay h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.post-text-overlay p {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

@media (max-width: 480px) {
  .feed-section {
    margin-top: 6rem;
  }
  
  .section-header h2 {
    font-size: 1.75rem;
  }
  
  .post-text {
    padding: 1rem;
    font-size: 0.875rem;
  }
}
</style>
