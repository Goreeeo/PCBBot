import { Client, CommandInteraction } from "discord.js";
import { COMMAND_TYPES, Command } from "./command";
import { Database } from "../systems/database";
import { Localization } from "../systems/localization";
import axios, { AxiosResponse } from "axios";
import { JSDOM } from "jsdom";

export const Ideology: Command = {
    name: "ideology",
    description: "Sets your ideology.",
    options: [
        {
            type: COMMAND_TYPES.STRING,
            name: "link",
            description: "The link to the PCB/PCBA page.",
            required: true
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const ideology: string = interaction.options.get("link")?.value as string;

        if (!ideology.startsWith("https://polcompballanarchy.miraheze.org/wiki/") && !ideology.startsWith("polcompballanarchy.miraheze.org/wiki/") && !ideology.startsWith("https://polcompball.miraheze.org/wiki/") && !ideology.startsWith("polcompball.miraheze.org/wiki/")) {
            await interaction.followUp(Localization.LocSystem.get("invalid_ideology", interaction.locale));
            return;
        }

        const res: AxiosResponse = await axios.get(ideology);
        if (res.status !== 200) {
            await interaction.followUp(Localization.LocSystem.get("polcompball_server_issue", interaction.locale));
            return;
        }

        const dom = new JSDOM(res.data);
        const thumbs = dom.window.document.getElementsByClassName("pi-image-thumbnail");
        let thumb = "";
        if (thumbs[0] != null) {
            thumb = "https:" + thumbs[0].getAttribute("src");
        }

        const ideologyName = dom.window.document.getElementsByClassName("mw-page-title-main")[0].innerHTML;
        const ideologyCaptions = dom.window.document.getElementsByClassName("pi-caption");
        let ideologyCaption = "";
        if (ideologyCaptions != null && ideologyCaptions.length != 0) {
            ideologyCaption = ideologyCaptions[0].innerHTML;
        }

        await Database.DBSystem.setIdeology(interaction.user.id as String, thumb, ideologyName, ideologyCaption, ideology);
        await interaction.followUp(Localization.LocSystem.get("successful_ideology", interaction.locale));
    }
}