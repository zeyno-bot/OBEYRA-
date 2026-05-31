let handler = async (m, { conn }) => {
  if (m.isGroup) throw '◢◤ [ 𝘊𝘏𝘈𝘛_𝘙𝘌𝘚𝘛𝘙𝘐𝘊𝘛𝘐𝘖𝘕 ] ── ❗️
 ───────────────────────────────────────
  🛑 𝘚𝘺𝘴_𝘙𝘦𝘴𝘱𝘰𝘯𝘴ece:
  ↳ Questo comando può essere utilizzato
    esclusivamente in *Chat Privata*.
 ─────────────────────────────────────── ☣`;
'
  if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = { isBanned: false }
  global.db.data.chats[m.chat].isBanned = true
  await conn.reply(m.chat, `◢◤ [ 𝘚𝘠𝘚𝘛𝘌𝘔_𝘚𝘏𝘜𝘛𝘋𝘖𝘞𝘕 ] ── 📴
 ───────────────────────────────────────
  🛑 𝘚𝘺𝘴_𝘙𝘦𝘴𝘱𝘰𝘯𝘴𝘦:
  ↳ Il bot è stato disattivato con successo
    in questa specifica chat.
 ─────────────────────────────────────── ☣`;
`, m)
}
handler.help = ['007ban']
handler.tags = ['creatore']
handler.command = /^banchat$/i
handler.rowner = true

export default handler