import { Entry } from "@/types/types";
import pool from "@/db/connection";
import { RowDataPacket } from "mysql2";


export async function getAllEntrys(parentId:string) : Promise<Entry[]> {
    
    const query = `SELECT
                    BIN_TO_UUID(id) AS id,
                    title,
                    content,
                    created_at
                    FROM entries WHERE parent_id = UUID_TO_BIN(?)
                    ORDER BY created_at DESC;`
    
    try {
        const [rows] = await pool.query<(RowDataPacket & Entry)[]>(query,[parentId])
        return rows


    } catch (error) {
        console.error(error)
        return []
    }


}