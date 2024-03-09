const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config()

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
    console.log(process.env.TOKEN);
});


client.login("MTIxMDQ3Mzk0NDc1MTI4MDE2OA.GBqMtX.ZQMAxXLevBOLq3qjmGmerMcv525jdb-RuNxPJ8");