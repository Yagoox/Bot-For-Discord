const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField, time, Permissions } = require("discord.js")

module.exports = {

    data: new SlashCommandBuilder()
        .setName("mutarjogador")
        .setDescription("Mutar jogador especifico")
        .addStringOption(option =>
            option.setName('usuario')
                .setDescription('O ID do usuário que será mutado')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('motivo')
                .setDescription('O motivo do mute')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('tempo')
                .setDescription('O tempo do mute em minutos')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

    async execute(interaction) {

        const member = interaction.member;

        const usuarioID = interaction.options.getString('usuario').replace(/[<@>]/g, '');
        const usuario = await interaction.guild.members.fetch(usuarioID);
        const motivo = interaction.options.getString('motivo');
        const tempo = interaction.options.getInteger('tempo');


        //      Se o usuario nao for encontrado
        if (!usuario) {

            console.log(`Usuário não encontrado: ${interaction.options.getString('usuario')}`);
            return;
        }

        //      Verificaçao se o cargo "Muted" existe
        let role = interaction.guild.roles.cache.find(r => r.name === 'Muted');
        if (!role) {

            //      Se nao existir cria o cargo "Muted"
            role = await interaction.guild.roles.create({
                name: 'Muted',
                color: '#6b0000',
                permissions: [ PermissionsBitField.Flags.ViewChannel ]
            });

            //      Configura o cargo "Muted" em todos os canais para que apenas veja mensagens mais nada
            interaction.guild.channels.cache.forEach(async (channel) => {
                try {
                    const permissions = {
                        VIEW_CHANNEL: true,
                        SEND_MESSAGES: false, // Desabilita o envio de mensagens em canais de texto
                        SPEAK: false, // Desabilita a fala em canais de voz
                        ADD_REACTIONS: false, // Opcional: desabilita adicionar reações
                        CREATE_INSTANT_INVITE: false, // Opcional: desabilita a criação de convites
                        SEND_TTS_MESSAGES: false, // Opcional: desabilita mensagens TTS (Text-To-Speech)
                    };
            
                    // Checa o tipo do canal e aplica as permissões apropriadas
                    if (channel.type === 'GUILD_TEXT' || channel.type === 'GUILD_VOICE' || channel.type === 'GUILD_NEWS') {
                        await channel.permissionOverwrites.create(role, permissions);
                    }
                } catch (error) {
                    console.error(`Erro ao configurar permissões no canal ${channel.name}:`, error);
                }
            });
        }

        //      Muta o membro
        await usuario.roles.add(role);
        setTimeout(() => {

            usuario.roles.remove(role).catch(console.error)
        }, tempo * 60 * 1000);

        //      Cria a Embed
        const embedInfotBot = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Aviso Mute')
            .setAuthor({ name: 'CipherBot', iconURL: 'https://i.postimg.cc/yYXtx2X0/Whats-App-Image-2024-03-11-at-7-20-53-PM.jpg'})
            .setDescription(`Você foi mutado no servidor **${member.guild.name}**.`)
            .addFields({ name: 'Motivo', value: motivo })
            .addFields({ name: 'Tempo de Mute', value: `${tempo} minutos` });

        try {

            await interaction.reply({ embeds: [embedInfotBot], ephemeral: true });
        } catch (error) {

            console.error('Erro ao responder à interação:', error);
        }
    }
}