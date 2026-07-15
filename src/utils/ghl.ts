const WH_REGISTRO = import.meta.env.VITE_WEBHOOK_REGISTRO ?? 'https://services.leadconnectorhq.com/hooks/qrzFcTFG8SIL37kcHGSs/webhook-trigger/8JPccLAQDTwQ1CitV9dJ'
const WH_CALIFICACION = import.meta.env.VITE_WEBHOOK_CALIFICACION ?? 'https://services.leadconnectorhq.com/hooks/qrzFcTFG8SIL37kcHGSs/webhook-trigger/SaiUzL2ywzABxLH2J89h'

export function generateEventId(prefix = 'evt'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

export async function trackStage(etapa: string, data: Record<string, string> & { event_id?: string }) {
  try {
    const event_id = data.event_id ?? generateEventId('view')
    const webhook = etapa.includes('cualificacion') ? WH_CALIFICACION : WH_REGISTRO
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ etapa, event_id, ...data }),
    })
  } catch {
    // silencioso
  }
}
