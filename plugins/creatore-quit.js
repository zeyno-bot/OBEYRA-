let handler = async (m, { conn, text, command }) => {
  // Verifica permessi: Solo Owner
  const isOwner = [...global.owner.map(([number]) => number), ...global.mods]
    .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
    .includes(m.sender)

  if (!isOwner) {
    return await conn.reply(m.chat, `*｢ 💀 ACCESSO NEGATO ｣*\n\nNon hai l'autorità per invocare il mio distacco. Solo il mio *Creatore* può decidere il vostro destino.`, m)
  }

  // ID del gruppo (o quello passato come testo)
  let id = text ? text : m.chat

  // Design Estetico Aggressivo
  let leaveMessage = `
◢◤ [ 𝘚𝘠𝘚𝘛𝘌𝘔 _ 𝘗𝘜𝘙𝘎𝘌 _ 𝘈𝘊𝘛𝘐𝘝𝘌 ] ── ⚠️
 ───────────────────────────────────────
  > _Il mio tempo è troppo prezioso per_
    _essere sprecato tra gli scarti._
  
  🛑 𝘚𝘌𝘕𝘛𝘌𝘕𝘡𝘈 : Chat dichiarata *IRRILEVANTE*.
  🛑 𝘈𝘡𝘐𝘖𝘕𝘌    : Rimozione delle autorizzazioni.
  🛑 𝘋𝘌𝘚𝘛𝘐𝘕𝘖   : Abbandonati all'oblio.
 ───────────────────────────────────────
  *“Il silenzio sarà l'unica cosa che vi rimarrà.”*
 ─────────────────────────────────────── ☣
  🚫 𝘊𝘖𝘕𝘕𝘌𝘚𝘚𝘐𝘖𝘕𝘌 𝘙𝘌𝘊𝘐𝘚𝘈.
  
  _Goodbye, Losers._ 🖕`;
  `.trim()

  try {
    // 1. Invia il messaggio d'addio (senza tag per evitare crash di permessi)
    await conn.sendMessage(id, { text: leaveMessage })

    // 2. Pausa drammatica di 2 secondi per far leggere il messaggio
    await new Promise(resolve => setTimeout(resolve, 2000)) 

    // 3. Il bot abbandona il gruppo
    await conn.groupLeave(id)

  } catch (e) {
    console.error('Errore durante l\'uscita:', e)
    // Se c'è un errore nell'invio del messaggio, forza comunque l'uscita
    await conn.groupLeave(id)
  }
}

handler.help = ['out']
handler.tags = ['owner']
handler.command = /^(esci|leavegc|leave|voltati|out|sparite)$/i

handler.group = true 
handler.owner = true 

export default handler
