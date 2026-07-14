<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RegistrationModal from '@/components/RegistrationModal.vue'

const router = useRouter()
const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

onMounted(() => {
  sessionStorage.setItem('alu_page_entry', String(Date.now()))
  
  // Clean up any other bg
  document.body.style.backgroundColor = '#F9FAFB'
})
</script>

<template>
  <main class="funnel">
    <div class="funnel__container">
      
      <!-- HEADER -->
      <header class="funnel__header">
        <div class="funnel__logo-wrap">
          <span class="funnel__logo-text">E<span class="funnel__logo-accent">AT</span></span>
        </div>
      </header>

      <!-- HERO -->
      <section class="funnel__hero">
        <h1 class="funnel__headline">
          Alimentar a gran escala debería motivar a tu equipo, <span class="funnel__headline-accent">no ser un gasto que tolerar</span>
        </h1>
        
        <p class="funnel__hero-sub">
          Descubre cómo el método Corporate Food Flow transforma el almuerzo en tu empresa con sabor a hogar, reduciendo el desperdicio y eliminando las quejas del personal.
        </p>

        <div class="funnel__content-grid">
          <!-- Text/Bullets first -->
          <div class="funnel__bullets-column">
            <div class="funnel__bullets-box">
              <p class="funnel__bullets-title">Nuestro Método en 3 Pasos:</p>
              <ul class="funnel__bullets">
                <li><i class="fa-solid fa-circle-check"></i> <strong>Mapeo Biológico:</strong> Identificamos restricciones médicas y dietas de tu personal.</li>
                <li><i class="fa-solid fa-circle-check"></i> <strong>Menú Adaptativo:</strong> Comida tipo buffet, completa y balanceada, con sabor a hogar.</li>
                <li><i class="fa-solid fa-circle-check"></i> <strong>Control Térmico y Cero Desperdicio:</strong> Optimizamos la cadena logística, reduciendo hasta un 35% el desperdicio.</li>
                <li><i class="fa-solid fa-circle-check"></i> <strong>Beneficio Real:</strong> Transforma la comida en un beneficio que tu gente sí valora.</li>
              </ul>
            </div>
          </div>
          
          <!-- VSL Column second -->
          <div class="funnel__vsl-column">
            <div class="funnel__vsl-wrap" @click="openModal">
              <div class="funnel__vsl-overlay">
                <button class="funnel__play-btn" aria-label="Reproducir video">
                  <i class="fa-solid fa-play"></i>
                </button>
                <span class="funnel__vsl-msg">Haz clic para ver el video gratis</span>
              </div>
              <img src="https://fast.wistia.com/embed/medias/c0iw8b7y8t/swatch" class="funnel__vsl-thumb" alt="Video de la metodología" />
            </div>

            <button class="funnel__cta" @click="openModal">
              <i class="fa-solid fa-video"></i>
              VER VIDEO GRATIS
            </button>
            <p class="funnel__guarantee">
              <i class="fa-solid fa-lock"></i> 100% gratuito · Sin compromiso · Cupos limitados
            </p>
          </div>
        </div>

      </section>

      <!-- STATS SECTION -->
      <section class="funnel__stats">
        <p class="funnel__stats-eyebrow">UN RESPALDO QUE SE DEMUESTRA CON RESULTADOS</p>
        <div class="funnel__stats-grid">
          <div class="funnel__stats-card">
            <div class="funnel__stats-icon"><i class="fa-solid fa-house-circle-check"></i></div>
            <h3 class="funnel__stats-number">-35%</h3>
            <p class="funnel__stats-text">de reducción en desperdicio de comida corporativa</p>
          </div>
          <div class="funnel__stats-card">
            <div class="funnel__stats-icon"><i class="fa-solid fa-users-viewfinder"></i></div>
            <h3 class="funnel__stats-number">98%</h3>
            <p class="funnel__stats-text">de satisfacción interna en los colaboradores</p>
          </div>
          <div class="funnel__stats-card">
            <div class="funnel__stats-icon"><i class="fa-solid fa-star"></i></div>
            <h3 class="funnel__stats-number">0</h3>
            <p class="funnel__stats-text">ausentismo vespertino por malestar estomacal</p>
          </div>
        </div>
      </section>

      <!-- AUTHORITY SECTION -->
      <section class="funnel__authority" aria-labelledby="authority-heading">
        <div class="funnel__authority-inner">
          <div class="funnel__authority-photo-wrap">
            <div class="funnel__authority-avatar" aria-hidden="true">
              <i class="fa-solid fa-user-tie"></i>
            </div>
          </div>
          <div class="funnel__authority-content">
            <p class="funnel__authority-eyebrow">Fundadora de EAT</p>
            <h2 id="authority-heading" class="funnel__authority-name">Sol Triviño</h2>
            <p class="funnel__authority-role">CEO</p>
            <p class="funnel__authority-bio">
              En EAT sabemos que la alimentación del personal es mucho más que un trámite logístico. Entregar viandas monótonas a tu equipo es una fuga de dinero. <strong>Nuestro objetivo es convertir el almuerzo en ingeniería de bienestar, dando a tu gente nutrición real y sabor de hogar.</strong>
            </p>
          </div>
        </div>
      </section>

      <!-- FINAL CTA -->
      <section class="funnel__final-cta">
        <div class="funnel__logo-wrap funnel__logo-wrap--large">
          <span class="funnel__logo-text">E<span class="funnel__logo-accent">AT</span></span>
        </div>
        <h2 class="funnel__final-title">
          ¿Listo para eliminar las quejas y<br>
          <span class="funnel__final-accent">motivar a tu equipo?</span>
        </h2>
        <p class="funnel__final-sub">
          Accede al video gratuito donde te explicamos por qué nuestro método Corporate Food Flow es la opción más segura para proteger tu inversión en bienestar.<br><br>
        </p>
        <button class="funnel__cta funnel__cta--pulse" @click="openModal">
          <i class="fa-solid fa-video"></i>
          ¡QUIERO VER EL VIDEO!
        </button>
        <p class="funnel__guarantee">
          <i class="fa-solid fa-lock"></i> 100% gratuito · Sin compromiso
        </p>
      </section>

    </div>

    <!-- Registration Modal -->
    <RegistrationModal 
      :open="isModalOpen" 
      @close="closeModal" 
    />

    <footer class="funnel__footer">
      <nav class="funnel__footer-links" aria-label="Legal">
        <RouterLink to="/politicas-privacidad">Política de Privacidad</RouterLink>
        <RouterLink to="/aviso-legal">Aviso Legal</RouterLink>
      </nav>
      <p class="funnel__footer-copy">© {{ new Date().getFullYear() }} EAT. Todos los derechos reservados.</p>
      <p class="funnel__footer-dev">Hecho por <a href="https://github.com/MrKanx" target="_blank" rel="noopener noreferrer">Kankox</a></p>
    </footer>

  </main>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;
