//plugin creato by endy
import { execSync } from 'child_process'

let handler = async (m, { conn, text }) => {
  if (conn.user.jid !== conn.user.jid) return 

  try {
    await m.react('🦍')

    execSync('git fetch')
    let status = execSync('git status -uno', { encoding: 'utf-8' })

    if (status.includes('Your branch is up to date') || status.includes('nothing to commit')) {
      await conn.reply(m.chat, '【 𝚵𝚴𝐃_𝐏𝚯𝚰𝚴𝚻 】─────────────────── ☠

 ҂  𝗦𝘆𝘀_𝗖𝗵𝗲𝗰𝗸 ⇛ Nessuna patch rilevata.
 ҂  𝗗𝗮𝘁𝗮_𝗦𝘁𝗿𝗲𝗮𝗺 ⇛ Server all'ultimo blocco.
 
 ☣ ──── CORE_READY_', m)
      await m.react('☑️')
      return
    }

    // Reset locale ed esecuzione del pull con statistiche
    let updateOutput = execSync('git reset --hard && git pull --stat' + (m.fromMe && text ? ' ' + text : ''), { encoding: 'utf-8' })

    // Estrazione dei file modificati
    let fileDetails = parseGitFileDetails(updateOutput)

    let reportFiles = fileDetails.map((f, i) => {
      return `◢◤ [PACKET_${i + 1}] ── ❖ ${f.name}
 ⚡ INJECTION_STREAM
 ├── 🟩 [INS]: +${f.ins} bytes
 └── 🟥 [DEL]: -${f.del} bytes
 ─────────────────────────────────────── ╳ `
    }).join('\n')

    let message = `
𓆩☠𓆪 ── 𝚯𝚩𝚵𝐘𝐑𝚫 𝚩𝚯𝐓 ── 𓆩☠𓆪
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 ☣ 𝘊𝘖𝘋𝘌_𝘐𝘕𝘑𝘌𝘊𝘛𝘐𝘖𝘕_𝘚𝘜𝘊𝘊𝘌𝘚𝘚𝘍𝘜𝘓...

 ${reportFiles}
 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🪓 𝘚𝘺𝘴𝘵𝘦𝘮 𝘸𝘪𝘭𝘭 𝘯𝘰𝘵 𝘳𝘦𝘉𝘰𝘰𝘵. 𝘌𝘯𝘫𝘰𝘺 𝘵𝘩𝘦 𝘤𝘩𝘢𝘰𝘴.
 ⸸ ─── [ 𝘚𝘠𝘚_𝘉𝘙𝘌𝘈𝘒𝘌𝘋 ] ─── ⸸`.trim()

    await conn.reply(m.chat, message, m)
    await m.react('💣')

  } catch (err) {
    await conn.reply(m.chat, ` ◢◤ [ 𝘍𝘈𝘛𝘈𝘓_𝘌𝘙𝘙𝘖𝘙_𝘉𝘙𝘌𝘈𝘊𝘏 ] ── ❌
 ───────────────────────────────────────
 🚨 𝘚𝘺𝘴_𝘙𝘦𝘴𝘱𝘰𝘯𝘴𝘦:
 ↳ 🫀 [ ${err.message} ]
 ─────────────────────────────────────── ☣
`, m)
    await m.react('❌')
  }
}

// Funzione per estrarre i dettagli di ogni singolo file modificato
function parseGitFileDetails(output) {
  const lines = output.split('\n')
  const files = []

  // Git pull --stat genera righe tipo:  path/to/file.js | 10 +--
  const fileLineRegex = /^\s+(.+)\s+\|\s+(\d+)\s+(.+)$/

  for (let line of lines) {
    let match = line.match(fileLineRegex)
    if (match) {
      let name = match[1].trim()
      let totalChanges = match[2]
      let plusMinus = match[3]

      let ins = (plusMinus.match(/\+/g) || []).length
      let del = (plusMinus.match(/-/g) || []).length

      files.push({ name, ins, del })
    }
  }
  return files
}

handler.help = ['aggiorna']
handler.tags = ['creatore']
handler.command = ['aggiorna', 'update', 'aggiornabot']

export default handler