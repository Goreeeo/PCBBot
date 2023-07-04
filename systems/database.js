"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const userSchema_1 = tslib_1.__importDefault(require("../schema/userSchema"));
var Database;
(function (Database) {
    class DBSystem {
        static async init() {
            await mongoose_1.default.connect(process.env.MONGO_CONNECTION, {});
        }
        static async createBlankUser(id) {
            return await userSchema_1.default.findOneAndUpdate({
                _id: id
            }, {
                _id: id
            }, {
                upsert: true
            });
        }
        static async getUserById(id) {
            let user = await userSchema_1.default.findById(id);
            if (!user) {
                user = await this.createBlankUser(id);
            }
            return user;
        }
        static async clear(id) {
            await userSchema_1.default.findOneAndDelete({
                _id: id
            });
        }
        static async addDozen(id, link) {
            await userSchema_1.default.findOneAndUpdate({
                _id: id
            }, {
                _id: id,
                dozenvalues: (link == "" ? null : link)
            }, {
                upsert: true
            });
        }
        static async addSapply(id, link) {
            await userSchema_1.default.findOneAndUpdate({
                _id: id
            }, {
                _id: id,
                sapplyvalues: (link == "" ? null : link)
            }, {
                upsert: true
            });
        }
        static async addEcon(id, link) {
            await userSchema_1.default.findOneAndUpdate({
                _id: id
            }, {
                _id: id,
                econvalues: (link == "" ? null : link)
            }, {
                upsert: true
            });
        }
        static async addEight(id, link) {
            await userSchema_1.default.findOneAndUpdate({
                _id: id
            }, {
                _id: id,
                eightvalues: (link == "" ? null : link)
            }, {
                upsert: true
            });
        }
        static async addPC(id, link) {
            await userSchema_1.default.findOneAndUpdate({
                _id: id
            }, {
                _id: id,
                politicalcompass: (link == "" ? null : link)
            }, {
                upsert: true
            });
        }
        static async addCultural(id, link) {
            await userSchema_1.default.findOneAndUpdate({
                _id: id
            }, {
                _id: id,
                culturalvalues: (link == "" ? null : link)
            }, {
                upsert: true
            });
        }
        static async setIdeology(id, thumb, name, caption, link) {
            await userSchema_1.default.findOneAndUpdate({
                _id: id
            }, {
                _id: id,
                ideology: link,
                ideologyImage: thumb,
                ideologyName: name,
                ideologyCaption: caption
            }, {
                upsert: true
            });
        }
        static async setRegion(id, region) {
            await userSchema_1.default.findOneAndUpdate({
                _id: id
            }, {
                _id: id,
                region: region
            }, {
                upsert: true
            });
        }
        static async setPronouns(id, pronouns) {
            await userSchema_1.default.findOneAndUpdate({
                _id: id
            }, {
                _id: id,
                pronouns: pronouns
            }, {
                upsert: true
            });
        }
        static close() {
            mongoose_1.default.connection.close();
        }
    }
    Database.DBSystem = DBSystem;
})(Database = exports.Database || (exports.Database = {}));
