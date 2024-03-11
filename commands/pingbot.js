const { SlashCommandBuilder } = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping do CipherBot"),
    async execute(interaction) {
        await interaction.reply(`O ping do CipherBot está em ${client.ws.ping}ms.`)
    }
}