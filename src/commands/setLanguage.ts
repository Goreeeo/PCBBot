import { Client, CommandInteraction, PermissionsBitField } from "discord.js";
import { COMMAND_TYPES, Command } from "./command";

export const SetLanguage: Command = {
    name: "set-language",
    description: "Force the bot's localization to be in a certain language on this server.",
    defaultMemberPermissions: PermissionsBitField.Flags.Administrator,
    options: [
        {
            name: "language",
            description: "The language you want to force.",
            type: COMMAND_TYPES.STRING,
            required: true
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        ///TODO: Add Set Language Feature
    }
}