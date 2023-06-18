"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTesting = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const dotenv = tslib_1.__importStar(require("dotenv"));
const ready_1 = tslib_1.__importDefault(require("./listeners/ready"));
const interactionCreate_1 = tslib_1.__importDefault(require("./listeners/interactionCreate"));
const database_1 = require("./systems/database");
dotenv.config();
console.log("Bot is starting...");
exports.isTesting = false;
const intents = new discord_js_1.IntentsBitField();
intents.add(discord_js_1.IntentsBitField.Flags.Guilds, discord_js_1.IntentsBitField.Flags.GuildMembers);
const client = new discord_js_1.Client({
    intents
});
(0, ready_1.default)(client);
(0, interactionCreate_1.default)(client);
if (exports.isTesting) {
    client.login(process.env.TEST_BOT_TOKEN);
}
else {
    client.login(process.env.BOT_TOKEN);
}
process.once("SIGTERM", () => {
    database_1.Database.DBSystem.close();
});
process.once("SIGINT", () => {
    database_1.Database.DBSystem.close();
});
