const { Client, IntentsBitField } = require("discord.js")

const Client = new Client({
    Intents: 33349,
});

Client.onLine('ready', (c) => {
    console.log("I'am Ready")

})

Client.login(
    "MTIxMDQ3Mzk0NDc1MTI4MDE2OA.GzRIQx.D2HAPg1QDS9ZRy67mziMlUbqos71s2f7CX0WdI"
);