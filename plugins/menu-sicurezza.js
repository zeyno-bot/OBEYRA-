import fetch from 'node-fetch'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix: _p, command, args, isOwner, isAdmin }) => {
  const userName = m.pushName || 'Utente'

  // --- PERCORSO IMMAGINE LOCALE ---
  const localImg = join(process.cwd(), 'IMG-20260529-WA0564.jpg')

  global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {}
  global.db.data.settings[conn.user.jid] = global.db.data.settings[conn.user.jid] || {}
  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[conn.user.jid]

  // --- CONFIGURAZIONE MODULI ---
  const securityFeatures = [
    { key: 'antigore', name: '🚫 Antigore', desc: 'Blocca contenuti splatter/gore' },
    { key: 'modoadmin', name: '🛡️ Soloadmin', desc: 'Solo gli admin usano il bot' },
    { key: 'antivoip', name: '📞 Antivoip', desc: 'Rifiuta chiamate nel gruppo' },
    { key: 'antilink', name: '🔗 Antilink', desc: 'Elimina link gruppi WhatsApp' },
    { key: 'antilinksocial', name: '🌐 Antilinksocial', desc: 'Elimina link social (IG, TT, ecc)' },
    { key: 'antitrava', name: '🧱 Antitrava', desc: 'Blocca crash/messaggi lunghi' },
    { key: 'antinuke', name: '☢️ Antinuke', desc: 'Sicurezza avanzata del gruppo' },
    { key: 'antiviewonce', name: '👁️ Antiviewonce', desc: 'Invia messaggi visualizza una volta' },
    { key: 'antispam', name: '🛑 Antispam', desc: 'Blocca spam di comandi' }
  ]

  const automationFeatures = [
    { key: 'ai', name: '🧠 IA', desc: 'Intelligenza artificiale attiva' },
    { key: 'vocali', name: '🎤 Siri', desc: 'Risponde con audio ai messaggi' },
    { key: 'reaction', name: '😎 Reazioni', desc: 'Reazioni automatiche ai messaggi' },
    { key: 'autolevelup', name: '⬆️ Autolivello', desc: 'Messaggio di livello automatico' },
    { key: 'welcome', name: '👋 Welcome', desc: 'Messaggio di benvenuto' }
  ]

  const ownerFeatures = [
    { key: 'anticall', name: '📵 Antichiamate', desc: 'Blocca chiamate al bot (Global)' },
    { key: 'antiprivate', name: '🔒 Antiprivato', desc: 'Blocca uso del bot in privato' },
    { key: 'solocreatore', name: '👑 Solo Creatore', desc: 'Bot risponde solo all\'owner' }
  ]

  // --- GENERAZIONE MENU ---
  if (!args.length || /menu|help/i.test(args[0])) {
    let text = ` ◢◤ [ 𝘕𝘌𝘛𝘞𝘜𝘖𝘙𝘒 _ 𝘔𝘈𝘚𝘛𝘌𝘙 _ 𝘊𝘖𝘕𝘛𝘙𝘖𝘓 ] ── ✧
 ───────────────────────────────────────
  👤 𝘜𝘴𝘦𝘳  : ${userName}
  📡 𝘚𝘵𝘢𝘵𝘶𝘴: Online
 ───────────────────────────────────────
  💡 𝘐𝘕𝘚𝘛𝘙𝘜𝘡𝘐𝘖𝘕𝘐 𝘖𝘗𝘌𝘙𝘈𝘛𝘐𝘝𝘌:
  ├──  ${_p}𝘚𝘸𝘪𝘵𝘤𝘩_𝘖𝘯  ⇛ ${_p}attiva <nome>
  └──  ${_p}𝘚𝘸𝘪𝘵𝘤𝘩_𝘖𝘧𝘧 ⇛ ${_p}disattiva <nome>
 ───────────────────────────────────────
  🛡️ 𝘚𝘌𝘊𝘜𝘙𝘐𝘛𝘠_𝘔安排𝘋𝘜𝘓𝘌𝘚:${securityFeatures.map(f => `
  ├── ⚙️ ${f.name}
  │   ↳ _${f.desc}_
  │   └── [ KEY: ${_p}${f.key} ]`).join('')}
 ───────────────────────────────────────
  🤖 𝘈𝘜𝘛𝘖𝘔𝘈𝘛𝘐𝘖𝘕_𝘔𝘖𝘋𝘜𝘓𝘌𝘚:${automationFeatures.map(f => `
  ├── ⚙️ ${f.name}
  │   ↳ _${f.desc}_
  │   └── [ KEY: ${_p}${f.key} ]`).join('')}
 ─────────────────────────────────────── ☣
  ↳ ᴏʙᴇʏʀᴀ-ʙᴏᴛ sᴇᴄᴜʀɪᴛʏ `;



    // Invio con immagine locale
    await conn.sendMessage(m.chat, { 
      image: { url: localImg }, 
      caption: text.trim(),
      contextInfo: {
        mentionedJid: [m.sender],
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363232743845068@newsletter',
          newsletterName: "🛡️ ꜱʏꜱᴛᴇᴍ ꜱᴇᴄᴜʀɪᴛʏ ᴄᴏɴᴛʀᴏʟ 🛡️"
        }
      }
    }, { quoted: m })
    return
  }

  // --- LOGICA DI ATTIVAZIONE ---
  let isEnable = !/disattiva|off|0/i.test(command)
  let type = args[0].toLowerCase()
  let status = isEnable ? 'ATTIVATO ☑️' : 'DISATTIVATO ✖️'

  let dbKey = type
  if (type === 'antilink') dbKey = 'antiLink'
  if (type === 'antilinksocial') dbKey = 'antiLink2'
  if (type === 'antiviewonce') dbKey = 'antioneview'
  if (type === 'antiprivate') dbKey = 'antiPrivate'
  if (type === 'solocreatore') dbKey = 'soloCreatore'

  const isSecurity = securityFeatures.some(f => f.key.toLowerCase() === type)
  const isAuto = automationFeatures.some(f => f.key.toLowerCase() === type)
  const isOwnerKey = ownerFeatures.some(f => f.key.toLowerCase() === type)

  if (isSecurity || isAuto) {
    if (!m.isGroup && !isOwner) return m.reply('❌ Solo nei gruppi')
    if (m.isGroup && !isAdmin && !isOwner) return m.reply('🛡️ Solo per Admin')
    chat[dbKey] = isEnable
  } else if (isOwnerKey) {
    if (!isOwner) return m.reply('👑 Solo per l\'Owner')
    bot[dbKey] = isEnable
  } else {
    return m.reply('❓ Modulo non trovato.')
  }

  await m.react(isEnable ? '✅' : '❌')
  m.reply(`『 🛡️ 』 *SISTEMA AGGIORNATO*\n\nModulo: *${type.toUpperCase()}*\nStato: *${status}*`)
}

handler.command = ['attiva', 'disattiva', 'on', 'off', 'enable', 'disable']
export default handler