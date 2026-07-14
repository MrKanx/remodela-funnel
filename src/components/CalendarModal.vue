<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { trackStage, generateEventId } from '@/utils/ghl'
import { useContactStore } from '@/stores/contact'
import { getStoredFbParams } from '@/utils/fbclid'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const router = useRouter()
const contactStore = useContactStore()
const IS_DEV = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'

const submitting = ref(false)
const touched = ref(false)

const form = ref({
  tipoEspacio: '',
  presupuesto: '',
  visitaTecnica: '',
  requerimientos: '',
  aceptaContacto: false,
})

const tipoEspacioOpts = [
  'Oficina / Corporativo',
  'Consultorio médico o dental',
  'Local comercial / Emprendimiento',
  'Restaurante / Cafetería',
  'Residencial (Cocinas, dormitorios, casas)',
]
const presupuestoOpts = [
  'Menos de $10,000',
  '$10,000 a $25,000',
  '$25,000 a $50,000',
  'Más de $50,000',
]
const visitaTecnicaOpts = [
  'Sí, entiendo y deseo agendar la visita técnica pagada.',
  'No, busco cotizaciones únicamente de manera virtual / sin costo.',
]

const wordCount = (str: string) => str.trim().split(/\s+/).filter(Boolean).length

const isValid = () =>
  !!form.value.tipoEspacio &&
  !!form.value.presupuesto &&
  !!form.value.visitaTecnica &&
  wordCount(form.value.requerimientos) >= 5 &&
  form.value.aceptaContacto

const isDisqualified = () => {
  return (
    form.value.tipoEspacio.includes('Residencial') ||
    form.value.presupuesto.includes('Menos de $10,000') ||
    form.value.visitaTecnica.includes('No, busco cotizaciones')
  )
}

const handleSubmit = async () => {
  touched.value = true
  if (!isValid()) return

  submitting.value = true
  const contact = contactStore.get()
  const disqualified = isDisqualified()
  const scheduleEventId = generateEventId('schedule')

  const notas = `
━━━━━━━━━━━━━━━━━━━━━━━━
REMODELA — Cualificación
━━━━━━━━━━━━━━━━━━━━━━━━
👤 ${contact.nombre} ${contact.apellido}
📧 ${contact.email}
📱 ${contact.telefono}
━━━━━━━━━━━━━━━━━━━━━━━━
🏠 Tipo Espacio: ${form.value.tipoEspacio}
💰 Presupuesto: ${form.value.presupuesto}
🛠 Visita Técnica: ${form.value.visitaTecnica}
📝 Requerimientos: ${form.value.requerimientos}
━━━━━━━━━━━━━━━━━━━━━━━━
${!disqualified ? '✅ CALIFICA' : '❌ NO CALIFICA'}
  `.trim()

  const pageEntry = Number(sessionStorage.getItem('alu_page_entry')) || Date.now()
  const pageDuration = Math.floor((Date.now() - pageEntry) / 1000)
  const notasConTiempo = `${notas}\n⏳ Tiempo total en página: ${Math.floor(pageDuration / 60)}m ${pageDuration % 60}s`

  const payload: Record<string, any> = {
    nombre: contact.nombre || '',
    apellido: contact.apellido || '',
    email: contact.email || '',
    telefono: contact.telefono || '',
    phone: contact.telefono || '',
    paso: '2-cualificacion',
    tipoEspacio: form.value.tipoEspacio,
    presupuesto: form.value.presupuesto,
    visitaTecnica: form.value.visitaTecnica,
    requerimientos: form.value.requerimientos,
    cualifica: !disqualified,
    notas: notasConTiempo,
    pageDuration: String(pageDuration),
    event_id: scheduleEventId,
    ...getStoredFbParams(),
  }

  trackStage('cualificacion_completada', payload)

  const webhookUrl = import.meta.env.VITE_WEBHOOK_CALIFICACION ?? 'https://services.leadconnectorhq.com/hooks/qrzFcTFG8SIL37kcHGSs/webhook-trigger/SaiUzL2ywzABxLH2J89h'
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {})

  ;(window as any).fbq?.('track', 'CompleteRegistration',
    {
      content_name: 'cualificacion-step2',
      status: !disqualified ? 'califica' : 'no-califica',
      value: 1,
      currency: 'USD',
    },
    { eventID: scheduleEventId }
  )

  submitting.value = false
  emit('close')

  if (!disqualified) {
    ;(window as any).fbq?.('track', 'Lead')
    router.push('/agendar')
  } else {
    localStorage.setItem('os_disq_at', String(Date.now()))
    router.push('/gracias')
  }
}

const onKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') emit('close') }

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

