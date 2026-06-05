import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'
import moment from 'moment-timezone'
import os from 'os'

// --- PERCORSO IMMAGINE ---
const localImg = join(process.cwd(), 'ba0251659a03993ee0299eeb9949cd84.jpg');

const defaultMenu = {
  before: ` ◢◤ [ 𝘚𝘠𝘚𝘛𝘌𝘔 _ 𝘋𝘖𝘞𝘕𝘓𝘖𝘈𝘋 _ 𝘕𝘖𝘋𝘌 ] ── 📥
 ───────────────────────────────────────
  👤 𝘜𝘴𝘦𝘳  : %name
  🕒 𝘜𝘱𝘵𝘪𝘮𝘦: %uptime
  📥 𝘚𝘵𝘢𝘵𝘶𝘴: Ready
 ───────────────────────────────────────
  📡  𝘈𝘊𝘊𝘌𝘚𝘚𝘐𝘕𝘎 𝘋𝘖𝘞𝘕𝘓𝘖𝘈𝘋 𝘕𝘖𝘋𝘌...`.trimStart(),
  
  header: ' 📁 [ %category ] ───────────────────',
  body: '  ├── ⚡ *%cmd*',
  footer: ' ───────────────────────────────────────\n',
  
  after: ` ☣  _𝑂𝑏𝑒𝑦𝑟𝑎-𝘣𝘰𝘵 𝘯𝘦𝘵𝘸𝘰𝘳𝘬 𝘥𝘢𝘵𝘢_`
};
`
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  let tags = {
    'download': 'ᴅɪɢɪᴛᴀʟ ᴀssᴇᴛs'
  }

  try {
    await conn.sendPresenceUpdate('composing', m.chat)

    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length

    let help = Object.values(global.plugins).filter(p => !p.disabled).map(p => ({
      help: Array.isArray(p.help) ? p.help : [p.help],
      tags: Array.isArray(p.tags) ? p.tags : [p.tags],
      prefix: 'customPrefix' in p,
    }))

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
      name, uptime, totalreg,
      readmore: readMore
    }

    let text = _text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join('|')})`, 'g'), (_, name) => '' + replace[name])

    await m.react('📥')

    // --- INVIO COME IMMAGINE (SOSTITUITO VIDEO) ---
    await conn.sendMessage(m.chat, {
      image: { url: localImg },
      caption: text.trim(),
      contextInfo: {
        mentionedJid: [m.sender],
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363232743845068@newsletter',
          newsletterName: "✧ ᴏʙᴇʏʀᴀʙᴏᴛ ɢʀᴏᴜᴘ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ✧"
        }
      }
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❌ Error in Download Module: Check if ba0251659a03993ee0299eeb9949cd84.jpg exists.', m)
  }
}

handler.help = ['menudl']
handler.tags = ['menu']
handler.command = ['menudl', 'menudownload']

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '00' : Math.floor(ms / 3600000).toString().padStart(2, '0')
  let m = isNaN(ms) ? '00' : (Math.floor(ms / 60000) % 60).toString().padStart(2, '0')
  let s = isNaN(ms) ? '00' : (Math.floor(ms / 1000) % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
  }
