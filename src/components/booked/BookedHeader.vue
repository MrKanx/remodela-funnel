<script setup lang="ts">
const LOGO = 'https://res.cloudinary.com/dpuody0df/image/upload/v1775587085/bakano/logos/bakano-light.png';
</script>

<template>
  <header class="booked-header">
    <div class="booked-header__logo-wrap">
      <span class="booked-header__logo-text">E<span class="booked-header__logo-accent">AT</span></span>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;
@use '@/styles/fonts.modules.scss' as fonts;

.booked-header {
  width: 100%;
  padding: 1.25rem 2rem;
  background: colors.$QS-LIGHT;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  display: flex;
  justify-content: center;
}

.booked-header__logo-text {
  font-family: fonts.$font-principal;
  font-weight: 900;
  font-size: 1.3rem;
  letter-spacing: -0.5px;
  color: colors.$QS-DARK;
  margin: 0;
}

.booked-header__logo-accent {
  color: colors.$S2M-GOLD;
}
</style>
