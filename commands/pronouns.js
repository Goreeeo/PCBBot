"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pronouns = void 0;
const command_1 = require("./command");
const database_1 = require("../systems/database");
const localization_1 = require("../systems/localization");
exports.Pronouns = {
    name: "pronouns",
    description: "Sets your pronouns.",
    options: [
        {
            type: command_1.COMMAND_TYPES.STRING,
            name: "pronouns",
            description: "Your pronouns",
            required: true
        }
    ],
    run: async (client, interaction) => {
        const pronouns = interaction.options.get("pronouns", true)?.value;
        await database_1.Database.DBSystem.setPronouns(interaction.user.id, pronouns);
        await interaction.followUp(localization_1.Localization.LocSystem.get("successful_pronouns", interaction.locale).replace("[1]", pronouns));
    }
};
