const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

const embedInfotBot = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Informações CipherBot')
	.setDescription('O CipherBot é um bot multifuncional para Discord, projetado para fornecer uma ampla gama de funcionalidades essenciais para o seu servidor. Desde funções básicas até as mais complexas, o CipherBot tem como objetivo ser uma solução completa para aprimorar a experiência do seu servidor.')
	.setThumbnail('https://ibb.co/YBKsfRy')

	module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Informações do CipherBot"),
    async execute(interaction) {

        await interaction.reply({ embeds: [embedInfotBot] })
    }
}