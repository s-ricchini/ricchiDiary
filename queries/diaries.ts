import pool from "@/db/connection";
import { Diary, NewDiary } from "@/types/types";
import { ResultSetHeader, RowDataPacket } from "mysql2";


type GetDiariesOptions = {
    categoryId?: string;
    search?: string;
    onlyFavorites?: boolean;
    sort?: "newest" | "oldest";
    limit: number;
    offset: number;
};


export async function getDiaries(userId: string,options: GetDiariesOptions): Promise<Diary[]> {
    const {
        categoryId,
        search,
        onlyFavorites,
        sort = "newest",
        limit,
        offset
    } = options;

    let query = `
        SELECT
            BIN_TO_UUID(d.id) AS id,
            d.title,
            d.isFav,
            c.name AS category_name,
            c.color AS category_color,
            d.created_at
        FROM diaries d
        LEFT JOIN categories c ON c.id = d.category
        WHERE d.user_id = ?
    `;

    const params: any[] = [userId];

    if (categoryId) {
        query += ` AND d.category = UUID_TO_BIN(?)`;
        params.push(categoryId);
    }

    if (onlyFavorites) {
        query += ` AND d.isFav = TRUE`;
    }

    if (search) {
        query += ` AND d.title LIKE ?`;
        params.push(`%${search}%`);
    }

    query += ` ORDER BY d.created_at`;

    if (sort === "oldest") {
        query += ` ASC`;
    } else {
        query += ` DESC`;
    }

    query += ` LIMIT ? OFFSET ?`;

    params.push(limit);
    params.push(offset);

    try {
        const [rows] = await pool.query<(RowDataPacket & Diary)[]>(query, params);
        return rows;
    } catch (error) {
        console.error(error);
        return [];
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
