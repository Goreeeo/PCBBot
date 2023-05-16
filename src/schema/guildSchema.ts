import mongoose, { Schema } from "mongoose";

const GuildSchema: Schema = new Schema({
    _id: {
        type: String,
        required: true
    },
    forcedLang: {
        type: String,
        required: false
    }
});

export interface IGuild extends Document {
    _id: String,
    forcedLang: String
}

export default mongoose.model<IGuild>("guilds", GuildSchema);