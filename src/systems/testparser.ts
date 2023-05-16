import { URL } from "url";

export class TestParser {
    static parseDozen(uri: URL): number[] | any {
        if (!uri.searchParams.get("score")) {
            return null;
        }

        const scores: string[] = uri.searchParams.get("score")?.split(",") as string[];
        const returnable: number[] = scores.map<number>((v, i, a) => Number.parseFloat(v));

        return returnable;
    }

    static parseSapply(uri: URL): number[] | any {
        if (uri.searchParams.get("right") == null || uri.searchParams.get("auth") == null || uri.searchParams.get("prog") == null) {
            return null;
        }

        const returnable: number[] = [];
        returnable.push(Number.parseFloat(uri.searchParams.get("right") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("auth") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("prog") as string));

        return returnable;
    }

    static parseEcon(uri: URL): number[] | any {
        if (uri.searchParams.get("equi") == null || uri.searchParams.get("hori") == null || uri.searchParams.get("dema") == null || uri.searchParams.get("cent") == null || uri.searchParams.get("auto") == null || uri.searchParams.get("comm") == null || uri.searchParams.get("birt") == null || uri.searchParams.get("unio") == null) {
            return null;
        }

        const returnable: number[] = [];
        returnable.push(Number.parseFloat(uri.searchParams.get("equi") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("hori") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("dema") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("cent") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("auto") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("comm") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("birt") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("unio") as string));

        return returnable;
    }

    static parseEight(uri: URL): number[] | any {
        if (uri.searchParams.get("e") == null || uri.searchParams.get("d") == null || uri.searchParams.get("g") == null || uri.searchParams.get("s") == null) {
            return null;
        }

        const returnable: number[] = [];
        returnable.push(Number.parseFloat(uri.searchParams.get("e") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("d") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("g") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("s") as string));

        return returnable;
    }

    static parseCompass(uri: URL): any[] | any {
        if (uri.searchParams.get("ec") == null || uri.searchParams.get("soc") == null) {
            return null;
        }

        const image: String = `https://www.politicalcompass.org/chart?ec=${uri.searchParams.get("ec") as String}&soc=${uri.searchParams.get("soc") as String}`;

        const returnable: any[] = [];
        returnable.push(image);
        returnable.push(Number.parseFloat(uri.searchParams.get("ec") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("soc") as string));

        return returnable;
    }

    static parseCultural(uri: URL): number[] | any {
        if (uri.searchParams.get("v1") == null || uri.searchParams.get("v3") == null || uri.searchParams.get("v5") == null || uri.searchParams.get("v7") == null || uri.searchParams.get("v9") == null || uri.searchParams.get("v11") == null || uri.searchParams.get("v13") == null || uri.searchParams.get("v15") == null || uri.searchParams.get("v17") == null || uri.searchParams.get("v19") == null || uri.searchParams.get("v21") == null || uri.searchParams.get("v23") == null) {
            return null;
        }

        const returnable: number[] = [];
        returnable.push(Number.parseFloat(uri.searchParams.get("v1") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("v3") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("v5") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("v7") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("v9") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("v11") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("v13") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("v15") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("v17") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("v19") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("v21") as string));
        returnable.push(Number.parseFloat(uri.searchParams.get("v23") as string));

        return returnable;
    }
}