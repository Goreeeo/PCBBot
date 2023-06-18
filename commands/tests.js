"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliticalCompass = exports.CulturalValues = exports.EightValues = exports.EconValues = exports.SapplyValues = exports.DozenValues = void 0;
const discord_js_1 = require("discord.js");
const command_1 = require("./command");
const database_1 = require("../systems/database");
const testparser_1 = require("../systems/testparser");
const localization_1 = require("../systems/localization");
exports.DozenValues = {
    name: "dozenvalues",
    description: "Show someone's DozenValues.",
    options: [
        {
            name: "user",
            description: "The User",
            required: false,
            type: command_1.COMMAND_TYPES.USER
        }
    ],
    run: async (client, interaction) => {
        const userId = (interaction.options.getUser("user", false) ?? interaction.user).id;
        const member = (await interaction.guild?.fetch())?.members.cache.get(userId);
        const user = await database_1.Database.DBSystem.getUserById(userId);
        if (user?.dozenvalues != null) {
            let dv = testparser_1.TestParser.parseDozen(new URL(user.dozenvalues));
            if (dv != null) {
                let tdv = dv;
                const dvEmbed = new discord_js_1.EmbedBuilder().setAuthor({ name: member?.nickname ?? interaction.user.username, iconURL: member?.avatarURL() ?? interaction.user.avatarURL() });
                dvEmbed.setTitle("**DozenValues**");
                dvEmbed.addFields({ name: localization_1.Localization.LocSystem.get("dozen_value_ownership", interaction.locale), value: `${tdv[0]}` }, { name: localization_1.Localization.LocSystem.get("dozen_value_market", interaction.locale), value: `${tdv[1]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("dozen_value_power", interaction.locale), value: `${tdv[2]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("dozen_value_autonomy", interaction.locale), value: `${tdv[3]}` }, { name: localization_1.Localization.LocSystem.get("dozen_value_identity", interaction.locale), value: `${tdv[4]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("dozen_value_progress", interaction.locale), value: `${tdv[5]}`, inline: true }, { name: "Link", value: `${user.dozenvalues}` });
                await interaction.followUp({ embeds: [dvEmbed] });
                return;
            }
        }
        await interaction.followUp(localization_1.Localization.LocSystem.get("no_attached_dozen", interaction.locale));
    }
};
exports.SapplyValues = {
    name: "sapplyvalues",
    description: "Shows someone's SapplyValues",
    options: [
        {
            name: "user",
            description: "The User",
            required: false,
            type: command_1.COMMAND_TYPES.USER
        }
    ],
    run: async (client, interaction) => {
        const userId = (interaction.options.getUser("user", false) ?? interaction.user).id;
        const member = (await interaction.guild?.fetch())?.members.cache.get(userId);
        const user = await database_1.Database.DBSystem.getUserById(userId);
        if (user?.sapplyvalues != null) {
            const sv = testparser_1.TestParser.parseSapply(new URL(user.sapplyvalues));
            if (sv != null) {
                const svEmbed = new discord_js_1.EmbedBuilder().setAuthor({ name: member?.nickname ?? interaction.user.username, iconURL: member?.avatarURL() ?? interaction.user.avatarURL() });
                svEmbed.setTitle("**SapplyValues**");
                svEmbed.addFields({ name: localization_1.Localization.LocSystem.get("left_right", interaction.locale), value: `${sv[0]}` }, { name: localization_1.Localization.LocSystem.get("auth_lib", interaction.locale), value: `${sv[1]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("prog_con", interaction.locale), value: `${sv[2]}`, inline: true }, { name: "Link", value: `${user.sapplyvalues}` });
                await interaction.followUp({ embeds: [svEmbed] });
                return;
            }
        }
        await interaction.followUp(localization_1.Localization.LocSystem.get("no_attached_sapply", interaction.locale));
    }
};
exports.EconValues = {
    name: "econvalues",
    description: "Shows someone's EconValues",
    options: [
        {
            name: "user",
            description: "The User",
            required: false,
            type: command_1.COMMAND_TYPES.USER
        }
    ],
    run: async (client, interaction) => {
        const userId = (interaction.options.getUser("user", false) ?? interaction.user).id;
        const member = (await interaction.guild?.fetch())?.members.cache.get(userId);
        const user = await database_1.Database.DBSystem.getUserById(userId);
        if (user?.econvalues != null) {
            const ev = testparser_1.TestParser.parseEcon(new URL(user.econvalues));
            if (ev != null) {
                const embed = new discord_js_1.EmbedBuilder().setAuthor({ name: member?.nickname ?? interaction.user.username, iconURL: member?.avatarURL() ?? interaction.user.avatarURL() });
                embed.setTitle("**EconValues**");
                embed.addFields({ name: localization_1.Localization.LocSystem.get("econ_value_incentive", interaction.locale), value: `${ev[0]}` }, { name: localization_1.Localization.LocSystem.get("econ_value_structure", interaction.locale), value: `${ev[1]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("econ_value_intervention", interaction.locale), value: `${ev[2]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("econ_value_centralisation", interaction.locale), value: `${ev[3]}` }, { name: localization_1.Localization.LocSystem.get("econ_value_technology", interaction.locale), value: `${ev[4]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("econ_value_land", interaction.locale), value: `${ev[5]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("econ_value_inheritance", interaction.locale), value: `${ev[6]}` }, { name: localization_1.Localization.LocSystem.get("econ_value_labor", interaction.locale), value: `${ev[7]}`, inline: true }, { name: "Link", value: `${user.econvalues}` });
                await interaction.followUp({ embeds: [embed] });
                return;
            }
        }
        await interaction.followUp(localization_1.Localization.LocSystem.get("no_attached_econ", interaction.locale));
    }
};
exports.EightValues = {
    name: "eightvalues",
    description: "Shows someone's 8Values",
    options: [
        {
            name: "user",
            description: "The User",
            required: false,
            type: command_1.COMMAND_TYPES.USER
        }
    ],
    run: async (client, interaction) => {
        const userId = (interaction.options.getUser("user", false) ?? interaction.user).id;
        const member = (await interaction.guild?.fetch())?.members.cache.get(userId);
        const user = await database_1.Database.DBSystem.getUserById(userId);
        if (user?.eightvalues != null) {
            const ev = testparser_1.TestParser.parseEight(new URL(user.eightvalues));
            if (ev != null) {
                const embed = new discord_js_1.EmbedBuilder().setAuthor({ name: member?.nickname ?? interaction.user.username, iconURL: member?.avatarURL() ?? interaction.user.avatarURL() });
                embed.setTitle("**8Values**");
                embed.addFields({ name: localization_1.Localization.LocSystem.get("eight_value_economic", interaction.locale), value: `${ev[0]}` }, { name: localization_1.Localization.LocSystem.get("eight_value_diplomacy", interaction.locale), value: `${ev[1]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("eight_value_civil", interaction.locale), value: `${ev[2]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("eight_value_societal", interaction.locale), value: `${ev[3]}`, inline: true }, { name: "Link", value: `${user.eightvalues}` });
                await interaction.followUp({ embeds: [embed] });
                return;
            }
        }
        await interaction.followUp(localization_1.Localization.LocSystem.get("no_attached_eight", interaction.locale));
    }
};
exports.CulturalValues = {
    name: "culturalvalues",
    description: "Shows someone's CulturalValues",
    options: [
        {
            name: "user",
            description: "The User",
            required: false,
            type: command_1.COMMAND_TYPES.USER
        }
    ],
    run: async (client, interaction) => {
        const userId = (interaction.options.getUser("user", false) ?? interaction.user).id;
        const member = (await interaction.guild?.fetch())?.members.cache.get(userId);
        const user = await database_1.Database.DBSystem.getUserById(userId);
        if (user?.culturalvalues != null) {
            const cv = testparser_1.TestParser.parseCultural(new URL(user.culturalvalues));
            if (cv != null) {
                const embed = new discord_js_1.EmbedBuilder().setAuthor({ name: member?.nickname ?? interaction.user.username, iconURL: member?.avatarURL() ?? interaction.user.avatarURL() });
                embed.setTitle("**CulturalValues**");
                embed.addFields({ name: localization_1.Localization.LocSystem.get("cultural_value_ethnic", interaction.locale), value: `${cv[0]}` }, { name: localization_1.Localization.LocSystem.get("cultural_value_cultural", interaction.locale), value: `${cv[1]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("cultural_value_preference", interaction.locale), value: `${cv[2]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("cultural_value_acceptance", interaction.locale), value: `${cv[3]}` }, { name: localization_1.Localization.LocSystem.get("cultural_value_pluralism", interaction.locale), value: `${cv[4]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("cultural_value_external", interaction.locale), value: `${cv[5]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("cultural_value_progression", interaction.locale), value: `${cv[6]}` }, { name: localization_1.Localization.LocSystem.get("cultural_value_technology", interaction.locale), value: `${cv[7]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("cultural_value_lgbt", interaction.locale), value: `${cv[8]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("cultural_value_nation", interaction.locale), value: `${cv[9]}` }, { name: localization_1.Localization.LocSystem.get("cultural_value_religion", interaction.locale), value: `${cv[10]}`, inline: true }, { name: localization_1.Localization.LocSystem.get("cultural_value_philosophy", interaction.locale), value: `${cv[11]}`, inline: true }, { name: "Link", value: `${user.culturalvalues}` });
                await interaction.followUp({ embeds: [embed] });
                return;
            }
        }
        await interaction.followUp(localization_1.Localization.LocSystem.get("no_attached_cultural", interaction.locale));
    }
};
exports.PoliticalCompass = {
    name: "politicalcompass",
    description: "Shows someone's Political Compass",
    options: [
        {
            name: "user",
            description: "The User",
            required: false,
            type: command_1.COMMAND_TYPES.USER
        }
    ],
    run: async (client, interaction) => {
        const userId = (interaction.options.getUser("user", false) ?? interaction.user).id;
        const member = (await interaction.guild?.fetch())?.members.cache.get(userId);
        const user = await database_1.Database.DBSystem.getUserById(userId);
        if (user?.politicalcompass != null) {
            const cv = testparser_1.TestParser.parseCompass(new URL(user.politicalcompass));
            if (cv != null) {
                const embed = new discord_js_1.EmbedBuilder().setAuthor({ name: member?.nickname ?? interaction.user.username, iconURL: member?.avatarURL() ?? interaction.user.avatarURL() });
                embed.setTitle("**Poltical Compass**");
                embed.setImage(cv[0]);
                embed.addFields({ name: localization_1.Localization.LocSystem.get("left_right", interaction.locale), value: `${cv[1]}` }, { name: localization_1.Localization.LocSystem.get("auth_lib", interaction.locale), value: `${cv[2]}`, inline: true }, { name: "Link", value: `${user.politicalcompass}` });
                await interaction.followUp({ embeds: [embed] });
                return;
            }
        }
        await interaction.followUp(localization_1.Localization.LocSystem.get("no_attached_compass", interaction.locale));
    }
};
