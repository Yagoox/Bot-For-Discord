import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()

    .setName("hellow")
    .setDescription("Comando teste")
    .toJSON()

export async function execute(interaction) {

    interaction.reply({content: `hello ${interaction.user}`})
}