"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const command_1 = require("./command");
const localization_1 = require("../systems/localization");
const database_1 = require("../systems/database");
const axios_1 = tslib_1.__importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const countries_1 = require("../systems/countries");
exports.Profile = {
    name: "profile",
    description: "Show someone's profile.",
    options: [
        {
            name: "user",
            description: "The User to show the profile of",
            type: command_1.COMMAND_TYPES.USER,
            required: true
        }
    ],
    run: async (client, interaction) => {
        if (interaction.guild == null) {
            await interaction.followUp(localization_1.Localization.LocSystem.get("no_dm_support", interaction.locale));
            return;
        }
        const userId = interaction.options.getUser("user", true).id;
        let user = await database_1.Database.DBSystem.getUserById(userId);
        if (!user || !user.ideology) {
            await interaction.followUp(localization_1.Localization.LocSystem.get("no_polcompball_associated", interaction.locale));
            return;
        }
        const ideology = user.ideology;
        if (!user.ideologyName) {
            const res = await axios_1.default.get(ideology);
            if (res.status !== 200) {
                await interaction.followUp(localization_1.Localization.LocSystem.get("polcompball_server_issue", interaction.locale));
                return;
            }
            const dom = new jsdom_1.JSDOM(res.data);
            const thumbs = dom.window.document.getElementsByClassName("pi-image-thumbnail");
            let thumb = "";
            if (thumbs[0] != null) {
                thumb = "https:" + thumbs[0].getAttribute("src");
            }
            const ideologyName = dom.window.document.getElementsByClassName("mw-page-title-main")[0].innerHTML;
            const ideologyCaptions = dom.window.document.getElementsByClassName("pi-caption");
            let ideologyCaption = "";
            if (ideologyCaptions != null && ideologyCaptions.length != 0) {
                ideologyCaption = ideologyCaptions[0].innerHTML;
            }
            await database_1.Database.DBSystem.setIdeology(interaction.user.id, thumb, ideologyName, ideologyCaption, ideology);
            user.ideologyImage = thumb;
            user.ideologyName = ideologyName;
            user.ideologyCaption = ideologyCaption;
        }
        const guild = await interaction.guild.fetch();
        const tempMember = guild.members.cache.get(userId);
        if (!tempMember) {
            await interaction.followUp(localization_1.Localization.LocSystem.get("not_server_member", interaction.locale));
            return;
        }
        const tMember = tempMember;
        const tUser = await tMember.user.fetch();
        const embed = new discord_js_1.EmbedBuilder().setAuthor({ name: tMember.nickname ?? tUser.username, iconURL: tMember.avatarURL() ?? tUser.avatarURL() });
        if (user.ideologyImage !== "") {
            embed.setThumbnail(user.ideologyImage);
        }
        if (user.pronouns != null) {
            embed.addFields({ name: localization_1.Localization.LocSystem.get("pronouns", interaction.locale), value: `${user.pronouns}` });
        }
        embed.addFields({ name: localization_1.Localization.LocSystem.get("profile_ideology", interaction.locale), value: `${user.ideologyName}` });
        if (user.ideologyCaption !== "") {
            embed.addFields({ name: localization_1.Localization.LocSystem.get("profile_summary", interaction.locale), value: `${user.ideologyCaption}` });
        }
        embed.addFields({ name: "Link", value: `${ideology}` });
        if (user.region != null) {
            const country = countries_1.CountryManager.Countries.get(user.region).name;
            embed.addFields({ name: "Region", value: `${country}` });
        }
        await interaction.followUp({ embeds: [embed] });
    },
};
