const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Informações do CipherBot"),

    async execute(interaction) {

        await interaction.reply("Info Bot")
    }
}