watch(() => props.open, (v) => {
  if (v) {
    touched.value = false
    form.value = { tipoEspacio: '', presupuesto: '', visitaTecnica: '', requerimientos: '', aceptaContacto: false }
  }
  document.body.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="cal-fade">
      <div v-if="open" class="cal-backdrop" @click.self="emit('close')" role="dialog" aria-modal="true" aria-labelledby="cal-title">

        <div class="cal-modal">

          <button class="cal-close" @click="emit('close')" aria-label="Cerrar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div class="cal-header">
            <h2 id="cal-title" class="cal-title">
              Antes de agendar, cuéntanos sobre tu proyecto
            </h2>
            <p class="cal-subtitle">3 breves preguntas para preparar tu diagnóstico y propuesta inicial.</p>
          </div>

          <form class="cal-form" @submit.prevent="handleSubmit" novalidate>

            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && !form.tipoEspacio }">
              <legend class="cal-legend">
                <span class="cal-q-num">01</span>
                ¿Qué tipo de espacio deseas remodelar o diseñar?
              </legend>
              <div class="cal-options">
                <label v-for="opt in tipoEspacioOpts" :key="opt" class="cal-option" :class="{ selected: form.tipoEspacio === opt }">
                  <input type="radio" :value="opt" v-model="form.tipoEspacio" hidden />
                  <span class="cal-option__radio" aria-hidden="true" />
                  <span class="cal-option__label">{{ opt }}</span>
                </label>
              </div>
              <span v-if="touched && !form.tipoEspacio" class="cal-error">Selecciona una opción</span>
            </fieldset>

            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && !form.presupuesto }">
              <legend class="cal-legend">
                <span class="cal-q-num">02</span>
                ¿Cuál es el presupuesto estimado para la ejecución del proyecto?
              </legend>
              <div class="cal-options">
                <label v-for="opt in presupuestoOpts" :key="opt" class="cal-option" :class="{ selected: form.presupuesto === opt }">
                  <input type="radio" :value="opt" v-model="form.presupuesto" hidden />
                  <span class="cal-option__radio" aria-hidden="true" />
                  <span class="cal-option__label">{{ opt }}</span>
                </label>
              </div>
              <span v-if="touched && !form.presupuesto" class="cal-error">Selecciona una opción</span>
            </fieldset>

            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && !form.visitaTecnica }">
              <legend class="cal-legend">
                <span class="cal-q-num">03</span>
                Para iniciar la cotización formal, realizamos una visita técnica obligatoria con costo. ¿Estás de acuerdo?
              </legend>
              <div class="cal-options">
                <label v-for="opt in visitaTecnicaOpts" :key="opt" class="cal-option" :class="{ selected: form.visitaTecnica === opt }">
                  <input type="radio" :value="opt" v-model="form.visitaTecnica" hidden />
                  <span class="cal-option__radio" aria-hidden="true" />
                  <span class="cal-option__label">{{ opt }}</span>
                </label>
              </div>
              <span v-if="touched && !form.visitaTecnica" class="cal-error">Selecciona una opción</span>
            </fieldset>

            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && wordCount(form.requerimientos) < 5 }">
              <legend class="cal-legend">
                <span class="cal-q-num">04</span>
                Describe brevemente los requerimientos principales:
              </legend>
              <textarea
                v-model="form.requerimientos"
                class="cal-textarea"
                placeholder="Ej: Necesito remodelar un local de 80m² para una cafetería moderna..."
                rows="3"
              ></textarea>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 0.5rem; font-size: 0.85rem;">
                <span v-if="touched && wordCount(form.requerimientos) < 5" class="cal-error" style="margin-top: 0;">Por favor, describe tu requerimiento con al menos 5 palabras.</span>
                <span v-else></span>
                <span :style="{ color: wordCount(form.requerimientos) >= 5 ? '#10B981' : '#6B7280', fontWeight: 500 }">
                  {{ wordCount(form.requerimientos) }} / 5 palabras mín.
                </span>
              </div>
            </fieldset>

            <label class="cal-consent" :class="{ 'has-error': touched && !form.aceptaContacto }">
              <input type="checkbox" v-model="form.aceptaContacto" />
              <span class="cal-consent__box" aria-hidden="true" />
              <span class="cal-consent__text">
                Acepto que el equipo técnico se contacte conmigo para coordinar los detalles.
              </span>
            </label>
            <span v-if="touched && !form.aceptaContacto" class="cal-error">Debes aceptar para continuar</span>

            <button type="submit" class="cal-submit" :disabled="submitting">
              <span v-if="!submitting">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                SOLICITAR DIAGNÓSTICO →
              </span>
              <span v-else>
                <svg class="fa-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                Procesando...
              </span>
            </button>

          </form>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.cal-fade-enter-active,
