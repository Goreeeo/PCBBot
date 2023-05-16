import { Client } from "discord.js";
import { Commands } from "../commandHandler";
import { Localization } from "../systems/localization";
import { Database } from "../systems/database";
import { CountryManager } from "../systems/countries";

export default (client: Client): void => {
    client.on("ready", async() => {
        if (!client.user || !client.application) {
            return;
        }

        client.user.setActivity("/help for help.");

        await Database.DBSystem.init();
        Localization.LocSystem.init();
        CountryManager.Countries.init();

        await client.application.commands.set(Commands);

        console.log(`${client.user.username} is online.`);
    });
};