"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Localization = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
var Localization;
(function (Localization) {
    let Locale;
    (function (Locale) {
        Locale[Locale["English"] = 0] = "English";
        Locale[Locale["German"] = 1] = "German";
    })(Locale = Localization.Locale || (Localization.Locale = {}));
    class LocSystem {
        static entries = {};
        static init() {
            const content = fs.readFileSync("tables/localization.json").toString();
            this.entries = LocJSON.toLocalization(content);
        }
        static getRaw(key) {
            if (this.entries[key]) {
                return this.entries[key];
            }
            console.warn(`Key ${key} not found!`);
            return false;
        }
        static get(key, locale) {
            if (this.entries[key]) {
                return this.localize(this.entries[key], this.getLocale(locale));
            }
            console.warn(`Key ${key} not found!`);
            return "";
        }
        static localize(entry, locale) {
            switch (locale) {
                case Locale.German:
                    return entry.de;
                default:
                    return entry.en;
            }
        }
        static getLocale(discordLocale) {
            switch (discordLocale) {
                case "de":
                    return Locale.German;
                default:
                    return Locale.English;
            }
        }
    }
    Localization.LocSystem = LocSystem;
    class LocJSON {
        static toLocalization(json) {
            return LocJSON.cast(JSON.parse(json), LocJSON.m(LocJSON.r("LocEntry")));
        }
        static localizationToJson(value) {
            return JSON.stringify(LocJSON.uncast(value, LocJSON.m(LocJSON.r("LocEntry"))), null, 2);
        }
        static invalidValue(typ, val, key, parent = '') {
            const prettyTyp = LocJSON.prettyTypeName(typ);
            const parentText = parent ? ` on ${parent}` : '';
            const keyText = key ? ` for key "${key}"` : '';
            throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
        }
        static prettyTypeName(typ) {
            if (Array.isArray(typ)) {
                if (typ.length === 2 && typ[0] === undefined) {
                    return `an optional ${LocJSON.prettyTypeName(typ[1])}`;
                }
                else {
                    return `one of [${typ.map(a => { return LocJSON.prettyTypeName(a); }).join(", ")}]`;
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
                return LocJSON.invalidValue(typ, val, key, parent);
            }
            function transformUnion(typs, val) {
                const l = typs.length;
                for (let i = 0; i < l; i++) {
                    const typ = typs[i];
                    try {
                        return LocJSON.transform(val, typ, getProps);
                    }
                    catch (_) { }
                }
                return LocJSON.invalidValue(typs, val, key, parent);
            }
            function transformEnum(cases, val) {
                if (cases.indexOf(val) !== -1)
                    return val;
                return LocJSON.invalidValue(cases.map(a => { return LocJSON.l(a); }), val, key, parent);
            }
            function transformArray(typ, val) {
                if (!Array.isArray(val))
                    return LocJSON.invalidValue(LocJSON.l("array"), val, key, parent);
                return val.map(el => LocJSON.transform(el, typ, getProps));
            }
            function transformDate(val) {
                if (val === null) {
                    return null;
                }
                const d = new Date(val);
                if (isNaN(d.valueOf())) {
                    return LocJSON.invalidValue(LocJSON.l("Date"), val, key, parent);
                }
                return d;
            }
            function transformObject(props, additional, val) {
                if (val === null || typeof val !== "object" || Array.isArray(val)) {
                    return LocJSON.invalidValue(LocJSON.l(ref || "object"), val, key, parent);
                }
                const result = {};
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
            if (typ === "any")
                return val;
            if (typ === null) {
                if (val === null)
                    return val;
                return LocJSON.invalidValue(typ, val, key, parent);
            }
            if (typ === false)
                return LocJSON.invalidValue(typ, val, key, parent);
            let ref = undefined;
            while (typeof typ === "object" && typ.ref !== undefined) {
                ref = typ.ref;
                typ = LocJSON.typeMap[typ.ref];
            }
            if (Array.isArray(typ))
                return transformEnum(typ, val);
            if (typeof typ === "object") {
                return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
                    : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                        : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                            : LocJSON.invalidValue(typ, val, key, parent);
            }
            if (typ === Date && typeof val !== "number")
                return transformDate(val);
            return transformPrimitive(typ, val);
        }
        static cast(val, typ) {
            return LocJSON.transform(val, typ, LocJSON.jsonToJSProps);
        }
        static uncast(val, typ) {
            return LocJSON.transform(val, typ, LocJSON.jsToJSONProps);
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
            "LocEntry": LocJSON.o([
                { json: "en", js: "en", typ: "" },
                { json: "de", js: "de", typ: "" },
            ], false),
        };
    }
})(Localization = exports.Localization || (exports.Localization = {}));
