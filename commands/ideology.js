"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ideology = void 0;
const tslib_1 = require("tslib");
const command_1 = require("./command");
const database_1 = require("../systems/database");
const localization_1 = require("../systems/localization");
const axios_1 = tslib_1.__importDefault(require("axios"));
const jsdom_1 = require("jsdom");
exports.Ideology = {
    name: "ideology",
    description: "Sets your ideology.",
    options: [
        {
            type: command_1.COMMAND_TYPES.STRING,
            name: "link",
            description: "The link to the PCB/PCBA page.",
            required: true
        }
    ],
    run: async (client, interaction) => {
        const ideology = interaction.options.get("link")?.value;
        if (!ideology.startsWith("https://polcompballanarchy.miraheze.org/wiki/") && !ideology.startsWith("polcompballanarchy.miraheze.org/wiki/") && !ideology.startsWith("https://polcompball.miraheze.org/wiki/") && !ideology.startsWith("polcompball.miraheze.org/wiki/")) {
            await interaction.followUp(localization_1.Localization.LocSystem.get("invalid_ideology", interaction.locale));
            return;
        }
        const res = await axios_1.default.get(ideology);
        if (res.status !== 200) {
            await interaction.followUp(localization_1.Localization.LocSystem.get("polcompball_server_issue", interaction.locale));
            return;
        }
        const dom = new jsdom_1.JSDOM(res.data);
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
        await database_1.Database.DBSystem.setIdeology(interaction.user.id, thumb, ideologyName, ideologyCaption, ideology);
        await interaction.followUp(localization_1.Localization.LocSystem.get("successful_ideology", interaction.locale));
    }
};
