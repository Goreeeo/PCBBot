import { Client, CommandInteraction, EmbedBuilder, GuildMember, User } from "discord.js";
import { COMMAND_TYPES, Command } from "./command";
import { Database } from "../systems/database";
import { IUser } from "../schema/userSchema";
import { TestParser } from "../systems/testparser";
import { Localization } from "../systems/localization";

export const DozenValues: Command = {
    name: "dozenvalues",
    description: "Show someone's DozenValues.",
    options: [
        {
            name: "user",
            description: "The User",
            required: false,
            type: COMMAND_TYPES.USER
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const userId: String = (interaction.options.getUser("user", false) ?? interaction.user).id as String;
        const member: GuildMember = (await interaction.guild?.fetch())?.members.cache.get(userId) as GuildMember;
        const user: IUser = await Database.DBSystem.getUserById(userId);

        if (user?.dozenvalues != null) {
            let dv = TestParser.parseDozen(new URL(user.dozenvalues as string));

            if (dv != null) {
                let tdv: number[] = dv as number[];
                const dvEmbed = new EmbedBuilder().setAuthor({ name: member?.nickname ?? interaction.user.username, iconURL: member?.avatarURL() ?? interaction.user.avatarURL() });

                dvEmbed.setTitle("**DozenValues**");
                dvEmbed.addFields(
                    { name: Localization.LocSystem.get("dozen_value_ownership", interaction.locale), value: `${tdv[0]}` },
                    { name: Localization.LocSystem.get("dozen_value_market", interaction.locale), value: `${tdv[1]}`, inline: true },
                    { name: Localization.LocSystem.get("dozen_value_power", interaction.locale), value: `${tdv[2]}`, inline: true },
                    { name: Localization.LocSystem.get("dozen_value_autonomy", interaction.locale), value: `${tdv[3]}` },
                    { name: Localization.LocSystem.get("dozen_value_identity", interaction.locale), value: `${tdv[4]}`, inline: true },
                    { name: Localization.LocSystem.get("dozen_value_progress", interaction.locale), value: `${tdv[5]}`, inline: true },
                    { name: "Link", value: `${user.dozenvalues}` }
                );

                await interaction.followUp({ embeds: [dvEmbed] });
                return;
            }
        }

        await interaction.followUp(Localization.LocSystem.get("no_attached_dozen", interaction.locale));
    }
}

export const SapplyValues: Command = {
    name: "sapplyvalues",
    description: "Shows someone's SapplyValues",
    options: [
        {
            name: "user",
            description: "The User",
            required: false,
            type: COMMAND_TYPES.USER
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const userId: String = (interaction.options.getUser("user", false) ?? interaction.user).id as String;
        const member: GuildMember = (await interaction.guild?.fetch())?.members.cache.get(userId) as GuildMember;
        const user: IUser = await Database.DBSystem.getUserById(userId);

        if (user?.sapplyvalues != null) {
            const sv = TestParser.parseSapply(new URL(user.sapplyvalues as string));

            if (sv != null) {
                const svEmbed = new EmbedBuilder().setAuthor({ name: member?.nickname ?? interaction.user.username, iconURL: member?.avatarURL() ?? interaction.user.avatarURL() });

                svEmbed.setTitle("**SapplyValues**");
                svEmbed.addFields(
                    { name: Localization.LocSystem.get("left_right", interaction.locale), value: `${sv[0]}` },
                    { name: Localization.LocSystem.get("auth_lib", interaction.locale), value: `${sv[1]}`, inline: true },
                    { name: Localization.LocSystem.get("prog_con", interaction.locale), value: `${sv[2]}`, inline: true },
                    { name: "Link", value: `${user.sapplyvalues}` }
                );

                await interaction.followUp({ embeds: [svEmbed] });
                return;
            }
        }

        await interaction.followUp(Localization.LocSystem.get("no_attached_sapply", interaction.locale));
    }
}

export const EconValues: Command = {
    name: "econvalues",
    description: "Shows someone's EconValues",
    options: [
        {
            name: "user",
            description: "The User",
            required: false,
            type: COMMAND_TYPES.USER
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const userId: String = (interaction.options.getUser("user", false) ?? interaction.user).id as String;
        const member: GuildMember = (await interaction.guild?.fetch())?.members.cache.get(userId) as GuildMember;
        const user: IUser = await Database.DBSystem.getUserById(userId);

        if (user?.econvalues != null) {
            const ev = TestParser.parseEcon(new URL(user.econvalues as string));

            if (ev != null) {
                const embed = new EmbedBuilder().setAuthor({ name: member?.nickname ?? interaction.user.username, iconURL: member?.avatarURL() ?? interaction.user.avatarURL() });

                embed.setTitle("**EconValues**");
                embed.addFields(
                    { name: Localization.LocSystem.get("econ_value_incentive", interaction.locale), value: `${ev[0]}` },
                    { name: Localization.LocSystem.get("econ_value_structure", interaction.locale), value: `${ev[1]}`, inline: true },
                    { name: Localization.LocSystem.get("econ_value_intervention", interaction.locale), value: `${ev[2]}`, inline: true },
                    { name: Localization.LocSystem.get("econ_value_centralisation", interaction.locale), value: `${ev[3]}` },
                    { name: Localization.LocSystem.get("econ_value_technology", interaction.locale), value: `${ev[4]}`, inline: true },
                    { name: Localization.LocSystem.get("econ_value_land", interaction.locale), value: `${ev[5]}`, inline: true },
                    { name: Localization.LocSystem.get("econ_value_inheritance", interaction.locale), value: `${ev[6]}` },
                    { name: Localization.LocSystem.get("econ_value_labor", interaction.locale), value: `${ev[7]}`, inline: true },
                    { name: "Link", value: `${user.econvalues}` }
                );

                await interaction.followUp({ embeds: [embed] });
                return;
            }
        }

        await interaction.followUp(Localization.LocSystem.get("no_attached_econ", interaction.locale));
    }
}

export const EightValues: Command = {
    name: "eightvalues",
    description: "Shows someone's 8Values",
    options: [
        {
            name: "user",
            description: "The User",
            required: false,
            type: COMMAND_TYPES.USER
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const userId: String = (interaction.options.getUser("user", false) ?? interaction.user).id as String;
        const member: GuildMember = (await interaction.guild?.fetch())?.members.cache.get(userId) as GuildMember;
        const user: IUser = await Database.DBSystem.getUserById(userId);

        if (user?.eightvalues != null) {
            const ev = TestParser.parseEight(new URL(user.eightvalues as string));

            if (ev != null) {
                const embed = new EmbedBuilder().setAuthor({ name: member?.nickname ?? interaction.user.username, iconURL: member?.avatarURL() ?? interaction.user.avatarURL() });

                embed.setTitle("**8Values**");
                embed.addFields(
                    { name: Localization.LocSystem.get("eight_value_economic", interaction.locale), value: `${ev[0]}` },
                    { name: Localization.LocSystem.get("eight_value_diplomacy", interaction.locale), value: `${ev[1]}`, inline: true },
                    { name: Localization.LocSystem.get("eight_value_civil", interaction.locale), value: `${ev[2]}`, inline: true },
                    { name: Localization.LocSystem.get("eight_value_societal", interaction.locale), value: `${ev[3]}`, inline: true },
                    { name: "Link", value: `${user.eightvalues}` }
                );

                await interaction.followUp({ embeds: [embed] });
                return;
            }
        }

        await interaction.followUp(Localization.LocSystem.get("no_attached_eight", interaction.locale));
    }
}

export const CulturalValues: Command = {
    name: "culturalvalues",
    description: "Shows someone's CulturalValues",
    options: [
        {
            name: "user",
            description: "The User",
            required: false,
            type: COMMAND_TYPES.USER
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const userId: String = (interaction.options.getUser("user", false) ?? interaction.user).id as String;
        const member: GuildMember = (await interaction.guild?.fetch())?.members.cache.get(userId) as GuildMember;
        const user: IUser = await Database.DBSystem.getUserById(userId);

        if (user?.culturalvalues != null) {
            const cv = TestParser.parseCultural(new URL(user.culturalvalues as string));

            if (cv != null) {
                const embed = new EmbedBuilder().setAuthor({ name: member?.nickname ?? interaction.user.username, iconURL: member?.avatarURL() ?? interaction.user.avatarURL() });

                embed.setTitle("**CulturalValues**");
                embed.addFields(
                    { name: Localization.LocSystem.get("cultural_value_ethnic", interaction.locale), value: `${cv[0]}` },
                    { name: Localization.LocSystem.get("cultural_value_cultural", interaction.locale), value: `${cv[1]}`, inline: true },
                    { name: Localization.LocSystem.get("cultural_value_preference", interaction.locale), value: `${cv[2]}`, inline: true },
                    { name: Localization.LocSystem.get("cultural_value_acceptance", interaction.locale), value: `${cv[3]}` },
                    { name: Localization.LocSystem.get("cultural_value_pluralism", interaction.locale), value: `${cv[4]}`, inline: true },
                    { name: Localization.LocSystem.get("cultural_value_external", interaction.locale), value: `${cv[5]}`, inline: true },
                    { name: Localization.LocSystem.get("cultural_value_progression", interaction.locale), value: `${cv[6]}` },
                    { name: Localization.LocSystem.get("cultural_value_technology", interaction.locale), value: `${cv[7]}`, inline: true },
                    { name: Localization.LocSystem.get("cultural_value_lgbt", interaction.locale), value: `${cv[8]}`, inline: true },
                    { name: Localization.LocSystem.get("cultural_value_nation", interaction.locale), value: `${cv[9]}` },
                    { name: Localization.LocSystem.get("cultural_value_religion", interaction.locale), value: `${cv[10]}`, inline: true },
                    { name: Localization.LocSystem.get("cultural_value_philosophy", interaction.locale), value: `${cv[11]}`, inline: true },
                    { name: "Link", value: `${user.culturalvalues}` }
                );

                await interaction.followUp({ embeds: [embed] });
                return;
            }
        }

        await interaction.followUp(Localization.LocSystem.get("no_attached_cultural", interaction.locale));
    }
}

export const PoliticalCompass: Command = {
    name: "politicalcompass",
    description: "Shows someone's Political Compass",
    options: [
        {
            name: "user",
            description: "The User",
            required: false,
            type: COMMAND_TYPES.USER
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        const userId: String = (interaction.options.getUser("user", false) ?? interaction.user).id as String;
        const member: GuildMember = (await interaction.guild?.fetch())?.members.cache.get(userId) as GuildMember;
        const user: IUser = await Database.DBSystem.getUserById(userId);

        if (user?.politicalcompass != null) {
            const cv = TestParser.parseCompass(new URL(user.politicalcompass as string));

            if (cv != null) {
                const embed = new EmbedBuilder().setAuthor({ name: member?.nickname ?? interaction.user.username, iconURL: member?.avatarURL() ?? interaction.user.avatarURL() });

                embed.setTitle("**Poltical Compass**");
                embed.setImage(cv[0])
                embed.addFields(
                    { name: Localization.LocSystem.get("left_right", interaction.locale), value: `${cv[1]}` },
                    { name: Localization.LocSystem.get("auth_lib", interaction.locale), value: `${cv[2]}`, inline: true },
                    { name: "Link", value: `${user.politicalcompass}` }
                );

                await interaction.followUp({ embeds: [embed] });
                return;
            }
        }

        await interaction.followUp(Localization.LocSystem.get("no_attached_compass", interaction.locale));
    }
}