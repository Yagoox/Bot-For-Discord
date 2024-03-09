import { lstatSync, readdirSync } from "fs";
import { REST, Collection, Routes } from "discord.js";

import dotenv from 'dotenv';
dotenv.config();
const token = process.env.TOKEN;

const APICONNECTION = new REST().setToken(token);

const ArraySlashs = [];
export const CollectionSlashs = new Collection();

async function loadSlashCommands(path) {
    try {

        const files = readdirSync(path);
        console.log(`Lendo diretório: ${path}`);
        for (const file of files) {

            const fullPath = `${path}/${file}`;
            if (lstatSync(fullPath).isDirectory()) {

                console.log(`Entrando no diretório: ${fullPath}`);
                await loadSlashCommands(fullPath);
            } else {
                if (file.endsWith(".js")) {

                    console.log(`Importando arquivo: ${fullPath}`);
                    const cmd = await import(`.${fullPath}`);
                    if (cmd.data && cmd.execute) {

                        ArraySlashs.push(cmd.data);
                        CollectionSlashs.set(cmd.data.name, cmd.execute);
                        console.log(`Comando Registrado: ${cmd.data.name}`);
                    } else {

                        console.log(`Arquivo ${fullPath} não contém 'data' ou 'execute'`);
                    }
                } else {

                    console.log(`Arquivo ${fullPath} não termina com '.js'`);
                }
            }
        }
    } catch (err) {

        console.error(`Erro ao carregar comandos slash: ${err.message}`);
    }
}

loadSlashCommands("./commands");

export async function RegistrySlash(ID) {
    try {

        console.log(`Registrando comandos slash para o ID: ${ID}`);
        const commands = await APICONNECTION.put(Routes.applicationCommands(ID), { body: ArraySlashs });
        console.log(`Eu registrei ${commands.length} SlashCommands`);
    } catch (err) {
        
        console.error(`Erro ao registrar comandos slash: ${err.message}`);
    }
}
