"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Help = void 0;
const commandHandler_1 = require("../commandHandler");
const localization_1 = require("../systems/localization");
exports.Help = {
    name: "help",
    description: "Returns a list of commands.",
    run: async (client, interaction) => {
        let value = "";
        commandHandler_1.Commands.forEach(c => value += localization_1.Localization.LocSystem.get(c.name + "_help", interaction.locale) + "\n");
        await interaction.followUp(value);
    }
};
