const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, time, Permissions } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("Mutar úsuario especifico, enviando embed Privado")
        .addUserOption(option => option.setName('usuario').setDescription('Úsuario que recebera timeout!').setRequired(true))
        .addStringOption(option => option.setName('tempo').setRequired(true).setDescription('Duração timeout').addChoices(
            { name: '60 Segundos', value: '60' },
            { name: '2 Minutos', value: '120' },
            { name: '5 Minutos', value: '300' },
            { name: '10 Minutos', value: '600' },
            { name: '20 Minutos', value: '1200' },
            { name: '30 Minutos', value: '1800' },
            { name: '45 Minutos', value: '2700' },
            { name: '1 Hora', value: '3600' },
            { name: '2 Horas', value: '7200' },
            { name: '3 Horas', value: '10800' },
            { name: '5 Horas', value: '18000' },
            { name: '10 Horas', value: '36000' },
            { name: '1 Dia', value: '86400' },
            { name: '2 Dias', value: '172800' },
            { name: '3 Dias', value: '259200' },
            { name: '5 Dias', value: '432000' },
            { name: '1 Semana', value: '604806' },
        ))
        .addStringOption(option => option.setName('motivo').setDescription('Motivo do timeout')),

    async execute(interaction) {

        const tempoUsuario = interaction.options.getUser('usuario')
        const tempoMember = await interaction.guild.members.fetch(tempoUsuario.id);
        const duracao = interaction.options.getString('tempo')

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))  return await interaction.reply({ content: `Você nao tem permissão para utilizar este comando!`, ephemeral: true});

        if (!tempoMember) return await interaction.reply({content: `Este membro não faz mais parte do servidor!`, ephemeral: true});

        //if (!tempoMember.kickable) return await interaction.reply({ content: `Eu não posso aplicar untimeout em úsuarios que estao acima de você!`, ephemeral: true});

        if (interaction.member.id === tempoMember) return await interaction.reply({ content: `Não posso aplciar timeout em você mesmo!`, ephemeral: true});

        if (!interaction.member || !interaction.member.permissions || !interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return await interaction.reply({ content: `Você nao tem permissão para utilizar este comando!`, ephemeral: true});
        }
   

        const motivo = interaction.options.getString('motivo') || 'Nehuma razão dada'

        await  tempoMember.timeout(duracao * 1000);

            const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Aviso Mute')
            .setAuthor({ name: 'CipherBot', iconURL: 'https://i.postimg.cc/yYXtx2X0/Whats-App-Image-2024-03-11-at-7-20-53-PM.jpg'})
            .setDescription(`Você aplicou TimeOut no úsuario **@${tempoUsuario}** por ${duracao / 60} minutos.`)

        const embedDM = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Aviso Mute')
            .setAuthor({ name: 'CipherBot', iconURL: 'https://i.postimg.cc/yYXtx2X0/Whats-App-Image-2024-03-11-at-7-20-53-PM.jpg'})
            .setDescription(`Você foi mutado no servidor **${interaction.guild.name}**.`)
            .addFields({ name: 'Motivo', value: motivo })
            .addFields({ name: 'Tempo de Mute', value: `${duracao / 60} minutos` });

        await tempoMember.send({ embeds: [embedDM]}).catch(err => {

            return;
        })

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
}