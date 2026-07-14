import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
import FunnelView from '../views/FunnelView.vue'
import VideoView from '../views/VideoView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import LegalNoticeView from '../views/LegalNoticeView.vue'
import BookingView from '../views/BookingView.vue'
import BookedView from '../views/BookedView.vue'
import NoSpaceView from '../views/NoSpaceView.vue'
import GenericThanksView from '../views/GenericThanksView.vue'

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
        title: 'REMODELA | Javier Aguilar',
        description:
          'Transformamos tu espacio con rigor técnico y precio fijo garantizado. El método de optimización espacial y retorno absoluto.',
        canonical: 'https://remodela.com/',
        ogTitle: 'REMODELA | Javier Aguilar',
        ogDescription:
          'Transformamos tu espacio con rigor técnico y precio fijo garantizado. El método de optimización espacial y retorno absoluto.',
        ogUrl: 'https://remodela.com/',
      } satisfies RouteMeta,
    },
    {
      path: '/ver-video',
      name: 'video',
      component: VideoView,
      meta: {
        title: 'Mira el video | REMODELA — Paso 1 de 2',
        description: 'Descubre cómo blindar tu inversión con el método de Optimización Espacial y Retorno Absoluto.',
        canonical: 'https://remodela.com/ver-video',
        ogTitle: 'Mira el video | REMODELA',
        ogDescription: 'Ve el video y agenda tu diagnóstico técnico especializado.',
        ogUrl: 'https://remodela.com/ver-video',
      } satisfies RouteMeta,
    },
    {
      path: '/agendar',
      name: 'booking',
      component: BookingView,
      meta: {
        title: 'Agenda tu Sesión | REMODELA — Paso 2 de 2',
        description: 'Selecciona el día y hora para tu diagnóstico técnico.',
        canonical: 'https://remodela.com/agendar',
        ogTitle: 'Agenda tu Sesión | REMODELA',
        ogDescription: 'Elige tu horario y reserva tu diagnóstico técnico.',
        ogUrl: 'https://remodela.com/agendar',
      } satisfies RouteMeta,
    },
    {
      path: '/cita-confirmada',
      name: 'booked',
      component: BookedView,
      meta: {
        title: 'Sesión Confirmada | REMODELA',
        description: 'Tu diagnóstico con REMODELA está confirmado. Revisa tu correo.',
        canonical: 'https://remodela.com/cita-confirmada',
        ogTitle: 'Sesión Confirmada | REMODELA',
        ogDescription: 'Tu diagnóstico está reservado. Te contactaremos pronto.',
        ogUrl: 'https://remodela.com/cita-confirmada',
      } satisfies RouteMeta,
    },
    {
      path: '/sin-espacio',
      name: 'no-space',
      component: NoSpaceView,
      meta: {
        title: 'Sin Cupos Disponibles | REMODELA',
        description: 'En este momento los cupos para proyectos de REMODELA están completos.',
        canonical: 'https://remodela.com/sin-espacio',
        ogTitle: 'Sin Cupos Disponibles | REMODELA',
        ogDescription: 'Los cupos para nuevas obras están completos. Te avisaremos cuando haya disponibilidad.',
        ogUrl: 'https://remodela.com/sin-espacio',
      } satisfies RouteMeta,
    },
    {
      path: '/gracias',
      name: 'gracias',
      component: GenericThanksView,
      meta: {
        title: 'Registro Completado | REMODELA',
        description: 'Muchas gracias por tu tiempo.',
        canonical: 'https://remodela.com/gracias',
        ogTitle: 'Registro Completado | REMODELA',
        ogDescription: 'Muchas gracias por tu tiempo.',
        ogUrl: 'https://remodela.com/gracias',
      } satisfies RouteMeta,
    },
    {
      path: '/politicas-privacidad',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
      meta: {
        title: 'Política de Privacidad | REMODELA',
        description: 'Política de privacidad de REMODELA. Información sobre el tratamiento de datos personales.',
        canonical: 'https://remodela.com/politicas-privacidad',
        ogTitle: 'Política de Privacidad | REMODELA',
        ogDescription: 'Política de privacidad de REMODELA.',
        ogUrl: 'https://remodela.com/politicas-privacidad',
      } satisfies RouteMeta,
    },
    {
      path: '/aviso-legal',
      name: 'legal-notice',
      component: LegalNoticeView,
      meta: {
        title: 'Aviso Legal | REMODELA',
        description: 'Aviso legal de REMODELA. Términos y condiciones de uso del sitio web.',
        canonical: 'https://remodela.com/aviso-legal',
        ogTitle: 'Aviso Legal | REMODELA',
        ogDescription: 'Aviso legal de REMODELA.',
        ogUrl: 'https://remodela.com/aviso-legal',
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
  document.title = meta.title ?? 'REMODELA'
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

const PUBLIC_ROUTES = ['privacy-policy', 'legal-notice', 'gracias']

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
