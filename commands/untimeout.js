const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, time, Permissions } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("untimeout")
        .setDescription("Desmutar úsuario especifico")
        .addUserOption(option => option.setName('usuario').setDescription('Úsuario que recebera untimeout!').setRequired(true))
        .addStringOption(option => option.setName('motivo').setDescription('Motivo do untimeout').setRequired(true)),

    async execute(interaction) {

        const tempoUsuario = interaction.options.getUser('usuario')
        const tempoMember = await interaction.guild.members.fetch(tempoUsuario.id);


        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))  return await interaction.reply({ content: `Você nao tem permissão para utulizar este comando!`, ephemeral: true});

        if (!tempoMember) return await interaction.reply({content: `Este membro não faz mais parte do servidor!`, ephemeral: true});

        if (interaction.member.id === tempoMember) return await interaction.reply({ content: `Não posso aplciar untimeout em você mesmo!`, ephemeral: true});

        if (!interaction.member || !interaction.member.permissions || !interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return await interaction.reply({ content: `Você nao tem permissão para utulizar este comando!`, ephemeral: true});
        }
   
        const motivo = interaction.options.getString('motivo') || 'Nehuma razão dada'
        await  tempoMember.timeout(null, motivo);

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Aviso Mute')
            .setAuthor({ name: 'CipherBot', iconURL: 'https://i.postimg.cc/yYXtx2X0/Whats-App-Image-2024-03-11-at-7-20-53-PM.jpg'})
            .setDescription(`Você removeu TimeOut do usuario **@${tempoUsuario}**.`)

        const embedDM = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Aviso Mute')
            .setAuthor({ name: 'CipherBot', iconURL: 'https://i.postimg.cc/yYXtx2X0/Whats-App-Image-2024-03-11-at-7-20-53-PM.jpg'})
            .setDescription(`Você foi desmutado no servidor **${interaction.guild.name}**.`)
            .addFields({ name: 'Motivo', value: motivo })

        await tempoMember.send({ embeds: [embedDM]}).catch(err => {

            return;
        })

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}