@use '@/styles/fonts.modules.scss' as fonts;

.funnel {
  min-height: 100vh;
  background-color: colors.$QS-LIGHT;
  color: colors.$QS-DARK;
  font-family: fonts.$font-secondary;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.funnel__container {
  width: 100%;
  max-width: 1000px;
  padding: 0 20px;
  flex: 1;
}

.funnel__header {
  display: flex;
  justify-content: center;
  padding: 2rem 0 1rem;
}

.funnel__logo-text {
  font-family: fonts.$font-principal;
  font-size: 1.8rem;
  font-weight: 900;
  color: colors.$QS-DARK;
  letter-spacing: -0.5px;
}

.funnel__logo-accent {
  color: colors.$S2M-GOLD;
}

.funnel__hero {
  text-align: center;
  margin-top: 1rem;
}

.funnel__headline {
  font-family: fonts.$font-principal;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: colors.$QS-DARK;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.funnel__headline-accent {
  color: colors.$S2M-GOLD;
}

.funnel__hero-sub {
  font-size: 1.1rem;
  color: #4B5563; /* Tailwind gray-600 */
  max-width: 700px;
  margin: 0 auto 2.5rem;
  line-height: 1.5;
}

.funnel__content-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  align-items: start;
  text-align: left;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
}

.funnel__vsl-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.funnel__vsl-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: colors.$QS-SURFACE;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 50px rgba(colors.$S2M-GOLD, 0.15);

    .funnel__play-btn {
      transform: scale(1.1);
      background: colors.$S2M-GOLD;
      color: #000;
    }
  }
}

.funnel__vsl-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}

.funnel__vsl-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.funnel__play-btn {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(4px);
  border: 2px solid colors.$S2M-GOLD;
  color: colors.$S2M-GOLD;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 1rem;
}

.funnel__vsl-msg {
  font-family: fonts.$font-interface;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: rgba(0,0,0,0.6);
  padding: 4px 12px;
  border-radius: 20px;
}

.funnel__cta {
  margin-top: 2rem;
  width: 100%;
  background: colors.$S2M-GOLD;
  color: colors.$QS-SURFACE;
  font-family: fonts.$font-accent;
  font-size: 1.1rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 18px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 10px 20px rgba(colors.$S2M-GOLD, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(colors.$S2M-GOLD, 0.4);
    background: #FFD25B;
  }
}

.funnel__cta--pulse {
  background: linear-gradient(90deg, #D49A1E 0%, #FFD25B 100%);
  margin-top: 2.5rem;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 25px rgba(colors.$S2M-GOLD, 0.4);
  animation: pulse 2s infinite;

  &:hover {
    animation: none;
    box-shadow: 0 0 35px rgba(colors.$S2M-GOLD, 0.6);
  }
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 15px rgba(colors.$S2M-GOLD, 0.3); }
  50% { transform: scale(1.02); box-shadow: 0 0 35px rgba(colors.$S2M-GOLD, 0.5); }
  100% { transform: scale(1); box-shadow: 0 0 15px rgba(colors.$S2M-GOLD, 0.3); }
}

