"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandHandler_1 = require("../commandHandler");
const localization_1 = require("../systems/localization");
const database_1 = require("../systems/database");
const countries_1 = require("../systems/countries");
exports.default = (client) => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            return;
        }
        client.user.setActivity("/help for help.");
        await database_1.Database.DBSystem.init();
        localization_1.Localization.LocSystem.init();
        countries_1.CountryManager.Countries.init();
        await client.application.commands.set(commandHandler_1.Commands);
        console.log(`${client.user.username} is online.`);
    });
};
