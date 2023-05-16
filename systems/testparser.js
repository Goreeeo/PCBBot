"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestParser = void 0;
class TestParser {
    static parseDozen(uri) {
        if (!uri.searchParams.get("score")) {
            return null;
        }
        const scores = uri.searchParams.get("score")?.split(",");
        const returnable = scores.map((v, i, a) => Number.parseFloat(v));
        return returnable;
    }
    static parseSapply(uri) {
        if (uri.searchParams.get("right") == null || uri.searchParams.get("auth") == null || uri.searchParams.get("prog") == null) {
            return null;
        }
        const returnable = [];
        returnable.push(Number.parseFloat(uri.searchParams.get("right")));
        returnable.push(Number.parseFloat(uri.searchParams.get("auth")));
        returnable.push(Number.parseFloat(uri.searchParams.get("prog")));
        return returnable;
    }
    static parseEcon(uri) {
        if (uri.searchParams.get("equi") == null || uri.searchParams.get("hori") == null || uri.searchParams.get("dema") == null || uri.searchParams.get("cent") == null || uri.searchParams.get("auto") == null || uri.searchParams.get("comm") == null || uri.searchParams.get("birt") == null || uri.searchParams.get("unio") == null) {
            return null;
        }
        const returnable = [];
        returnable.push(Number.parseFloat(uri.searchParams.get("equi")));
        returnable.push(Number.parseFloat(uri.searchParams.get("hori")));
        returnable.push(Number.parseFloat(uri.searchParams.get("dema")));
        returnable.push(Number.parseFloat(uri.searchParams.get("cent")));
        returnable.push(Number.parseFloat(uri.searchParams.get("auto")));
        returnable.push(Number.parseFloat(uri.searchParams.get("comm")));
        returnable.push(Number.parseFloat(uri.searchParams.get("birt")));
        returnable.push(Number.parseFloat(uri.searchParams.get("unio")));
        return returnable;
    }
    static parseEight(uri) {
        if (uri.searchParams.get("e") == null || uri.searchParams.get("d") == null || uri.searchParams.get("g") == null || uri.searchParams.get("s") == null) {
            return null;
        }
        const returnable = [];
        returnable.push(Number.parseFloat(uri.searchParams.get("e")));
        returnable.push(Number.parseFloat(uri.searchParams.get("d")));
        returnable.push(Number.parseFloat(uri.searchParams.get("g")));
        returnable.push(Number.parseFloat(uri.searchParams.get("s")));
        return returnable;
    }
    static parseCompass(uri) {
        if (uri.searchParams.get("ec") == null || uri.searchParams.get("soc") == null) {
            return null;
        }
        const image = `https://www.politicalcompass.org/chart?ec=${uri.searchParams.get("ec")}&soc=${uri.searchParams.get("soc")}`;
        const returnable = [];
        returnable.push(image);
        returnable.push(Number.parseFloat(uri.searchParams.get("ec")));
        returnable.push(Number.parseFloat(uri.searchParams.get("soc")));
        return returnable;
    }
    static parseCultural(uri) {
        if (uri.searchParams.get("v1") == null || uri.searchParams.get("v3") == null || uri.searchParams.get("v5") == null || uri.searchParams.get("v7") == null || uri.searchParams.get("v9") == null || uri.searchParams.get("v11") == null || uri.searchParams.get("v13") == null || uri.searchParams.get("v15") == null || uri.searchParams.get("v17") == null || uri.searchParams.get("v19") == null || uri.searchParams.get("v21") == null || uri.searchParams.get("v23") == null) {
            return null;
        }
        const returnable = [];
        returnable.push(Number.parseFloat(uri.searchParams.get("v1")));
        returnable.push(Number.parseFloat(uri.searchParams.get("v3")));
        returnable.push(Number.parseFloat(uri.searchParams.get("v5")));
        returnable.push(Number.parseFloat(uri.searchParams.get("v7")));
        returnable.push(Number.parseFloat(uri.searchParams.get("v9")));
        returnable.push(Number.parseFloat(uri.searchParams.get("v11")));
        returnable.push(Number.parseFloat(uri.searchParams.get("v13")));
        returnable.push(Number.parseFloat(uri.searchParams.get("v15")));
        returnable.push(Number.parseFloat(uri.searchParams.get("v17")));
        returnable.push(Number.parseFloat(uri.searchParams.get("v19")));
        returnable.push(Number.parseFloat(uri.searchParams.get("v21")));
        returnable.push(Number.parseFloat(uri.searchParams.get("v23")));
        return returnable;
    }
}
exports.TestParser = TestParser;