.funnel__guarantee {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #6B7280;
  font-family: fonts.$font-interface;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  
  i {
    color: colors.$S2M-GOLD;
  }
}

.funnel__bullets-box {
  background: colors.$QS-SURFACE;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 12px;
  padding: 2rem;
  height: 100%;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.funnel__bullets-title {
  font-family: fonts.$font-interface;
  font-size: 0.9rem;
  font-weight: 600;
  color: #6B7280;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 1.5rem;
}

.funnel__bullets {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  li {
    font-size: 1.05rem;
    line-height: 1.4;
    color: colors.$QS-DARK;
    display: flex;
    align-items: flex-start;
    gap: 12px;

    i {
      color: colors.$S2M-GOLD;
      font-size: 1.2rem;
      margin-top: 3px;
      flex-shrink: 0;
    }
  }
}

.funnel__stats {
  margin-top: 6rem;
  padding: 3rem 0;
  border-top: 1px solid rgba(0,0,0,0.05);
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.funnel__stats-eyebrow {
  text-align: center;
  font-family: fonts.$font-interface;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: colors.$S2M-GOLD;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.funnel__stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.funnel__stats-card {
  background: colors.$QS-SURFACE;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: transform 0.3s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(colors.$S2M-GOLD, 0.3);
  }
}

.funnel__stats-icon {
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;
  background: rgba(colors.$S2M-GOLD, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 1.5rem;
    color: colors.$S2M-GOLD;
  }
}

.funnel__stats-number {
  font-family: fonts.$font-principal;
  font-size: 2.5rem;
  font-weight: 900;
  color: colors.$QS-DARK;
  margin: 0 0 0.5rem;
}

.funnel__stats-text {
  font-size: 0.95rem;
  color: #4B5563;
  margin: 0;
  line-height: 1.5;
}

/* AUTHORITY */
.funnel__authority {
  margin-top: 5rem;
  padding: 2.5rem;
  background: colors.$QS-SURFACE;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.03);
}

.funnel__authority-inner {
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 650px) {
    flex-direction: column;
    text-align: center;
  }
}

.funnel__authority-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid rgba(0,0,0,0.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background: colors.$QS-LIGHT;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    color: colors.$S2M-GOLD;
    font-size: 2.5rem;
  }
}

.funnel__authority-eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: colors.$S2M-GOLD;
  letter-spacing: 0.05em;
  margin: 0 0 0.4rem;
}

.funnel__authority-name {
  @include fonts.heading-font(800);
  font-size: 1.8rem;
  color: colors.$QS-DARK;
  margin: 0 0 0.25rem;
}

.funnel__authority-role {
  font-size: 0.9rem;
  color: #6B7280;
  margin: 0 0 1rem;
}

.funnel__authority-bio {
  font-size: 0.95rem;
  color: #4B5563;
  line-height: 1.6;
  margin: 0;

  strong {
    color: colors.$QS-DARK;
  }
}

/* FINAL CTA */
.funnel__final-cta {
  margin-top: 6rem;
  margin-bottom: 4rem;
  text-align: center;
  padding: 4rem 2rem;
  background: radial-gradient(circle at center, rgba(colors.$S2M-GOLD, 0.05) 0%, transparent 60%);
}

.funnel__logo-wrap--large {
  margin-bottom: 1.5rem;

  .funnel__logo-text {
    font-size: 3.5rem;
    letter-spacing: -1.5px;
  }
}

.funnel__final-title {
  font-family: fonts.$font-principal;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  color: colors.$QS-DARK;
  margin: 0 0 1.5rem;
  line-height: 1.1;
}

.funnel__final-accent {
  color: colors.$S2M-GOLD;
}

.funnel__final-sub {
  font-size: 1.1rem;
  color: #4B5563;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* FOOTER */
.funnel__footer {
  width: 100%;
  padding: 2rem;
  border-top: 1px solid rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  background: colors.$QS-SURFACE;
}

.funnel__footer-links {
  display: flex;
  gap: 1.5rem;

  a {
    font-size: 0.8rem;
    color: #6B7280;
    text-decoration: none;

    &:hover {
      color: colors.$S2M-GOLD;
    }
  }
}

.funnel__footer-copy {
  font-size: 0.75rem;
  color: #9CA3AF;
  margin: 0;
}

.funnel__footer-dev {
  font-size: 0.75rem;
  color: #9CA3AF;
  margin: 0;
  
  a {
    color: #6B7280;
    text-decoration: none;
    font-weight: bold;
    
    &:hover {
      color: colors.$S2M-GOLD;
    }
  }
}
</style>
