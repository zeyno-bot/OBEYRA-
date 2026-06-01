let handler = async (m, { conn, args, isOwner }) => {
    try {
        if (!isOwner) {
            let errorMsg = `*❌ ERRORE COMANDO*\n`
            errorMsg += `━━━━━━━━━━━━━━━━\n\n`
            errorMsg += `*⚠️ Motivo:*\n`
            errorMsg += `└─⭓ Comando riservato al proprietario\n\n`
            errorMsg += `𝚯𝚩𝚵𝐘𝐑𝚫 𝚩𝚯𝐓`
            return m.reply(errorMsg)
        }
        if (!m.isGroup) {
            let errorMsg = `*❌ ERRORE COMANDO*\n`
            errorMsg += `━━━━━━━━━━━━━━━━\n\n`
            errorMsg += `*⚠️ Motivo:*\n`
            errorMsg += `└─⭓ Utilizzabile solo nei gruppi\n\n`
            errorMsg += `𝚯𝚩𝚵𝐘𝐑𝚫 𝚩𝚯𝐓`
            return m.reply(errorMsg)
        }
        if (!global.db.data) {
            global.db.data = {
                users: {},
                chats: {},
                stats: {},
                msgs: {},
                sticker: {},
                settings: {}
            }
        }
        if (!global.db.data.chats[m.chat]) {
            global.db.data.chats[m.chat] = {
                isBanned: false,
                welcome: false,
                detect: false,
                sWelcome: '',
                sBye: '',
                sPromote: '',
                sDemote: '',
                delete: true,
                antiLink: false,
                viewonce: false,
                antiToxic: false,
                expired: 0
            }
        }

        let chat = global.db.data.chats[m.chat]
        if (chat.isBanned) {
            let errorMsg = `*❌ ERRORE COMANDO*\n`
            errorMsg += `━━━━━━━━━━━━━━━━\n\n`
            errorMsg += `*⚠️ Motivo:*\n`
            errorMsg += `└─⭓ Questo gruppo è già bannato\n\n`
            errorMsg += `𝚯𝚩𝚵𝐘𝐑𝚫 𝚩𝚯𝐓`
            return m.reply(errorMsg)
        }

        chat.isBanned = true
        await global.db.write()
        let groupInfo = await conn.groupMetadata(m.chat)
        let memberCount = groupInfo.participants.length
        let adminCount = groupInfo.participants.filter(p => p.admin).length

        m.reply( `◢◤ [ 𝘎𝘙𝘖𝘜𝘗_𝘉𝘈𝘕𝘕𝘌𝘋 ] ── 🚫
 ───────────────────────────────────────
  ⚠️ 𝘚𝘠𝘚𝘛𝘌𝘔_𝘓𝘖𝘊𝘒:
  ├── 📝 𝘚𝘵𝘢𝘵𝘰 : Bannato
  ├── 👥 𝘎𝘳𝘶𝘱𝘱𝘰: ${await conn.getName(m.chat)}
  ├── 👤 𝘔𝘦𝘮𝘣𝘳𝘪: ${memberCount}
  ├── 👑 𝘈𝘥𝘮𝘪𝘯 : ${adminCount}
  └── 🔒 𝘈𝘻𝘪𝘰𝘯𝘦: Ban accesso bot
 ───────────────────────────────────────
  ☣️ 𝘌𝘍𝘍𝘌𝘛𝘛𝘐:
  ├── ✖ Bot non risponde ai comandi
  ├── ✖ Solo gli owner possono usare il bot
  └── ✖ Ban attivo fino a revoca
 ───────────────────────────────────────
  🕒 𝘛𝘪𝘮𝘦: ${new Date().toLocaleString('it-IT')}
 ───────────────────────────────────────
> ↳𝚯𝚩𝚵𝐘𝐑𝚫 𝚩𝚯𝐓  `;
`)
        let admins = groupInfo.participants.filter(p => p.admin)
        let adminMsg = `*⚠️ NOTIFICA ADMIN*\n`
        adminMsg += `━━━━━━━━━━━━━━━━\n\n`
        adminMsg += `*📝 Info:*\n`
        adminMsg += `└─⭓ Questo gruppo è stato bannato\n\n`
        adminMsg += `*📌 Note:*\n`
        adminMsg += `└─⭓ Il bot non risponderà ai comandi\n\n`
        adminMsg += `𝚯𝚩𝚵𝐘𝐑𝚫 𝚩𝚯𝐓`

        for (let admin of admins) {
            await conn.sendMessage(admin.id, { text: adminMsg })
        }
    } catch (e) {
        console.error(e)
        return m.reply(`*❌ ERRORE*\n` +
                      `━━━━━━━━━━━━━━━━\n\n` +
                      `*⚠️ Si è verificato un errore*\n` +
                      `*📝 Tipo:* ${e.message}\n\n` +
                      `𝚯𝚩𝚵𝐘𝐑𝚫 𝚩𝚯𝐓`)
    }
}

handler.help = ['bangp']
handler.tags = ['creatore']
handler.command = /^bangp$/i
handler.rowner = true
handler.group = true

export default handler