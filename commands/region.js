"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Region = void 0;
const command_1 = require("./command");
const countries_1 = require("../systems/countries");
const localization_1 = require("../systems/localization");
const database_1 = require("../systems/database");
exports.Region = {
    name: "region",
    description: "Sets your region",
    options: [
        {
            name: "region",
            description: "The region",
            required: true,
            type: command_1.COMMAND_TYPES.STRING
        }
    ],
    run: async (client, interaction) => {
        const region = interaction.options.get("region", true)?.value?.toString().toLowerCase();
        if (countries_1.CountryManager.Countries.get(region) == null) {
            await interaction.followUp(localization_1.Localization.LocSystem.get("region_code_not_found", interaction.locale));
            return;
        }
        await database_1.Database.DBSystem.setRegion(interaction.user.id, region);
        await interaction.followUp(localization_1.Localization.LocSystem.get("set_region", interaction.locale).replace("[1]", countries_1.CountryManager.Countries.get(region).name));
    }
};
