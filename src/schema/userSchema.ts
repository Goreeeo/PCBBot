import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
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

export interface IUser extends Document {
    _id: String,
    pronouns: String,
    ideology: String,
    region: String,
    dozenvalues: String,
    sapplyvalues: String,
    econvalues: String,
    eightvalues: String,
    politicalcompass: String,
    culturalvalues: String,
    ideologyImage: String,
    ideologyName: String,
    ideologyCaption: String,
}

export default mongoose.model<IUser>("users", UserSchema);