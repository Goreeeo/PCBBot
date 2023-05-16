"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    _id: {
        type: String,
        required: true
    },
    pronouns: {
        type: String,
        required: false
    },
    ideology: {
        type: String,
        required: false
    },
    region: {
        type: String,
        required: false
    },
    dozenvalues: {
        type: String,
        required: false
    },
    sapplyvalues: {
        type: String,
        required: false
    },
    econvalues: {
        type: String,
        required: false
    },
    eightvalues: {
        type: String,
        required: false
    },
    politicalcompass: {
        type: String,
        required: false
    },
    culturalvalues: {
        type: String,
        required: false
    },
    ideologyImage: {
        type: String,
        required: false
    },
    ideologyName: {
        type: String,
        required: false
    },
    ideologyCaption: {
        type: String,
        required: false
    }
});
exports.default = mongoose_1.default.model("users", UserSchema);
