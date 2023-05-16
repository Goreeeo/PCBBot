import { Client, CommandInteraction, PermissionsBitField } from "discord.js";
import { Command } from "./command";
import { CountryManager } from "../systems/countries";

export const Regions: Command = {
    name: "regions",
    description: "Lists all regions",
    defaultMemberPermissions: PermissionsBitField.Flags.Administrator,
    run: async (client: Client, interaction: CommandInteraction) => {
        const countries = CountryManager.Countries.getAll();

        let text = "";
        for (const country in countries) {
            if (text.length >= 1500) {
                await interaction.followUp(text);
                text = "";
            }
            text += `${country} - ${countries[country].name}\n`;
        }

        await interaction.followUp(text);
    }
}