"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileStatus = void 0;
const discord_js_1 = require("discord.js");
const database_1 = require("../systems/database");
const localization_1 = require("../systems/localization");
const countries_1 = require("../systems/countries");
exports.ProfileStatus = {
    name: "profile-status",
    description: "The completion status of your profile.",
    run: async (client, interaction) => {
        if (interaction.guild == null) {
            await interaction.followUp(localization_1.Localization.LocSystem.get("no_dm_support", interaction.locale));
            return;
        }
        const userId = interaction.user.id;
        let user = await database_1.Database.DBSystem.getUserById(userId);
        const guild = await interaction.guild.fetch();
        const tempMember = guild.members.cache.get(userId);
        if (!tempMember) {
            await interaction.followUp(localization_1.Localization.LocSystem.get("not_server_member", interaction.locale));
            return;
        }
        const tMember = tempMember;
        const tUser = await tMember.user.fetch();
        const embed = new discord_js_1.EmbedBuilder().setAuthor({ name: tMember.nickname ?? tUser.username, iconURL: tMember.avatarURL() ?? tUser.avatarURL() });
        let ideologyValue, regionValue, pronounsValue, dvValue, svValue, ecValue, evValue, cvValue, pcValue = "";
        if (user.ideology != null) {
            if (user.ideologyImage !== "") {
                embed.setThumbnail(user.ideologyImage);
            }
            ideologyValue = `[${user.ideologyName}](${user.ideology}) ✅`;
        }
        else {
            ideologyValue = "❌";
        }
        if (user.region != null) {
            const country = countries_1.CountryManager.Countries.get(user.region).name;
            regionValue = `${country} ✅`;
        }
        else {
            regionValue = "❌";
        }
        if (user.pronouns != null) {
            pronounsValue = `${user.pronouns} ✅`;
        }
        else {
            pronounsValue = "❌";
        }
        if (user.dozenvalues != null) {
            dvValue = `[Link](${user.dozenvalues}) ✅`;
        }
        else {
            dvValue = "❌";
        }
        if (user.sapplyvalues != null) {
            svValue = `[Link](${user.sapplyvalues}) ✅`;
        }
        else {
            svValue = "❌";
        }
        if (user.econvalues != null) {
            ecValue = `[Link](${user.econvalues}) ✅`;
        }
        else {
            ecValue = "❌";
        }
        if (user.eightvalues != null) {
            evValue = `[Link](${user.eightvalues}) ✅`;
        }
        else {
            evValue = "❌";
        }
        if (user.culturalvalues != null) {
            cvValue = `[Link](${user.culturalvalues}) ✅`;
        }
        else {
            cvValue = "❌";
        }
        if (user.politicalcompass != null) {
            pcValue = `[Link](${user.politicalcompass}) ✅`;
        }
        else {
            pcValue = "❌";
        }
        embed.addFields({ name: localization_1.Localization.LocSystem.get("profile_ideology", interaction.locale), value: ideologyValue }, { name: "Region", value: regionValue }, { name: localization_1.Localization.LocSystem.get("pronouns", interaction.locale), value: pronounsValue }, { name: "DozenValues", value: dvValue }, { name: "SapplyValues", value: svValue }, { name: "EconValues", value: ecValue }, { name: "EightValues", value: evValue }, { name: "CulturalValues", value: cvValue }, { name: "Political Compass", value: pcValue });
        await interaction.followUp({ embeds: [embed] });
    }
};
