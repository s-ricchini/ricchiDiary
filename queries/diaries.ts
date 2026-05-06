import pool from "@/db/connection";
import { Diary, NewDiary } from "@/types/types";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function getDiaries(): Promise<Diary[]> {
    const query = `
            SELECT 
                BIN_TO_UUID(d.id)   AS id,
                d.title,
                d.isFav,
                c.name              AS category_name,
                c.color             AS category_color,
                d.created_at
            FROM diaries d
            LEFT JOIN categories c ON c.id = d.category
            `;
    try {
        const [rows] = await pool.query<(RowDataPacket & Diary)[]>(query)
        return rows
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getDiariesByCategory(categoryId:string): Promise<Diary[]> {
    const query = `
            SELECT 
                BIN_TO_UUID(d.id)   AS id,
                d.title,
                d.isFav,
                c.name              AS category_name,
                c.color             AS category_color,
                d.created_at
            FROM diaries d
            LEFT JOIN categories c ON c.id = d.category WHERE d.category = UUID_TO_BIN(?) 
            `;
    try {
        const [rows] = await pool.query<(RowDataPacket & Diary)[]>(query,[categoryId])
        return rows
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function createDiary(newDiary:NewDiary) {
    
    try {
        const [result] = await pool.query<ResultSetHeader>("INSERT INTO diaries (title,category) VALUES (?,UUID_TO_BIN(?))",[newDiary.title,newDiary.category_id]) 

        if(result.affectedRows !== 1){
            throw new Error("Can't create the diary")
        } 

    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function toggleFav(id:string,newState:boolean) {
        
        try {   
            const [result] = await pool.query<ResultSetHeader>(
                "UPDATE diaries SET isFav = ? WHERE id = UUID_TO_BIN(?)",
                [newState, id]
            )

            if (result.affectedRows !== 1) {
                throw new Error("Id not found")
            }            

        } catch (error) {
            console.error(error)
            throw error
        }    


}
