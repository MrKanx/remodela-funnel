import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
import FunnelView from '../views/FunnelView.vue'
import VideoView from '../views/VideoView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import LegalNoticeView from '../views/LegalNoticeView.vue'
import BookingView from '../views/BookingView.vue'
import BookedView from '../views/BookedView.vue'
import NoSpaceView from '../views/NoSpaceView.vue'

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
    canonical: string
    ogTitle: string
    ogDescription: string
    ogUrl: string
    jsonLd?: object[]
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, behavior: 'instant' }),
  routes: [
    {
      path: '/',
      alias: '/registro-vsl-tr',
      name: 'funnel',
      component: FunnelView,
      meta: {
        title: 'EAT | Transforma el almuerzo de tu equipo',
        description:
          'Transformamos tu flujo alimentario con el método Corporate Food Flow. Un solo equipo planifica y ejecuta todo el proceso.',
        canonical: 'https://eat.com/',
        ogTitle: 'EAT | Transforma el almuerzo de tu equipo',
        ogDescription:
          'Transformamos tu flujo alimentario con el método Corporate Food Flow. Un solo equipo planifica y ejecuta todo el proceso.',
        ogUrl: 'https://eat.com/',
      } satisfies RouteMeta,
    },
    {
      path: '/ver-video',
      name: 'video',
      component: VideoView,
      meta: {
        title: 'Mira el video | EAT — Paso 1 de 2',
        description: 'Descubre cómo implementar tu sistema de alimentación sin estrés con el método Corporate Food Flow.',
        canonical: 'https://eat.com/ver-video',
        ogTitle: 'Mira el video | EAT',
        ogDescription: 'Ve el video y agenda tu diagnóstico corporativo.',
        ogUrl: 'https://eat.com/ver-video',
      } satisfies RouteMeta,
    },
    {
      path: '/agendar',
      name: 'booking',
      component: BookingView,
      meta: {
        title: 'Agenda tu Sesión | EAT — Paso 2 de 2',
        description: 'Selecciona el día y hora para tu diagnóstico corporativo.',
        canonical: 'https://eat.com/agendar',
        ogTitle: 'Agenda tu Sesión | EAT',
        ogDescription: 'Elige tu horario y reserva tu diagnóstico corporativo.',
        ogUrl: 'https://eat.com/agendar',
      } satisfies RouteMeta,
    },
    {
      path: '/cita-confirmada',
      name: 'booked',
      component: BookedView,
      meta: {
        title: 'Sesión Confirmada | EAT',
        description: 'Tu diagnóstico con EAT está confirmado. Revisa tu correo.',
        canonical: 'https://eat.com/cita-confirmada',
        ogTitle: 'Sesión Confirmada | EAT',
        ogDescription: 'Tu diagnóstico está reservado. Te contactaremos pronto.',
        ogUrl: 'https://eat.com/cita-confirmada',
      } satisfies RouteMeta,
    },
    {
      path: '/sin-espacio',
      name: 'no-space',
      component: NoSpaceView,
      meta: {
        title: 'Sin Cupos Disponibles | EAT',
        description: 'En este momento los cupos para proyectos de EAT están completos.',
        canonical: 'https://eat.com/sin-espacio',
        ogTitle: 'Sin Cupos Disponibles | EAT',
        ogDescription: 'Los cupos para nuevas cuentas corporativas están completos. Te avisaremos cuando haya disponibilidad.',
        ogUrl: 'https://eat.com/sin-espacio',
      } satisfies RouteMeta,
    },
    {
      path: '/politicas-privacidad',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
      meta: {
        title: 'Política de Privacidad | EAT',
        description: 'Política de privacidad de EAT. Información sobre el tratamiento de datos personales.',
        canonical: 'https://eat.com/politicas-privacidad',
        ogTitle: 'Política de Privacidad | EAT',
        ogDescription: 'Política de privacidad de EAT.',
        ogUrl: 'https://eat.com/politicas-privacidad',
      } satisfies RouteMeta,
    },
    {
      path: '/aviso-legal',
      name: 'legal-notice',
      component: LegalNoticeView,
      meta: {
        title: 'Aviso Legal | EAT',
        description: 'Aviso legal de EAT. Términos y condiciones de uso del sitio web.',
        canonical: 'https://eat.com/aviso-legal',
        ogTitle: 'Aviso Legal | EAT',
        ogDescription: 'Aviso legal de EAT.',
        ogUrl: 'https://eat.com/aviso-legal',
      } satisfies RouteMeta,
    },
  ],
})

// ── SEO dinámico por ruta ──────────────────────────────────────────────────────
const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el) }
  el.content = content
}

const setOgMeta = (property: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el) }
  el.content = content
}

const setCanonical = (href: string) => {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el) }
  el.href = href
}

router.afterEach((to) => {
  const meta = to.meta
  document.title = meta.title ?? 'EAT'
  setMeta('description', meta.description ?? '')
  setOgMeta('og:title', meta.ogTitle ?? meta.title ?? '')
  setOgMeta('og:description', meta.ogDescription ?? meta.description ?? '')
  setOgMeta('og:url', meta.ogUrl ?? '')
  setOgMeta('twitter:title', meta.ogTitle ?? meta.title ?? '')
  setOgMeta('twitter:description', meta.ogDescription ?? meta.description ?? '')
  setCanonical(meta.canonical ?? '')
})

// ── Router Guards ──────────────────────────────────────────────────────────────
const BOOKED_TTL_MS = 3 * 24 * 60 * 60 * 1000
const DISQ_TTL_MS   = 48 * 60 * 60 * 1000

const readTimestamp = (key: string): number | null => {
  const raw = localStorage.getItem(key)
  if (!raw) return null
  const n = Number(raw)
  return Number.isFinite(n) && n > 0 ? n : null
}

const isFresh = (key: string, ttl: number): boolean => {
  const ts = readTimestamp(key)
  if (ts === null) return false
  if (Date.now() - ts <= ttl) return true
  localStorage.removeItem(key)
  return false
}

const PUBLIC_ROUTES = ['privacy-policy', 'legal-notice']

router.beforeEach((to, from, next) => {
  const routeName = to.name as string
  if (PUBLIC_ROUTES.includes(routeName)) return next()

  const bookedFresh = isFresh('os_booked_at', BOOKED_TTL_MS)
  const disqFresh   = isFresh('os_disq_at',   DISQ_TTL_MS)

  if (routeName === 'booked') {
    if (!bookedFresh && !import.meta.env.DEV) return next({ name: 'funnel' })
    return next()
  }

  if (bookedFresh && !import.meta.env.DEV) {
    return next({ name: 'booked' })
  }

  if (disqFresh && ['booking', 'booked'].includes(routeName) && !import.meta.env.DEV) {
    return next({ name: 'no-space' })
  }

  if (routeName === 'no-space' && !disqFresh && !import.meta.env.DEV) {
    return next({ name: 'funnel' })
  }

  next()
})

export default router
