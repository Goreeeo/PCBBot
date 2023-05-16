import { CommandInteraction, Client } from "discord.js";
import { Command } from "./command";
import { Commands } from "../commandHandler";
import { Localization } from "../systems/localization";

export const Help: Command = {
    name: "help",
    description: "Returns a list of commands.",
    run: async (client: Client, interaction: CommandInteraction) => {
        let value: string = "";

        Commands.forEach(c => value += Localization.LocSystem.get(c.name + "_help", interaction.locale) + "\n");

        await interaction.followUp(value);
    }
};