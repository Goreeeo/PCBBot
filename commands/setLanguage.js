"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetLanguage = void 0;
const discord_js_1 = require("discord.js");
const command_1 = require("./command");
exports.SetLanguage = {
    name: "set-language",
    description: "Force the bot's localization to be in a certain language on this server.",
    defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.Administrator,
    options: [
        {
            name: "language",
            description: "The language you want to force.",
            type: command_1.COMMAND_TYPES.STRING,
            required: true
        }
    ],
    run: async (client, interaction) => {
    }
};
