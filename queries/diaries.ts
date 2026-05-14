import pool from "@/db/connection";
import { Diary, NewDiary } from "@/types/types";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { off } from "process";

export async function getDiaries(userId: string,offset:number,limit:number): Promise<Diary[]> {
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
        WHERE d.user_id = ?
        LIMIT ? OFFSET ?
    `;
    try {
        const [rows] = await pool.query<(RowDataPacket & Diary)[]>(query, [userId,offset,limit])
        return rows
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function getDiariesByCategory(userId: string, categoryId: string,limit:number,offset:number): Promise<Diary[]> {
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
        WHERE d.user_id = ? AND d.category = UUID_TO_BIN(?)
        LIMIT ? OFFSET ?
    `;
    try {
        const [rows] = await pool.query<(RowDataPacket & Diary)[]>(query, [userId, categoryId,limit,offset])
        return rows
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function createDiary(userId: string, newDiary: NewDiary) {
    try {
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO diaries (user_id, title, category) VALUES (?, ?, UUID_TO_BIN(?))",
            [userId, newDiary.title, newDiary.category_id]
        )

        if (result.affectedRows !== 1) {
            throw new Error("Can't create the diary")
        }

    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function toggleFav(userId: string, id: string, newState: boolean) {
    try {
        const [result] = await pool.query<ResultSetHeader>(
            "UPDATE diaries SET isFav = ? WHERE id = UUID_TO_BIN(?) AND user_id = ?",
            [newState, id, userId]
        )

        if (result.affectedRows !== 1) {
            throw new Error("Id not found")
        }

    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function deleteDiary(userId:string,id:string) {
    try {
        const [result] = await pool.query<ResultSetHeader>(
            "DELETE from diaries WHERE user_id = ? and id = UUID_TO_BIN(?)",[userId,id]
        )

        if (result.affectedRows !== 1){
            throw new Error("Diary not found")
        }

    } catch (error) {
        console.error(error)
        throw error
    }


}

export async function getNumberOfDiaries(userId:string,category:string = "") {

    try {
        let query = `SELECT COUNT(*) AS total FROM diaries WHERE user_id = ?`
        const params: string[] = [userId]

        if (category !== "") {
            query += ` AND category = UUID_TO_BIN(?)`
            params.push(category)
        }

        const [rows] = await pool.query<(RowDataPacket & { total: number })[]>(query, params)
        return rows[0].total

    } catch (error) {
        console.error(error)
        return 0
    }
}
