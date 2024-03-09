import { lstatSync, readdirSync } from "fs";
import { REST, Collection, Routes } from "discord.js";

import dotenv from 'dotenv';
dotenv.config();
const token = process.env.TOKEN;

const APICONNECTION = new REST().setToken(token);

const ArraySlashs = [];
export const CollectionSlashs = new Collection();

async function loadSlashCommands(path) {
    for (const files of readdirSync(path)) {
        if (lstatSync(`${path}/${files}`).isDirectory()) {
            loadSlashCommands(`${path}/${files}`);
        } else {
            if (files.endsWith(".js")) {
                const cmd = await import(`.${path}/${files}`);
                if (cmd.data && cmd.execute) {
                    ArraySlashs.push(cmd.data);
                    CollectionSlashs.set(cmd.data.name, cmd.execute);
                }
            }
        }
    }
}

loadSlashCommands("./commands");

export async function RegistrySlash(ID) {
    try {
        const commands = APICONNECTION.put(Routes.applicationCommands(ID), { body: ArraySlashs });
        console.log(`Eu registrei ${commands.length} SlashCommands`);
    } catch (err) {
        console.error(err);
    }
}
