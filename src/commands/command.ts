import { CommandInteraction, Client, ChatInputApplicationCommandData } from "discord.js";

export enum COMMAND_TYPES {
    SUBCOMMAND = 1,
    SUBCOMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11
}

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: CommandInteraction) => Promise<void>;
}