"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Regions = void 0;
const discord_js_1 = require("discord.js");
const countries_1 = require("../systems/countries");
exports.Regions = {
    name: "regions",
    description: "Lists all regions",
    defaultMemberPermissions: discord_js_1.PermissionsBitField.Flags.Administrator,
    run: async (client, interaction) => {
        const countries = countries_1.CountryManager.Countries.getAll();
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
};
