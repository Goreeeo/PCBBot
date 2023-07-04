import { Client, CommandInteraction, EmbedBuilder, Guild, GuildMember, User } from "discord.js";
import { Command } from "./command";
import { IUser } from "../schema/userSchema";
import { Database } from "../systems/database";
import { Localization } from "../systems/localization";
import { CountryManager } from "../systems/countries";

export const ProfileStatus: Command = {
    name: "profile-status",
    description: "The completion status of your profile.",
    run: async (client: Client, interaction: CommandInteraction) => {
        if (interaction.guild == null) {
            await interaction.followUp(Localization.LocSystem.get("no_dm_support", interaction.locale));
            return;
        }

        const userId: String = interaction.user.id as String;
        let user: IUser = await Database.DBSystem.getUserById(userId);

        const guild: Guild = await interaction.guild.fetch();
        const tempMember: any = guild.members.cache.get(userId);
        if (!tempMember) {
            await interaction.followUp(Localization.LocSystem.get("not_server_member", interaction.locale));
            return;
        }
        const tMember: GuildMember = tempMember as GuildMember;
        const tUser: User = await tMember.user.fetch();

        const embed = new EmbedBuilder().setAuthor({ name: tMember.nickname ?? tUser.username, iconURL: tMember.avatarURL() ?? tUser.avatarURL() });

        let ideologyValue, regionValue, pronounsValue, 
        dvValue, svValue, ecValue, evValue, cvValue, pcValue: String = "";

        if (user.ideology != null) {
            if (user.ideologyImage !== "") {
                embed.setThumbnail(user.ideologyImage as string);
            }

            ideologyValue = `[${user.ideologyName}](${user.ideology}) ✅`;
        }
        else {
            ideologyValue = "❌";
        }

        if (user.region != null) {
            const country = CountryManager.Countries.get(user.region as string).name;
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

        embed.addFields(
            { name: Localization.LocSystem.get("profile_ideology", interaction.locale), value: ideologyValue },
            { name: "Region", value: regionValue },
            { name: Localization.LocSystem.get("pronouns", interaction.locale), value: pronounsValue },
            { name: "DozenValues", value: dvValue },
            { name: "SapplyValues", value: svValue },
            { name: "EconValues", value: ecValue },
            { name: "EightValues", value: evValue },
            { name: "CulturalValues", value: cvValue },
            { name: "Political Compass", value: pcValue },
        );

        await interaction.followUp({ embeds: [embed] });
    }
}