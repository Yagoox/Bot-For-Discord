const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

//      Criaçao Embed
const embedInfotBot = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Informações CipherBot')
	.setDescription('O CipherBot é um bot multifuncional para Discord, projetado para fornecer uma ampla gama de funcionalidades essenciais para o seu servidor. Desde funções básicas até as mais complexas, o CipherBot tem como objetivo ser uma solução completa para aprimorar a experiência do seu servidor.')
	.setThumbnail('https://i.postimg.cc/yYXtx2X0/Whats-App-Image-2024-03-11-at-7-20-53-PM.jpg')

//      Exportando e criando slashcommand
module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("Informações do CipherBot"),
    async execute(interaction) {

        const criar_canal = new ButtonBuilder()
        .setCustomId('Ver Mais')
        .setLabel('Criar Call')
        .setStyle(ButtonStyle.Link);

        const row = new ActionRowBuilder()
        .addComponents(criar_canal);

        await interaction.reply({
            content: '',
            embeds: [embedInfotBot],
            components: [row],
            ephemeral: true
        });
    }
}