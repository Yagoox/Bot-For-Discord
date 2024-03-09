const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config();
const token = process.env.TOKEN;


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});


client.on('ready', (c) => {

    console.log(`✅ ${c.user.tag} is online.`);
    console.log(token);
});


client.login(token);