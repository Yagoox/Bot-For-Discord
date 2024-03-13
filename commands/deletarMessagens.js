const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js")



//      Exportando e criando slashcommand
module.exports = {

    data: new SlashCommandBuilder()
        .setName("limpar")
        .setDescription("Limpar quantia de Mensagens")
        .addIntegerOption(option =>
            option.setName('quantidade')
                .setDescription('Quantidade de mensagens para deletar')
                .setRequired(true)),

    async execute(interaction) {
        //      Interaçao com com o slashcommand
        const quantidade = interaction.options.getInteger('quantidade');
        const member = interaction.member;

        if (member.permissions.has(PermissionsBitField.Flags.Administrator)) 
        {

            if (quantidade <= 0) {
                return interaction.reply("Você precisa colocar um número valido!")
            }
            //      Tratamento de erro devido a APi nao deixar excluir mensagem de +14 dias atras
            try {

                const fetched = await interaction.channel.messages.fetch({ limit: quantidade });

                await interaction.channel.bulkDelete(fetched);
                
                //      Criaçao Embed
                const embedInfotBot = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setAuthor({ name: 'ChiperBot', url: 'https://i.postimg.cc/yYXtx2X0/Whats-App-Image-2024-03-11-at-7-20-53-PM.jpg' })
                    .setDescription(`O canal de texto ${interaction.channel} teve ${quantidade} mensagens deletadas por ${interaction.user.username}`)

                await interaction.reply({ embeds: [embedInfotBot] });

            } catch (error) {

                console.error(error);
                await interaction.reply(`Não foi possível deletar mensagens devido a: ${error}`);
            }
    } else {

        await interaction.reply("Você nao tem permissão para utilizar este comando!")
    }
  }
}
