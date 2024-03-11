//      Importações
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

//      Permissões
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//      DotEnv
const dotenv = require('dotenv')
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;



//      Importação dos Comandos
const fs = require("node:fs")
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

//      Indentificação de Mensagem
client.on('messageCreate', message => {

    console.log(`Mensagem recebida: ${message.content} de ${message.author.tag}`);

});

//      Verificação bot Online
client.once('ready', async (c) => {

    console.log(`✅ ${c.user.tag} is online.`);

});


//      Verificação Token
try {
    console.log(`Iniciando login com o token: ${TOKEN}`);
    client.login(TOKEN);
} catch (err) {

    console.error(`Erro ao fazer login: ${err.message}`);
}

//      Listener de interaçao

client.on(Events.InteractionCreate, async interaction => {

    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {

        console.log("Comando nao encontrado")
        return
    } try {

        await command.execute(interaction)
    } catch (error) {

        console.error(error)
        await interaction.reply("Houve um erro ao tentar executar este comando!")
    }
});