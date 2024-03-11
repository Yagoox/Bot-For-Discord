const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName("limpar")
        .setDescription("Limpar quantia de Mensagens")
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('Quantidade de mensagens para deletar')
                .setRequired(true)),

    async execute(interaction) {

        const quantidade = interaction.options.getInteger('quantidade');
        if (quantidade <= 0) {
            return interaction.reply("Você precisa colocar um número valido!")
        }

        try {

            const fetched = await interaction.channel.messages.fetch({ limit: quantidade });

            await interaction.channel.bulkDelete(fetched);
            await interaction.reply(`Deletado ${quantidade} mensagens.`);
        } catch (error) {

            console.error(error);
            await interaction.reply(`Não foi possível deletar mensagens devido a: ${error}`);
        }
    }
}
