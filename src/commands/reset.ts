import { COMMAND_TYPES, Command } from "./command";
import { Database } from "../systems/database";
import { Localization } from "../systems/localization";

export const Reset: Command = {
    name: "reset",
    description: "Reset your data.",
    run: async (client, interaction) => {
        const userId: String = interaction.user.id as String;

        await Database.DBSystem.clear(userId);

        await interaction.followUp("Successfully removed your data.");
    },
}

export const RemoveTest: Command = {
    name: "remove-test",
    description: "Remove a test from your profile.",
    options: [
        {
            name: "test",
            description: "The test to add",
            type: COMMAND_TYPES.INTEGER,
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
        const userId: String = interaction.user.id as String;
        const test: Number = interaction.options.get("test", true).value as Number;

        let invalid = false;

        switch(test) {
            case 0: await Database.DBSystem.addDozen(userId, ""); break;
            case 1: await Database.DBSystem.addSapply(userId, ""); break;
            case 2: await Database.DBSystem.addEcon(userId, ""); break;
            case 3: await Database.DBSystem.addEight(userId, ""); break;
            case 4: await Database.DBSystem.addPC(userId, ""); break;
            case 5: await Database.DBSystem.addCultural(userId, ""); break;
            default:
                invalid = true;
                await interaction.followUp(Localization.LocSystem.get("invalid_test", interaction.locale));
                break;
        }

        if (!invalid) {
            await interaction.followUp("Successfully removed test.");
        }
    }
}