<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.body.style.backgroundColor = '#F4F4F5' // Matches $QS-LIGHT
})
</script>

<template>
  <main class="thanks-page">
    <div class="thanks-card">
      <div class="thanks-icon">
        <i class="fa-solid fa-check"></i>
      </div>
      <h1 class="thanks-title">¡Registro completado! 🎉</h1>
      <p class="thanks-text">
        Muchas gracias por tu tiempo. Nuestro equipo técnico revisará los detalles de tu proyecto y, si se alinea con nuestros servicios actuales, te llamaremos muy pronto para coordinar el siguiente paso.
      </p>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;
@use '@/styles/fonts.modules.scss' as fonts;

.thanks-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: colors.$QS-LIGHT;
}

.thanks-card {
  background: colors.$QS-SURFACE;
  border-radius: 20px;
  padding: 3rem 2.5rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.05);
}

.thanks-icon {
  width: 80px;
  height: 80px;
  background: rgba(colors.$S2M-GOLD, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;

  i {
    font-size: 2.5rem;
    color: colors.$S2M-GOLD;
  }
}

.thanks-title {
  font-family: fonts.$font-principal;
  font-size: 2rem;
  font-weight: 800;
  color: colors.$QS-DARK;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
}

.thanks-text {
  font-family: fonts.$font-secondary;
  font-size: 1.05rem;
  color: #4B5563;
  line-height: 1.6;
  margin: 0;
}
</style>
