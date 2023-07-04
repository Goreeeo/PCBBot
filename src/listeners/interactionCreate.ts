import { Client, Interaction, CommandInteraction } from "discord.js";
import { Commands } from "../commandHandler";

export default (client: Client): void => {
    client.on("interactionCreate",async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenuCommand()) {
            await handleSlashCommand(client, interaction);
        } 
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const slashCommand = Commands.find(c => c.name == interaction.commandName);
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