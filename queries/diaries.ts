import pool from "@/db/connection";
import { Diary } from "@/types/types";
import { RowDataPacket } from "mysql2";


export async function getDiaries(): Promise<Diary[]> {
    const query = `
            SELECT 
                BIN_TO_UUID(d.id)   AS id,
                d.title,
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
