import { Client, CommandInteraction } from "discord.js";
import { COMMAND_TYPES, Command } from "./command";
import { Database } from "../systems/database";
import { Localization } from "../systems/localization";

export const Pronouns: Command = {
    name: "pronouns",
    description: "Sets your pronouns.",
    options: [
        {
            type: COMMAND_TYPES.STRING,
            name: "pronouns",
            description: "Your pronouns",
            required: true
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const pronouns: String = interaction.options.get("pronouns", true)?.value as String;

        await Database.DBSystem.setPronouns(interaction.user.id as String, pronouns);
        await interaction.followUp(Localization.LocSystem.get("successful_pronouns", interaction.locale).replace("[1]", pronouns as string));
    }
}