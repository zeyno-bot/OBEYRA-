const owner = ['393501989497@s.whatsapp.net']
const staff = [
  '39obeyraendyduce@s.whatsapp.net', // aggiungi qui altri membri dello staff
]

const handler = async (m, { conn, args }) => {
  if (![...owner, ...staff].includes(m.sender)) return conn.reply(m.chat, '【 𝘈𝘊𝘊𝘌𝘚𝘚_𝘉𝘓𝘖𝘊𝘒𝘌𝘋 】──────────────── ✖

 ☣ 𝗦𝘆𝘀_𝗠𝘀𝗴 ⇛ Privilegi insufficienti.
 ☣ 𝗥𝗲𝗾𝘂𝗶𝗿𝗲𝗱 ⇛ [ STAFF // OWNER ]
 
 🛑 ───────────────────────────────────
', m)
  const testo = args.join(' ').trim()
  if (!testo) return conn.reply(m.chat, 'Scrivi il messaggio da inviare!', m)
  const canaleAnnunci = '120363418582531215@newsletter'
  const nomeAnnunciatore = m.pushName || 'Staff'
  const messaggio = ` ◢◤ [ 𝘚𝘠𝘚𝘛𝘌𝘔_𝘉𝘙𝘎𝘈𝘋𝘊𝘈𝘚𝘛 ] ── 📢
 ───────────────────────────────────────
  
  » 𝘕𝘰𝘵𝘪𝘤𝘦: ${testo}
  
 ─────────────────────────────────────── ☣
  👤 𝘈𝘶𝘵𝘩𝘰𝘳: ${nomeAnnunciatore}
  🕒 𝘛𝘪𝘮𝘦: ${new Date().toLocaleString('it-IT')}
 ───────────────────────────────────────`;
`

  await conn.sendMessage(canaleAnnunci, { text: messaggio })
  await conn.reply(m.chat, '✅ Annuncio inviato nel canale!', m)
}

handler.help = ['annuncio <testo>']  
handler.command = /^annuncio$/i
handler.owner = true

export default handler