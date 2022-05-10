const fs = require("node:fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const config = require("./config.json");

const commands = [];

const commandFiles = fs
    .readdirSync("./Commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(config.discord.token);

rest.put(Routes.applicationCommands(config.discord.clientID), { body: commands })
    .then(() => console.log("Commands created."))
    .catch(console.error);
