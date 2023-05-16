import * as fs from "fs";

export module Localization {
    interface LocEntry {
        en: string;
        de: string;
    }

    export enum Locale {
        English,
        German
    }

    export class LocSystem {
        private static entries: { [key: string]: LocEntry } = {};

        static init(): void {
            const content = fs.readFileSync("tables/localization.json").toString();
            this.entries = LocJSON.toLocalization(content);
        }

        static getRaw(key: string): LocEntry | boolean {
            if (this.entries[key]) {
                return this.entries[key];
            }

            console.warn(`Key ${key} not found!`)
            return false;
        }

        static get(key: string, locale: string): string {
            if (this.entries[key]) {
                return this.localize(this.entries[key], this.getLocale(locale));
            }

            console.warn(`Key ${key} not found!`)
            return "";
        }

        static localize(entry: LocEntry, locale: Locale): string {
            switch(locale) {
                case Locale.German:
                    return entry.de;
                default:
                    return entry.en;
            }
        }

        static getLocale(discordLocale: string): Locale {
            switch (discordLocale) {
                case "de":
                    return Locale.German;
                default:
                    return Locale.English;
            }
        }
    }

    class LocJSON {
        static toLocalization(json: string): { [key: string]: LocEntry } {
            return LocJSON.cast(JSON.parse(json), LocJSON.m(LocJSON.r("LocEntry")));
        }
    
        static localizationToJson(value: { [key: string]: LocEntry }): string {
            return JSON.stringify(LocJSON.uncast(value, LocJSON.m(LocJSON.r("LocEntry"))), null, 2);
        }

        private static invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
            const prettyTyp = LocJSON.prettyTypeName(typ);
            const parentText = parent ? ` on ${parent}` : '';
            const keyText = key ? ` for key "${key}"` : '';
            throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
        }
        
        private static prettyTypeName(typ: any): string {
            if (Array.isArray(typ)) {
                if (typ.length === 2 && typ[0] === undefined) {
                    return `an optional ${LocJSON.prettyTypeName(typ[1])}`;
                } else {
                    return `one of [${typ.map(a => { return LocJSON.prettyTypeName(a); }).join(", ")}]`;
                }
            } else if (typeof typ === "object" && typ.literal !== undefined) {
                return typ.literal;
            } else {
                return typeof typ;
            }
        }
        
        private static jsonToJSProps(typ: any): any {
            if (typ.jsonToJS === undefined) {
                const map: any = {};
                typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
                typ.jsonToJS = map;
            }
            return typ.jsonToJS;
        }
        
        private static jsToJSONProps(typ: any): any {
            if (typ.jsToJSON === undefined) {
                const map: any = {};
                typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
                typ.jsToJSON = map;
            }
            return typ.jsToJSON;
        }
        
        private static transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
            function transformPrimitive(typ: string, val: any): any {
                if (typeof typ === typeof val) return val;
                return LocJSON.invalidValue(typ, val, key, parent);
            }
        
            function transformUnion(typs: any[], val: any): any {
                // val must validate against one typ in typs
                const l = typs.length;
                for (let i = 0; i < l; i++) {
                    const typ = typs[i];
                    try {
                        return LocJSON.transform(val, typ, getProps);
                    } catch (_) {}
                }
                return LocJSON.invalidValue(typs, val, key, parent);
            }
        
            function transformEnum(cases: string[], val: any): any {
                if (cases.indexOf(val) !== -1) return val;
                return LocJSON.invalidValue(cases.map(a => { return LocJSON.l(a); }), val, key, parent);
            }
        
            function transformArray(typ: any, val: any): any {
                // val must be an array with no invalid elements
                if (!Array.isArray(val)) return LocJSON.invalidValue(LocJSON.l("array"), val, key, parent);
                return val.map(el => LocJSON.transform(el, typ, getProps));
            }
        
            function transformDate(val: any): any {
                if (val === null) {
                    return null;
                }
                const d = new Date(val);
                if (isNaN(d.valueOf())) {
                    return LocJSON.invalidValue(LocJSON.l("Date"), val, key, parent);
                }
                return d;
            }
        
            function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
                if (val === null || typeof val !== "object" || Array.isArray(val)) {
                    return LocJSON.invalidValue(LocJSON.l(ref || "object"), val, key, parent);
                }
                const result: any = {};
                Object.getOwnPropertyNames(props).forEach(key => {
                    const prop = props[key];
                    const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
                    result[prop.key] = LocJSON.transform(v, prop.typ, getProps, key, ref);
                });
                Object.getOwnPropertyNames(val).forEach(key => {
                    if (!Object.prototype.hasOwnProperty.call(props, key)) {
                        result[key] = LocJSON.transform(val[key], additional, getProps, key, ref);
                    }
                });
                return result;
            }
        
            if (typ === "any") return val;
            if (typ === null) {
                if (val === null) return val;
                return LocJSON.invalidValue(typ, val, key, parent);
            }
            if (typ === false) return LocJSON.invalidValue(typ, val, key, parent);
            let ref: any = undefined;
            while (typeof typ === "object" && typ.ref !== undefined) {
                ref = typ.ref;
                typ = LocJSON.typeMap[typ.ref];
            }
            if (Array.isArray(typ)) return transformEnum(typ, val);
            if (typeof typ === "object") {
                return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
                    : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
                    : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
                    : LocJSON.invalidValue(typ, val, key, parent);
            }
            // Numbers can be parsed by Date but shouldn't be.
            if (typ === Date && typeof val !== "number") return transformDate(val);
            return transformPrimitive(typ, val);
        }
        
        private static cast<T>(val: any, typ: any): T {
            return LocJSON.transform(val, typ, LocJSON.jsonToJSProps);
        }
        
        private static uncast<T>(val: T, typ: any): any {
            return LocJSON.transform(val, typ, LocJSON.jsToJSONProps);
        }
        
        private static l(typ: any) {
            return { literal: typ };
        }
        
        private static a(typ: any) {
            return { arrayItems: typ };
        }
        
        private static u(...typs: any[]) {
            return { unionMembers: typs };
        }
        
        private static o(props: any[], additional: any) {
            return { props, additional };
        }
        
        private static m(additional: any) {
            return { props: [], additional };
        }
        
        private static r(name: string) {
            return { ref: name };
        }
        
        private static typeMap: any = {
            "LocEntry": LocJSON.o([
                { json: "en", js: "en", typ: "" },
                { json: "de", js: "de", typ: "" },
            ], false),
        };
    }
}