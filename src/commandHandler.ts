import { AddTest } from "./commands/addTest";
import { Command } from "./commands/command";
import { Help } from "./commands/help";
import { Ideology } from "./commands/ideology";
import { Profile } from "./commands/profile";
import { Pronouns } from "./commands/pronouns";
import { Region } from "./commands/region";
import { Regions } from "./commands/regions";
import { CulturalValues, DozenValues, EconValues, EightValues, PoliticalCompass, SapplyValues } from "./commands/tests";

export const Commands: Command[] = [
    Help, Profile, AddTest, Ideology, DozenValues, Region, SapplyValues, EconValues, EightValues, CulturalValues, PoliticalCompass, Pronouns, Regions
];