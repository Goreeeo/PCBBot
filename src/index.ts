import { Client, IntentsBitField } from "discord.js";
import * as dotenv from "dotenv";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import { Database } from "./systems/database";
dotenv.config();

console.log("Bot is starting...");

export let isTesting: boolean = false;
const intents = new IntentsBitField();
intents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers);
const client = new Client({
    intents
});

ready(client);
interactionCreate(client);

if (isTesting) {
    client.login(process.env.TEST_BOT_TOKEN);
} else {
    client.login(process.env.BOT_TOKEN);
}

process.once("SIGTERM", () => {
    Database.DBSystem.close();
});

process.once("SIGINT", () => {
    Database.DBSystem.close();
});