.cal-fade-leave-active { transition: opacity 0.25s ease; }
.cal-fade-enter-from,
.cal-fade-leave-to { opacity: 0; }

.cal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 900;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.cal-modal {
  background: colors.$QS-SURFACE;
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0,0,0,0.05);
}

.cal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: colors.$QS-LIGHT;
  color: #9CA3AF;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: background 0.2s, color 0.2s;
  z-index: 1;
  &:hover { background: rgba(0,0,0,0.05); color: colors.$EAT-ACCENT; }
}

.cal-header {
  padding: 2.5rem 2rem 1.25rem;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  text-align: center;
}

.cal-title {
  @include fonts.heading-font(800);
  font-size: 1.45rem;
  color: colors.$QS-DARK;
  margin: 0 0 0.5rem;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.cal-subtitle {
  font-size: 0.86rem;
  color: #6B7280;
  margin: 0;
}

.cal-form {
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cal-fieldset {
  border: none;
  padding: 0;
  margin: 0;

  &.has-error .cal-options { border-color: colors.$EAT-ACCENT; border-radius: 10px; }
}

.cal-legend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: fonts.$font-interface;
  font-size: 0.88rem;
  font-weight: 700;
  color: colors.$QS-DARK;
  margin-bottom: 0.75rem;
  background: colors.$QS-SURFACE;
  padding: 0 0.5rem;
  border-radius: 8px;
  margin-left: -0.5rem;
}

.cal-q-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: colors.$QS-DARK;
  color: colors.$QS-SURFACE;
  font-size: 0.72rem;
  font-weight: 800;
  flex-shrink: 0;
}

.cal-options {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.cal-option {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1.15rem;
  border: 1.5px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: colors.$QS-LIGHT;

  &:hover { 
    border-color: rgba(0,0,0,0.2); 
    background: colors.$QS-SURFACE; 
    transform: translateY(-1px);
  }

  &.selected {
    border-color: colors.$EAT-ACCENT;
    background: rgba(colors.$EAT-ACCENT, 0.08);
  }

  &__radio {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgba(0,0,0,0.15);
    flex-shrink: 0;
    position: relative;
    transition: all 0.2s ease;

    .cal-option.selected & {
      border-color: colors.$EAT-ACCENT;
      background: rgba(colors.$EAT-ACCENT, 0.1);
      &::after {
        content: '';
        position: absolute;
        inset: 4px;
        border-radius: 50%;
        background: colors.$EAT-ACCENT;
        box-shadow: 0 0 8px colors.$EAT-ACCENT;
      }
    }
  }

  &__label {
    font-size: 0.92rem;
    color: #4B5563;
    font-weight: 500;
    transition: color 0.2s ease;
    .cal-option.selected & { color: colors.$QS-DARK; font-weight: 600; text-shadow: 0 0 1px rgba(255,255,255,0.3); }
  }
}

.cal-textarea {
  width: 100%;
  border: 1.5px solid rgba(0,0,0,0.1);
  border-radius: 12px;
  padding: 1rem 1.15rem;
  font-family: fonts.$font-secondary;
  font-size: 0.92rem;
  color: colors.$QS-DARK;
  background: colors.$QS-LIGHT;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;
  line-height: 1.55;
  box-sizing: border-box;
  &::placeholder { color: #9CA3AF; }
  &:focus { 
    border-color: colors.$EAT-ACCENT; 
    background: colors.$QS-SURFACE; 
  }
}

.cal-error {
  display: block;
  font-size: 0.78rem;
  color: colors.$OS-RED;
  margin-top: 0.35rem;
}

.cal-consent {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  cursor: pointer;
  padding: 0.5rem 0;

  input { display: none; }

  &__box {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0,0,0,0.15);
    border-radius: 6px;
    flex-shrink: 0;
    margin-top: 2px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    input:checked ~ & {
      background: colors.$EAT-ACCENT;
      border-color: colors.$EAT-ACCENT;
      &::after { content: '✓'; color: colors.$QS-SURFACE; font-size: 0.8rem; font-weight: 900; }
    }
  }

  &__text {
    font-size: 0.82rem;
    color: #4B5563;
    line-height: 1.5;
  }
}

.cal-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: colors.$EAT-ACCENT;
  color: colors.$QS-SURFACE;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-family: fonts.$font-accent;
  font-size: 0.97rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s ease, transform 0.15s ease;
  box-shadow: 0 4px 16px rgba(colors.$EAT-ACCENT, 0.3);
  &:hover:not(:disabled) { background: darken(colors.$EAT-ACCENT, 5%); transform: translateY(-1px); }
  &:disabled { opacity: 0.65; cursor: not-allowed; }
}

.fa-spin { animation: fa-spin 2s infinite linear; }
@keyframes fa-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
</style>
