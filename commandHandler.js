"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = void 0;
const addTest_1 = require("./commands/addTest");
const help_1 = require("./commands/help");
const ideology_1 = require("./commands/ideology");
const profile_1 = require("./commands/profile");
const pronouns_1 = require("./commands/pronouns");
const region_1 = require("./commands/region");
const regions_1 = require("./commands/regions");
const tests_1 = require("./commands/tests");
exports.Commands = [
    help_1.Help, profile_1.Profile, addTest_1.AddTest, ideology_1.Ideology, tests_1.DozenValues, region_1.Region, tests_1.SapplyValues, tests_1.EconValues, tests_1.EightValues, tests_1.CulturalValues, tests_1.PoliticalCompass, pronouns_1.Pronouns, regions_1.Regions
];
