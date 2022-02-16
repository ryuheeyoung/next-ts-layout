import { NextApiRequest, NextApiResponse } from "next";

import { getMaterials } from "fetches/material";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await getMaterials();
        res.status(200).json(data);
    } catch(e) {
        res.status(500).json( { statusCode: 500, message: e.message});
    }
}