import mongoose, { mongo } from "mongoose";
import userSchema, { IUser } from "../schema/userSchema";

export module Database {
    export class DBSystem {
        static async init(): Promise<void> {
            await mongoose.connect(
                process.env.MONGO_CONNECTION as string,
                {
                }
            );
        }

        private static async createBlankUser(id: String): Promise<IUser> {
            return await userSchema.findOneAndUpdate({
                _id: id
            },
            {
                _id: id
            },
            {
                upsert: true
            }) as IUser;
        }

        static async getUserById(id: String): Promise<any> {
            let user: any = await userSchema.findById(id);
            if (!user) {
                user = await this.createBlankUser(id);
            }
            return user;
        }

        static async clear(id: String): Promise<void> {
            await userSchema.findOneAndDelete({
                _id: id
            });
        }

        static async addDozen(id: String, link: String): Promise<void> {
            await userSchema.findOneAndUpdate({
                _id: id
            },
            {
                _id: id,
                dozenvalues: (link == "" ? null : link)
            },
            {
                upsert: true
            });
        }

        static async addSapply(id: String, link: String): Promise<void> {
            await userSchema.findOneAndUpdate({
                _id: id
            },
            {
                _id: id,
                sapplyvalues: (link == "" ? null : link)
            },
            {
                upsert: true
            });
        }

        static async addEcon(id: String, link: String): Promise<void> {
            await userSchema.findOneAndUpdate({
                _id: id
            },
            {
                _id: id,
                econvalues: (link == "" ? null : link)
            },
            {
                upsert: true
            });
        }

        static async addEight(id: String, link: String): Promise<void> {
            await userSchema.findOneAndUpdate({
                _id: id
            },
            {
                _id: id,
                eightvalues: (link == "" ? null : link)
            },
            {
                upsert: true
            });
        }

        static async addPC(id: String, link: String): Promise<void> {
            await userSchema.findOneAndUpdate({
                _id: id
            },
            {
                _id: id,
                politicalcompass: (link == "" ? null : link)
            },
            {
                upsert: true
            });
        }

        static async addCultural(id: String, link: String): Promise<void> {
            await userSchema.findOneAndUpdate({
                _id: id
            },
            {
                _id: id,
                culturalvalues: (link == "" ? null : link)
            },
            {
                upsert: true
            });
        }

        static async setIdeology(id: String, thumb: String, name: String, caption: String, link: String): Promise<void> {
            await userSchema.findOneAndUpdate({
                _id: id
            },
            {
                _id: id,
                ideology: link,
                ideologyImage: thumb,
                ideologyName: name,
                ideologyCaption: caption
            },
            {
                upsert: true
            });
        }

        static async setRegion(id: String, region: String): Promise<void> {
            await userSchema.findOneAndUpdate({
                _id: id
            }, {
                _id: id,
                region: region
            }, {
                upsert: true
            });
        }

        static async setPronouns(id: String, pronouns: String): Promise<void> {
            await userSchema.findOneAndUpdate({
                _id: id
            }, {
                _id: id,
                pronouns: pronouns
            }, {
                upsert: true
            });
        }

        static close(): void {
            mongoose.connection.close();
        }
    }
}