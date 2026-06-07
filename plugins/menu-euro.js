import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'

// --- PERCORSO IMMAGINE ---
const localImg = join(process.cwd(), 'ea55e426a37bf8de87e9945c51e3f7e0.jpg');

const defaultMenu = {
  before: ` ◢◤ [ 𝘚𝘠𝘚𝘛𝘌𝘔 _ 𝘌𝘊𝘖𝘕𝘖𝘔𝘠 _ 𝘓𝘌𝘋𝘎𝘌𝘒 ] ── 🪙
 ───────────────────────────────────────
  👤 𝘜𝘴𝘦𝘳  : %name
  💳 𝘚𝘢𝘭𝘥𝘰 : %eris 𝘌𝘙𝘐𝘚
  🏆 𝘓𝘷𝘭   : %level
  🛡️ 𝘙𝘢𝘯𝘬  : %role
 ───────────────────────────────────────
  📡  𝘌𝘟𝘛𝘙𝘎𝘊𝘛𝘐𝘕𝘎 𝘌𝘊𝘖𝘕𝘖𝘔𝘠 𝘛𝘙𝘎𝘊𝘒𝘌𝘙...`.trimStart(),
  
  header: ' 📁 [ %category ] ───────────────────',
  body: '  ├── 🪙 *%cmd*',
  footer: ' ───────────────────────────────────────\n',
  
  after: ` ☣  _𝘴𝘺𝘴𝘵𝘦𝘮 𝘰𝘱𝘦𝘳𝘢𝘵𝘪𝘰𝘯𝘢𝘭 𝘷.2.0_`
};
`
}

let handler = async (m, { conn, usedPrefix: _p, __dirname, args, command}) => {
  let tags = {
    'euro': '🗂️ ᴅᴀᴛᴀʙᴀsᴇ ᴇᴜʀᴏ'
  }

  try {
    await conn.sendPresenceUpdate('composing', m.chat)

    let d = new Date(new Date().getTime() + 3600000)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)

    let user = global.db.data.users[m.sender] || {}
    let { level, role, eris } = user
    let name = await conn.getName(m.sender)

    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
      }
    })

    let _text = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag => {
        return defaultMenu.header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return defaultMenu.body.replace(/%cmd/g, menu.prefix ? help : _p + help)
                .trim()
            }).join('\n')
          }),
          defaultMenu.footer
        ].join('\n')
      }),
      defaultMenu.after
    ].join('\n')

    let replace = {
      '%': '%',
      p: _p,
      name, eris, level, role, uptime
    }

    let text = _text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    await m.react('💳')

    // --- INVIO COME IMMAGINE (SOSTITUITO VIDEO) ---
    await conn.sendMessage(m.chat, {
      image: { url: localImg },
      caption: text.trim(),
      contextInfo: {
        mentionedJid: [m.sender],
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363232743845068@newsletter',
          newsletterName: "✧ obeyrabot economy ✧"
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Error in Core System: Check if menu-euro.jpeg exists.', m)
  }
}

handler.help = ['menueuro']
handler.tags = ['menu']
handler.command = ['menueuro']

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '00' : Math.floor(ms / 3600000).toString().padStart(2, '0')
  let m = isNaN(ms) ? '00' : (Math.floor(ms / 60000) % 60).toString().padStart(2, '0')
  let s = isNaN(ms) ? '00' : (Math.floor(ms / 1000) % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
        }
