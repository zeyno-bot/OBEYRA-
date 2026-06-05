let handler = async (m, { conn, text, usedPrefix, command, args, participants }) => {
  if (!m.isGroup) return m.reply('⚠️ Questo comando funziona solo nei gruppi')
  let isOwner = false
  try {
    const ownerNumbers = Array.isArray(global.owner) ? global.owner : [global.owner]
    for (const owner of ownerNumbers) {
      const number = typeof owner === 'string' ? owner : owner[0]
      const ownerJid = number.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      if (m.sender === ownerJid) {
        isOwner = true
        break
      }
    }
  } catch (e) {
    console.error('Errore verifica owner:', e)
  }

  if (!isOwner) {
    const ownerContact = typeof global.owner[0] === 'string' ? global.owner[0] : global.owner[0][0]
    const ownerJid = ownerContact.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    return m.reply(`⚠️ Solo il creatore può usare questo comando!\n\nContatta: @${ownerJid.split('@')[0]}`, null, { mentions: [ownerJid] })
  }
  if (!text || !args[1]) {
    return m.reply(`
⚠️ *Formato non valido*

📌 *Uso corretto:*
${usedPrefix + command} @utente comando

📝 *Esempio:*
${usedPrefix + command} @user play
`.trim())
  }

  try {
    const user = m.mentionedJid[0]
    const unblockedCmd = args[1].toLowerCase()

    if (!user) return m.reply('⚠️ Devi taggare un utente')
    if (!global.db.data.users[user] || 
        !global.db.data.users[user].bannedCommands || 
        !global.db.data.users[user].bannedCommands.includes(unblockedCmd)) {
      return m.reply(`❌ @${user.split('@')[0]} non ha il comando *${unblockedCmd}* bloccato`, null, { mentions: [user] })
    }
    global.db.data.users[user].bannedCommands = global.db.data.users[user].bannedCommands.filter(cmd => cmd !== unblockedCmd)

    m.reply(`✅ @${user.split('@')[0]} può ora usare di nuovo il comando *${unblockedCmd}*`, null, { mentions: [user] })

  } catch (e) {
    console.error(e)
    m.reply('❌ Errore durante lo sblocco del comando')
  }
}

handler.help = ['unbancmd @user comando']
handler.tags = ['creatore']
handler.command = /^(unbancmd|unbancomando)$/i
handler.owner = true

export default handler
