import { delMaterial, putMaterial } from "fetches/material";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
    const { query: {id}} = req;
    try {
        switch(req.method) {
            case "PUT" : 
                const data = await putMaterial(+id, req.body);
                res.status(200).json(data);
                break;
            case "DELETE": 
                const record = await delMaterial(+id);
                res.status(200).json(record);
                break;
            default:
                break;
        }
        
    } catch(e) {
        res.status(e.statusCode).json( { statusCode: e.statusCode, message: e.message});
    }
}