"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveTest = exports.Reset = void 0;
const command_1 = require("./command");
const database_1 = require("../systems/database");
const localization_1 = require("../systems/localization");
exports.Reset = {
    name: "reset",
    description: "Reset your data.",
    run: async (client, interaction) => {
        const userId = interaction.user.id;
        await database_1.Database.DBSystem.clear(userId);
        await interaction.followUp("Successfully removed your data.");
    },
};
exports.RemoveTest = {
    name: "remove-test",
    description: "Remove a test from your profile.",
    options: [
        {
            name: "test",
            description: "The test to add",
            type: command_1.COMMAND_TYPES.INTEGER,
            required: true,
            choices: [
                { name: "DozenValues", value: 0 },
                { name: "SapplyValues", value: 1 },
                { name: "EconValues", value: 2 },
                { name: "8Values", value: 3 },
                { name: "Political Compass", value: 4 },
                { name: "CulturalValues", value: 5 }
            ]
        },
    ],
    run: async (client, interaction) => {
        const userId = interaction.user.id;
        const test = interaction.options.get("test", true).value;
        let invalid = false;
        switch (test) {
            case 0:
                await database_1.Database.DBSystem.addDozen(userId, "");
                break;
            case 1:
                await database_1.Database.DBSystem.addSapply(userId, "");
                break;
            case 2:
                await database_1.Database.DBSystem.addEcon(userId, "");
                break;
            case 3:
                await database_1.Database.DBSystem.addEight(userId, "");
                break;
            case 4:
                await database_1.Database.DBSystem.addPC(userId, "");
                break;
            case 5:
                await database_1.Database.DBSystem.addCultural(userId, "");
                break;
            default:
                invalid = true;
                await interaction.followUp(localization_1.Localization.LocSystem.get("invalid_test", interaction.locale));
                break;
        }
        if (!invalid) {
            await interaction.followUp("Successfully removed test.");
        }
    }
};
