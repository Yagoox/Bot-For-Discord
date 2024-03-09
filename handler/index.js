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

client.on('messageCreate', message => {

    console.log(`Mensagem recebida: ${message.content} de ${message.author.tag}`);

});

//    TESTE

// client.on('messageCreate', message => {
   // if (message.content.startsWith('/')) {
       // console.log(`Comando recebido: ${message.content} de ${message.author.tag}`);
       // message.reply("fala")
                    // retirar 1 letra da mensagem "/"
     //  const command = message.content.slice(1);
    //}
//});

client.once('ready', async (c) => {

    console.log(`Iniciando o registro de comandos slash para o ID: ${client.application.id}`);
    try {

        await RegistrySlash(client.application.id);
        console.log(`✅ ${c.user.tag} is online.`);
    } catch (err) {

        console.error(`Erro ao registrar comandos slash: ${err.message}`);
    }
});

client.on("interactionCreate", async (interaction) => {

    console.log(`Interação recebida: ${interaction.commandName}`);
    if (interaction.isChatInputCommand()) {

        try {

            const commandName = interaction.commandName;
            console.log(`Executando comando: ${commandName}`);
            await CollectionSlashs.get(`${commandName}`)(interaction);
        } catch (err) {

            console.error(`Erro ao executar comando ${interaction.commandName}: ${err.message}`);
        }
    } else {

        console.log(`Interação não é um comando de chat: ${interaction.commandName}`);
    }
});

try {

    console.log(`Iniciando login com o token: ${token}`);
    client.login(token);
} catch (err) {

    console.error(`Erro ao fazer login: ${err.message}`);
}
