"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryManager = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
var CountryManager;
(function (CountryManager) {
    let Continent;
    (function (Continent) {
        Continent["Africa"] = "af";
        Continent["Asia"] = "as";
        Continent["Europe"] = "eu";
        Continent["NorthAmerica"] = "na";
        Continent["Oceania"] = "oc";
        Continent["SouthAmerica"] = "sa";
    })(Continent = CountryManager.Continent || (CountryManager.Continent = {}));
    class Countries {
        static entries = {};
        static init() {
            const content = fs.readFileSync("tables/countries.json").toString();
            this.entries = CountryJSON.toCountry(content);
        }
        static get(code) {
            return this.entries[code];
        }
        static getAll() {
            return this.entries;
        }
    }
    CountryManager.Countries = Countries;
    class CountryJSON {
        static toCountry(json) {
            return CountryJSON.cast(JSON.parse(json), CountryJSON.m(CountryJSON.r("Country")));
        }
        static countryToJson(value) {
            return JSON.stringify(CountryJSON.uncast(value, CountryJSON.m(CountryJSON.r("Country"))), null, 2);
        }
        static invalidValue(typ, val, key, parent = '') {
            const prettyTyp = CountryJSON.prettyTypeName(typ);
            const parentText = parent ? ` on ${parent}` : '';
            const keyText = key ? ` for key "${key}"` : '';
            throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
        }
        static prettyTypeName(typ) {
            if (Array.isArray(typ)) {
                if (typ.length === 2 && typ[0] === undefined) {
                    return `an optional ${CountryJSON.prettyTypeName(typ[1])}`;
                }
                else {
                    return `one of [${typ.map(a => { return CountryJSON.prettyTypeName(a); }).join(", ")}]`;
                }
            }
            else if (typeof typ === "object" && typ.literal !== undefined) {
                return typ.literal;
            }
            else {
                return typeof typ;
            }
        }
        static jsonToJSProps(typ) {
            if (typ.jsonToJS === undefined) {
                const map = {};
                typ.props.forEach((p) => map[p.json] = { key: p.js, typ: p.typ });
                typ.jsonToJS = map;
            }
            return typ.jsonToJS;
        }
        static jsToJSONProps(typ) {
            if (typ.jsToJSON === undefined) {
                const map = {};
                typ.props.forEach((p) => map[p.js] = { key: p.json, typ: p.typ });
                typ.jsToJSON = map;
            }
            return typ.jsToJSON;
        }
        static transform(val, typ, getProps, key = '', parent = '') {
            function transformPrimitive(typ, val) {
                if (typeof typ === typeof val)
                    return val;
                return CountryJSON.invalidValue(typ, val, key, parent);
            }
            function transformUnion(typs, val) {
                const l = typs.length;
                for (let i = 0; i < l; i++) {
                    const typ = typs[i];
                    try {
                        return CountryJSON.transform(val, typ, getProps);
                    }
                    catch (_) { }
                }
                return CountryJSON.invalidValue(typs, val, key, parent);
            }
            function transformEnum(cases, val) {
                if (cases.indexOf(val) !== -1)
                    return val;
                return CountryJSON.invalidValue(cases.map(a => { return CountryJSON.l(a); }), val, key, parent);
            }
            function transformArray(typ, val) {
                if (!Array.isArray(val))
                    return CountryJSON.invalidValue(CountryJSON.l("array"), val, key, parent);
                return val.map(el => CountryJSON.transform(el, typ, getProps));
            }
            function transformDate(val) {
                if (val === null) {
                    return null;
                }
                const d = new Date(val);
                if (isNaN(d.valueOf())) {
                    return CountryJSON.invalidValue(CountryJSON.l("Date"), val, key, parent);
                }
                return d;
            }
            function transformObject(props, additional, val) {
                if (val === null || typeof val !== "object" || Array.isArray(val)) {
                    return CountryJSON.invalidValue(CountryJSON.l(ref || "object"), val, key, parent);
                }
                const result = {};
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
            if (typ === "any")
                return val;
            if (typ === null) {
                if (val === null)
                    return val;
                return CountryJSON.invalidValue(typ, val, key, parent);
            }
            if (typ === false)
                return CountryJSON.invalidValue(typ, val, key, parent);
            let ref = undefined;
            while (typeof typ === "object" && typ.ref !== undefined) {
                ref = typ.ref;
                typ = CountryJSON.typeMap[typ.ref];
            }
            if (Array.isArray(typ))
                return transformEnum(typ, val);
            if (typeof typ === "object") {
                return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
                    : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                        : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                            : CountryJSON.invalidValue(typ, val, key, parent);
            }
            if (typ === Date && typeof val !== "number")
                return transformDate(val);
            return transformPrimitive(typ, val);
        }
        static cast(val, typ) {
            return CountryJSON.transform(val, typ, CountryJSON.jsonToJSProps);
        }
        static uncast(val, typ) {
            return CountryJSON.transform(val, typ, CountryJSON.jsToJSONProps);
        }
        static l(typ) {
            return { literal: typ };
        }
        static a(typ) {
            return { arrayItems: typ };
        }
        static u(...typs) {
            return { unionMembers: typs };
        }
        static o(props, additional) {
            return { props, additional };
        }
        static m(additional) {
            return { props: [], additional };
        }
        static r(name) {
            return { ref: name };
        }
        static typeMap = {
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
})(CountryManager = exports.CountryManager || (exports.CountryManager = {}));
