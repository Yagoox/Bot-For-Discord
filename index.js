const { Client, Events, GatewayIntentBits, Collection, NewsChannel, PermissionOverwrites, ChannelType, PermissionsBitField, IntentsBitField } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const dotenv = require('dotenv');
const { channel } = require('node:diagnostics_channel');
dotenv.config();

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const fs = require("node:fs");
const { type } = require('node:os');
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

client.commands = new Collection()

for (const file of commandFiles) {

    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ("data" in command && "execute" in command) {

        client.commands.set(command.data.name, command)
    } else {

        console.log(`Esse comando em ${filePath} esta com "data" ou "execute ausente"`)
    }
}

client.once('ready', async (c) => {

    console.log(`✅ ${c.user.tag} is online.`);
});

try {
    console.log(`Iniciando login com o token: ${TOKEN}`);
    client.login(TOKEN);
} catch (err) {

    console.error(`Erro ao fazer login: ${err.message}`);
}

client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.log("Comando não encontrado");
            return;
        }
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "Houve um erro ao tentar executar este comando!", ephemeral: true });
        }

        
    }

    else if (interaction.isButton()) {
        if (interaction.customId === 'criar_canal') {
            await interaction.deferReply({ ephemeral: true});

            const randomId = Math.floor(Math.random() * 10000)
            const emoji = '🔹';
            const categoryId = '1209349551169998881'
            const channelName = `${emoji} Interagindo-${randomId}`

            const channel = await interaction.guild.channels.create({
                name: channelName,
                type: ChannelType.GuildVoice,
                position: 2147483647,
                parent:categoryId,
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel],
                    },
                ],
            });

            await interaction.followUp(`Canal criado <#${channel.id}>. Clique para entrar na call.`);

            setTimeout(async () => {

                if (channel.members.size === 0 ) {
                    await channel.delete();
                    console.log(`Canal ${channelName} foi excluído porque estava vazio.`);
                }
            }, 60000);
        }
    }  
});