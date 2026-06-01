import fs from 'fs'
const DB_PATH = '../database.json'

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
    const isOwner = m.fromMe || global.owner
        .filter(v => v) // Rimuove valori null/undefined
        .map(v => {
            if (typeof v !== 'string') return String(v).replace(/[^0-9]/g, '')
            return v.replace(/[^0-9]/g, '')
        })
        .map(v => v + '@s.whatsapp.net')
        .includes(m.sender)

    if (!isOwner) return m.reply(` ◢◤ [ 𝘗𝘙𝘖𝘗𝘙𝘐𝘌𝘛𝘈𝘙𝘠 _ 𝘓𝘖𝘊𝘒𝘓𝘖𝘜𝘛 ] ── ❌
 ───────────────────────────────────────
  🛑 𝘚𝘺𝘴_𝘙𝘦𝘴𝘱𝘰𝘯𝘴ece:
  ↳ Questo comando può essere utilizzato
    esclusivamente dall' *Owner* del bot.
 ─────────────────────────────────────── ☣`;
 )

    try {
        if (!args[0]) {
            return m.reply( ` ◢◤ [ 𝘚𝘠𝘚𝘛𝘌𝘔 _ 𝘋𝘎_𝘔𝘈𝘕𝘈𝘎𝘌𝘙 ] ── 📊
 ───────────────────────────────────────
  📁 [01] 𝘝𝘐𝘚𝘜𝘈𝘓𝘐𝘡𝘡𝘈_𝘝𝘈𝘓𝘖𝘙𝘐:
  ├──  ${usedPrefix}db money @user
  ├──  ${usedPrefix}db level @user
  └──  ${usedPrefix}db premium @user
 ───────────────────────────────────────
  ⚙️ [02] 𝘜𝘗𝘋𝘈𝘛𝘌_𝘙𝘌𝘊𝘖𝘙𝘋𝘚:
  ├──  ${usedPrefix}db set @user money 1000
  └──  ${usedPrefix}db set @user premium true
 ───────────────────────────────────────
  🔍 [03] 𝘝𝘌𝘋𝘐_𝘛𝘜𝘛𝘛𝘖:
  ├──  ${usedPrefix}db list users
  └──  ${usedPrefix}db list all
 ─────────────────────────────────────── ☣`;
          `)
        }

        let db = JSON.parse(fs.readFileSync(DB_PATH))
        const mentionedJid = m.mentionedJid[0] || m.quoted?.sender || ''
        if (args[0] === 'list') {
            const category = args[1] || 'all'
            let output = `╭━━━•❃°•°❀°•°❃•━━━╮\n┃ 📊 *DATABASE ${category.toUpperCase()}*\n`

            if (category === 'all' || category === 'users') {
                for (let [user, data] of Object.entries(db.users)) {
                    const name = `@${user.split('@')[0]}`
                    output += `┃\n┃ 👤 *${name}*\n`
                    output += `┃ • Money: ${data.money || 0}\n`
                    output += `┃ • Level: ${data.level || 0}\n`
                    output += `┃ • Premium: ${data.premium ? '✅' : '❌'}\n`
                }
            }
            output += `╰━━━•❃°•°❀°•°❃•━━━╯`
            return m.reply(output)
        }
        if (!args[0].startsWith('set')) {
            const path = args[0]
            const user = mentionedJid
            if (!user) throw 'Tag un utente o rispondi a un messaggio'

            const value = db.users[user]?.[path]
            return m.reply(`╭━━━•❃°•°❀°•°❃•━━━╮
┃ 📊 *VALORE ${path.toUpperCase()}*
┃
┃ 👤 User: @${user.split('@')[0]}
┃ 📝 ${path}: ${value ?? 'Non impostato'}
╰━━━•❃°•°❀°•°❃•━━━╯`, null, { mentions: [user] })
        }
        if (args[0] === 'set') {
            const user = mentionedJid
            const [_, __, path, ...valueArr] = args
            if (!user || !path || !valueArr.length) throw 'Formato: .db set @user path valore'

            let value = valueArr.join(' ')
            if (value === 'true') value = true
            if (value === 'false') value = false
            if (!isNaN(value)) value = Number(value)

            if (!db.users[user]) db.users[user] = {}
            db.users[user][path] = value
            fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2))

            return m.reply(`╭━━━•❃°•°❀°•°❃•━━━╮
┃ ✅ *VALORE MODIFICATO*
┃
┃ 👤 User: @${user.split('@')[0]}
┃ 📝 ${path}: ${value}
╰━━━•❃°•°❀°•°❃•━━━╯`, null, { mentions: [user] })
        }

    } catch (e) {
        console.error(e)
        await m.reply(`❌ Errore: ${e.message}`)
    }
}

handler.help = ['database']
handler.tags = ['owner']
handler.command = /^db$/i
handler.rowner = true

export default handler
