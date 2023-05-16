import * as fs from "fs";

export module CountryManager {
    export interface Country {
        name: String,
        continent: Continent
    }
    
    export enum Continent {
        Africa = "af",
        Asia = "as",
        Europe = "eu",
        NorthAmerica = "na",
        Oceania = "oc",
        SouthAmerica = "sa",
    }
    
    export class Countries {
        private static entries: { [key: string]: Country } = {};

        static init(): void {
            const content = fs.readFileSync("tables/countries.json").toString();
            this.entries = CountryJSON.toCountry(content);
        }

        static get(code: string): Country {
            return this.entries[code];
        }

        static getAll() {
            return this.entries;
        }
    }

    class CountryJSON {
        public static toCountry(json: string): { [key: string]: Country } {
            return CountryJSON.cast(JSON.parse(json), CountryJSON.m(CountryJSON.r("Country")));
        }
    
        public static countryToJson(value: { [key: string]: Country }): string {
            return JSON.stringify(CountryJSON.uncast(value, CountryJSON.m(CountryJSON.r("Country"))), null, 2);
        }
        
        private static invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
            const prettyTyp = CountryJSON.prettyTypeName(typ);
            const parentText = parent ? ` on ${parent}` : '';
            const keyText = key ? ` for key "${key}"` : '';
            throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
        }
        
        private static  prettyTypeName(typ: any): string {
            if (Array.isArray(typ)) {
                if (typ.length === 2 && typ[0] === undefined) {
                    return `an optional ${CountryJSON.prettyTypeName(typ[1])}`;
                } else {
                    return `one of [${typ.map(a => { return CountryJSON.prettyTypeName(a); }).join(", ")}]`;
                }
            } else if (typeof typ === "object" && typ.literal !== undefined) {
                return typ.literal;
            } else {
                return typeof typ;
            }
        }
        
        private static  jsonToJSProps(typ: any): any {
            if (typ.jsonToJS === undefined) {
                const map: any = {};
                typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
                typ.jsonToJS = map;
            }
            return typ.jsonToJS;
        }
        
        private static  jsToJSONProps(typ: any): any {
            if (typ.jsToJSON === undefined) {
                const map: any = {};
                typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
                typ.jsToJSON = map;
            }
            return typ.jsToJSON;
        }
        
        private static  transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
            function transformPrimitive(typ: string, val: any): any {
                if (typeof typ === typeof val) return val;
                return CountryJSON.invalidValue(typ, val, key, parent);
            }
        
            function transformUnion(typs: any[], val: any): any {
                // val must validate against one typ in typs
                const l = typs.length;
                for (let i = 0; i < l; i++) {
                    const typ = typs[i];
                    try {
                        return CountryJSON.transform(val, typ, getProps);
                    } catch (_) {}
                }
                return CountryJSON.invalidValue(typs, val, key, parent);
            }
        
            function transformEnum(cases: string[], val: any): any {
                if (cases.indexOf(val) !== -1) return val;
                return CountryJSON.invalidValue(cases.map(a => { return CountryJSON.l(a); }), val, key, parent);
            }
        
            function transformArray(typ: any, val: any): any {
                // val must be an array with no invalid elements
                if (!Array.isArray(val)) return CountryJSON.invalidValue(CountryJSON.l("array"), val, key, parent);
                return val.map(el => CountryJSON.transform(el, typ, getProps));
            }
        
            function transformDate(val: any): any {
                if (val === null) {
                    return null;
                }
                const d = new Date(val);
                if (isNaN(d.valueOf())) {
                    return CountryJSON.invalidValue(CountryJSON.l("Date"), val, key, parent);
                }
                return d;
            }
        
            function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
                if (val === null || typeof val !== "object" || Array.isArray(val)) {
                    return CountryJSON.invalidValue(CountryJSON.l(ref || "object"), val, key, parent);
                }
                const result: any = {};
                Object.getOwnPropertyNames(props).forEach(key => {
                    const prop = props[key];
                    const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
                    result[prop.key] = CountryJSON.transform(v, prop.typ, getProps, key, ref);
                });
                Object.getOwnPropertyNames(val).forEach(key => {
                    if (!Object.prototype.hasOwnProperty.call(props, key)) {
                        result[key] = CountryJSON.transform(val[key], additional, getProps, key, ref);
                    }
                });
                return result;
            }
        
            if (typ === "any") return val;
            if (typ === null) {
                if (val === null) return val;
                return CountryJSON.invalidValue(typ, val, key, parent);
            }
            if (typ === false) return CountryJSON.invalidValue(typ, val, key, parent);
            let ref: any = undefined;
            while (typeof typ === "object" && typ.ref !== undefined) {
                ref = typ.ref;
                typ = CountryJSON.typeMap[typ.ref];
            }
            if (Array.isArray(typ)) return transformEnum(typ, val);
            if (typeof typ === "object") {
                return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
                    : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
                    : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
                    : CountryJSON.invalidValue(typ, val, key, parent);
            }
            // Numbers can be parsed by Date but shouldn't be.
            if (typ === Date && typeof val !== "number") return transformDate(val);
            return transformPrimitive(typ, val);
        }
        
        private static  cast<T>(val: any, typ: any): T {
            return CountryJSON.transform(val, typ, CountryJSON.jsonToJSProps);
        }
        
        private static  uncast<T>(val: T, typ: any): any {
            return CountryJSON.transform(val, typ, CountryJSON.jsToJSONProps);
        }
        
        private static  l(typ: any) {
            return { literal: typ };
        }
        
        private static  a(typ: any) {
            return { arrayItems: typ };
        }
        
        private static  u(...typs: any[]) {
            return { unionMembers: typs };
        }
        
        private static  o(props: any[], additional: any) {
            return { props, additional };
        }
        
        private static  m(additional: any) {
            return { props: [], additional };
        }
        
        private static  r(name: string) {
            return { ref: name };
        }
        
        private static typeMap: any = {
            "Country": CountryJSON.o([
                { json: "name", js: "name", typ: "" },
                { json: "continent", js: "continent", typ: CountryJSON.r("Continent") },
            ], false),
            "Continent": [
                "af",
                "as",
                "eu",
                "na",
                "oc",
                "sa",
            ],
        };
    }
}