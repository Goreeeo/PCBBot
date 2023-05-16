import { Client, CommandInteraction } from "discord.js";
import { COMMAND_TYPES, Command } from "./command";
import { CountryManager } from "../systems/countries";
import { Localization } from "../systems/localization";
import { Database } from "../systems/database";

export const Region: Command = {
    name: "region",
    description: "Sets your region",
    options: [
        {
            name: "region",
            description: "The region",
            required: true,
            type: COMMAND_TYPES.STRING
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const region: string = interaction.options.get("region", true)?.value?.toString().toLowerCase() as string;
        
        if (CountryManager.Countries.get(region) == null) {
            await interaction.followUp(Localization.LocSystem.get("region_code_not_found", interaction.locale));
            return;
        } 

        await Database.DBSystem.setRegion(interaction.user.id, region);
        await interaction.followUp(Localization.LocSystem.get("set_region", interaction.locale).replace("[1]", CountryManager.Countries.get(region).name as string));
    }
}