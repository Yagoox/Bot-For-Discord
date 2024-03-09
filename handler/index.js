import { Client, IntentsBitField } from 'discord.js';
import { RegistrySlash, CollectionSlashs } from '../utils/loaders.js';
import dotenv from 'dotenv';
dotenv.config();
const token = process.env.TOKEN;


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});


client.on('ready', async (c) => {

    await RegistrySlash(self.application.id)
    console.log(`✅ ${c.user.tag} is online.`);
});

client.on("interactionCreate", async (interaction) => {

    if (interaction.isChatInputCommand()) {

        try {

            const commandName = interaction.commandName
            await CollectionSlashs.get(`${commandName}`)(interaction)
        } catch (err) {

            console.error(err)
        }
    }
})

client.login(token);