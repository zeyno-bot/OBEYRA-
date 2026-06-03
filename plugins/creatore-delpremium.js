const handler = async (m, {conn, text, usedPrefix, command}) => {
  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else who = m.chat;

  if (!who) return m.reply(`⚠️ *Istruzioni:* Tagga l'utente o rispondi a un suo messaggio per rimuovere il Premium.`);

  const user = global.db.data.users[who];
  if (!user) return m.reply(`❌ L'utente non è presente nel database di *Obeyra Bot*.`);

  // Controllo se è effettivamente premium
  if (!user.premium && (user.premiumTime === 0 || !user.premiumTime)) {
    return m.reply(`🥷 L'utente @${who.split('@')[0]} non possiede attualmente alcun abbonamento *Premium* 👑`, null, { mentions: [who] });
  }

  // Reset dei valori
  user.premiumTime = 0;
  user.premium = false;

  const textdelprem = `◢◤ [ 𝘚𝘜𝘉𝘚𝘊𝘙𝘐𝘗𝘛𝘐𝘖𝘕 _ 𝘛𝘌𝘙𝘔𝘐𝘕𝘈𝘛𝘌𝘋 ] ── ❌
 ───────────────────────────────────────
  ⚠️ 𝘚𝘠𝘚𝘛𝘌𝘔_𝘜𝘗𝘋𝘈𝘛𝘌:
  ├── ❌ 𝘚𝘵𝘢𝘵𝘶𝘴 : Premium Revocato
  ├── 👤 𝘜𝘵𝘦𝘯𝘵𝘦: @${who.split('@')[0]}
  └── ⚖️ 𝘎𝘳𝘢𝘥𝘰 : Downgrade a Utente Standard
 ─────────────────────────────────────── ☣
  *STATUS: ACCOUNT AGGIORNATO*`;
  `;

  await m.reply(textdelprem, null, { mentions: [who] });
};

handler.help = ['delprem <@user>'];
handler.tags = ['creatore'];
// Supporta: .delpremium, .-premium, .removepremium
handler.command = /^(remove|-|del)prem$/i;
handler.group = true;
handler.owner = true; // Solo l'owner può togliere i privilegi premium

export default handler;
