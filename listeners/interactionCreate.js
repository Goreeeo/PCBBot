"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandHandler_1 = require("../commandHandler");
exports.default = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};
const handleSlashCommand = async (client, interaction) => {
    await interaction.deferReply();
    const slashCommand = commandHandler_1.Commands.find(c => c.name == interaction.commandName);
    if (!slashCommand) {
        return;
    }
    try {
        await slashCommand.run(client, interaction);
    }
    catch (e) {
        console.error(e);
    }
};
