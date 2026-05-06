import { Entry,NewEntry } from "@/types/types";
import pool from "@/db/connection";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";

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

export async function createEntry(newEntry: NewEntry) : Promise<boolean> {
    const {parent_id,title,content} = newEntry
    try {
        const [result] = await pool.query<ResultSetHeader>("INSERT INTO entries (parent_id,title,content) VALUES (UUID_TO_BIN(?),?,?)",[parent_id,title,content])

        if(result.affectedRows !== 1){
            throw new Error("insertion fail")
        }

        return true
   
    } catch (error) {
        console.log(error)
        throw error
    }

}

export async function deleteEntry(id:string) {
    try {
        const [result] = await pool.query<ResultSetHeader>("DELETE FROM entries WHERE id = UUID_TO_BIN(?)",[id])
        
        if (result.affectedRows !== 1) {
            throw new Error("Error al encontrar el entrie con esa id")
        }

        
    } catch (error) {
        console.error(error)
        throw error

    }


}