const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, Events, Client, ChannelType, PermissionsBitField } = require('discord.js');

// Criação Embed'
const embedInfotBot = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('ChipherBot')
    .setDescription('Crie um canal privado para interagir com os seus amigos.')
    .setImage('https://i.postimg.cc/yYXtx2X0/Whats-App-Image-2024-03-11-at-7-20-53-PM.jpg')

// Exportando e criando slashcommand
module.exports = {
    data: new SlashCommandBuilder()
        .setName("criarcanal")
        .setDescription("Crie um canal de voz."),
    async execute(interaction) {

        const criar_canal = new ButtonBuilder()
            .setCustomId('criar_canal')
            .setLabel('Criar Call')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
            .addComponents(criar_canal);

        await interaction.reply({
            content: '',
            embeds: [embedInfotBot],
            components: [row]
        });
    }
}
