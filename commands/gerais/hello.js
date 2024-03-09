import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("hello_world")
    .setDescription("Comando teste")
    .toJSON()

export async function execute(interecation) {

    interecation.reply({content: `hello ${interecation.user}`})
}