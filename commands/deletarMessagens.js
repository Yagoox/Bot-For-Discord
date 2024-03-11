const { SlashCommandBuilder } = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("-")
        .setDescription("Limpar quantia de Mensagens")
        .addStringOption(option => 
			option.setName('quantidade')
				.setDescription('Quantidade de mensagens para deletar')
				.setRequired(true)),
    async execute(interaction) {
        const quantidade = interaction.options.getInteger('quantidade');

        if ( quantidade <= 0 ) {
            return interaction.reply("Você precisa colocar um número valido!")
        }

        const fetched = await interaction.channel.messages.fetch({ limit: quantidade});
        interaction.channel.bulkDelete(fetched)
            .catch(error => interaction.reply(`Não foi possível deletar mensagens devido a: ${error}`));


        await interaction.reply(`Deletado ${quantidade} mensagens.`);
    }
}