import { NextApiRequest, NextApiResponse } from "next";

import { addMaterial, getMaterials } from "fetches/material";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch(req.method) {
            case "GET" : 
                const data = await getMaterials();
                res.status(200).json(data);
                break;
            case "POST": 
                const record = await addMaterial(req.body);
                res.status(200).json(record);
                break;
            default:
                break;
        }
        
    } catch(e) {
        res.status(e.statusCode).json( { statusCode: e.statusCode, message: e.message});
    }
}