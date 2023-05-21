import { Client, CommandInteraction, EmbedBuilder, Guild, GuildMember, User } from "discord.js";
import { COMMAND_TYPES, Command } from "./command";
import { Localization } from "../systems/localization";
import { Database } from "../systems/database";
import { IUser } from "../schema/userSchema";
import axios, { AxiosResponse } from "axios";
import { JSDOM } from "jsdom";
import { CountryManager } from "../systems/countries";

export const Profile: Command = {
    name: "profile",
    description: "Show someone's profile.",
    options: [
        {
            name: "user",
            description: "The User to show the profile of",
            type: COMMAND_TYPES.USER,
            required: true
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        console.log(interaction.guild == null);
        if (interaction.guild == null) {
            await interaction.followUp(Localization.LocSystem.get("no_dm_support", interaction.locale));
            return;
        }

        const userId: String = interaction.options.getUser("user", true).id as String;
        let user: IUser = await Database.DBSystem.getUserById(userId);
        if (!user || !user.ideology) {
            await interaction.followUp(Localization.LocSystem.get("no_polcompball_associated", interaction.locale));
            return;
        }

        const ideology = user.ideology as string;

        if (!user.ideologyName) {
            const res: AxiosResponse = await axios.get(ideology);
            if (res.status !== 200) {
                await interaction.followUp(Localization.LocSystem.get("polcompball_server_issue", interaction.locale));
                return;
            }

            const dom = new JSDOM(res.data);
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

            await Database.DBSystem.setIdeology(interaction.user.id as String, thumb, ideologyName, ideologyCaption, ideology);

            user.ideologyImage = thumb;
            user.ideologyName = ideologyName;
            user.ideologyCaption = ideologyCaption;
        }

        const guild: Guild = await interaction.guild.fetch();
        const tempMember: any = guild.members.cache.get(userId);
        if (!tempMember) {
            await interaction.followUp(Localization.LocSystem.get("not_server_member", interaction.locale));
            return;
        }
        const tMember: GuildMember = tempMember as GuildMember;
        const tUser: User = await tMember.user.fetch();

        const embed = new EmbedBuilder().setAuthor({ name: tMember.nickname ?? tUser.username, iconURL: tMember.avatarURL() ?? tUser.avatarURL() });

        if (user.ideologyImage !== "") {
            embed.setThumbnail(user.ideologyImage as string);
        }
        if (user.pronouns != null) {
            embed.addFields(
                { name: Localization.LocSystem.get("pronouns", interaction.locale), value: `${user.pronouns}` },
            );
        }

        embed.addFields(
            { name: Localization.LocSystem.get("profile_ideology", interaction.locale), value: `${user.ideologyName}`}
        );
        if (user.ideologyCaption !== "") {
            embed.addFields(
                { name: Localization.LocSystem.get("profile_summary", interaction.locale), value: `${user.ideologyCaption}`}
            );
        }
        embed.addFields(
            { name: "Link", value: `${ideology}` }
        );

        if (user.region != null) {
            const country = CountryManager.Countries.get(user.region as string).name;
            embed.addFields({ name: "Region", value: `${country}` })
        }

        await interaction.followUp({embeds: [embed]});
    },
}