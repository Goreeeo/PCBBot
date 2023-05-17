import { Client, CommandInteraction, Snowflake } from "discord.js";
import { COMMAND_TYPES, Command } from "./command";
import { Database } from "../systems/database";
import { Localization } from "../systems/localization";

export const AddTest: Command = {
    name: "add-test",
    description: "Add a test to your profile.",
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
        {
            name: "link",
            description: "The link",
            type: COMMAND_TYPES.STRING,
            required: true
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const test: Number = interaction.options.get("test", true).value as Number;
        const link: String = interaction.options.get("link", true).value as String;
        switch (test) {
            case 0:
                if (!link.toLowerCase().startsWith("https://quark88.github.io/dozenvalues/results.html") && !link.toLowerCase().startsWith("quark88.github.io/dozenvalues/results.html")) {
                    await interaction.followUp(Localization.LocSystem.get("invalid_dozen", interaction.locale));
                    return;
                }
                if (!link.toLowerCase().includes("score")) {
                    await interaction.followUp(Localization.LocSystem.get("invalid_dozen", interaction.locale));
                    return;
                }
                await interaction.followUp(Localization.LocSystem.get("successful_dozen", interaction.locale));
                await Database.DBSystem.addDozen(interaction.user.id as String, link);
                break;
            case 1:
                if (!link.toLowerCase().startsWith("https://sapplyvalues.github.io/results.html?") && !link.toLowerCase().startsWith("sapplyvalues.github.io/results.html?") && !link.toLowerCase().startsWith("https://sapplyvalues.github.io/feedback.html?") && !link.toLowerCase().startsWith("sapplyvalues.github.io/feedback.html?")) {
                    await interaction.followUp(Localization.LocSystem.get("invalid_sapply", interaction.locale));
                    return;
                }
                if (!link.toLowerCase().includes("right") || !link.toLowerCase().includes("auth") || !link.toLowerCase().includes("prog")) {
                    await interaction.followUp(Localization.LocSystem.get("invalid_sapply", interaction.locale));
                    return;
                }
                await interaction.followUp(Localization.LocSystem.get("successful_sapply", interaction.locale));
                await Database.DBSystem.addSapply(interaction.user.id as String, link);
                break;
            case 2:
                if (!link.toLowerCase().startsWith("https://rayz9989.github.io/econvaluesrestore/results.html?") && !link.toLowerCase().startsWith("rayz9989.github.io/econvaluesrestore/results.html?")) {
                    await interaction.followUp(Localization.LocSystem.get("invalid_econ", interaction.locale));
                    return;
                }
                if (!link.toLowerCase().includes("equi") || !link.toLowerCase().includes("hori") || !link.toLowerCase().includes("dema") && !link.toLowerCase().includes("cent") && !link.toLowerCase().includes("auto") && !link.toLowerCase().includes("comm") && !link.toLowerCase().includes("birt") && !link.toLowerCase().includes("unio")) {
                    await interaction.followUp(Localization.LocSystem.get("invalid_econ", interaction.locale));
                    return;
                }
                await interaction.followUp(Localization.LocSystem.get("successful_econ", interaction.locale));
                await Database.DBSystem.addEcon(interaction.user.id as String, link);
                break;
            case 3:
                if (!link.toLowerCase().startsWith("https://8values.github.io/results.html?") && !link.toLowerCase().startsWith("8values.github.io/results.html?")) {
                    await interaction.followUp(Localization.LocSystem.get("invalid_eight", interaction.locale));
                    return;
                }
                if (!link.toLowerCase().includes("e") || !link.toLowerCase().includes("d") || !link.toLowerCase().includes("g") && !link.toLowerCase().includes("s")) {
                    await interaction.followUp(Localization.LocSystem.get("invalid_eight", interaction.locale));
                    return;
                }
                await interaction.followUp(Localization.LocSystem.get("successful_eight", interaction.locale));
                await Database.DBSystem.addEight(interaction.user.id as String, link);
                break;
            case 4:
                if (!link.toLowerCase().startsWith("https://www.politicalcompass.org/analysis2?") && !link.toLowerCase().startsWith("www.politicalcompass.org/analysis2?")) {
                    await interaction.followUp(Localization.LocSystem.get("invalid_political_compass", interaction.locale));
                    return;
                }
                if (!link.toLowerCase().includes("ec") || !link.toLowerCase().includes("soc")) {
                    await interaction.followUp(Localization.LocSystem.get("invalid_political_compass", interaction.locale));
                    return;
                }
                await interaction.followUp(Localization.LocSystem.get("successful_political_compass", interaction.locale));
                await Database.DBSystem.addPC(interaction.user.id as String, link);
                break;
            case 5:
                if (!link.startsWith("http://leepicsevrer.de/tests/CulturalValues/results.html?") && !link.startsWith("leepicsevrer.de/tests/CulturalValues/results.html?")) {
                    await interaction.followUp(Localization.LocSystem.get("invalid_cultural_values", interaction.locale));
                    return;
                }
                if (
                    !link.toLowerCase().includes("v1") ||
                    !link.toLowerCase().includes("v3") ||
                    !link.toLowerCase().includes("v5") ||
                    !link.toLowerCase().includes("v7") ||
                    !link.toLowerCase().includes("v9") ||
                    !link.toLowerCase().includes("v11") ||
                    !link.toLowerCase().includes("v13") ||
                    !link.toLowerCase().includes("v15") ||
                    !link.toLowerCase().includes("v17") ||
                    !link.toLowerCase().includes("v19") ||
                    !link.toLowerCase().includes("v21") ||
                    !link.toLowerCase().includes("v23")
                ) {
                    await interaction.followUp(Localization.LocSystem.get("invalid_cultural_values", interaction.locale));
                    return;
                }
                await interaction.followUp(Localization.LocSystem.get("successful_cultural_values", interaction.locale));
                await Database.DBSystem.addCultural(interaction.user.id as String, link);
                break;
            default:
                await interaction.followUp(Localization.LocSystem.get("invalid_test", interaction.locale));
                break;
        }
    }
}