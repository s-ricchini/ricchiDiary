import { Entry,NewEntry } from "@/types/types";
import pool from "@/db/connection";
import { RowDataPacket } from "mysql2";
import { ResultSetHeader } from "mysql2";

export async function getAllEntrys(userId: string, parentId: string): Promise<Entry[]> {
    const query = `
        SELECT
            BIN_TO_UUID(id) AS id,
            title,
            content,
            created_at
        FROM entries
        WHERE parent_id = UUID_TO_BIN(?) AND user_id = ?
        ORDER BY created_at DESC
    `
    try {
        const [rows] = await pool.query<(RowDataPacket & Entry)[]>(query, [parentId, userId])
        return rows
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function createEntry(userId: string, newEntry: NewEntry): Promise<boolean> {
    const { parent_id, title, content } = newEntry
    try {
        const [result] = await pool.query<ResultSetHeader>(
            "INSERT INTO entries (user_id, parent_id, title, content) VALUES (?, UUID_TO_BIN(?), ?, ?)",
            [userId, parent_id, title, content]
        )

        if (result.affectedRows !== 1) {
            throw new Error("insertion fail")
        }

        return true

    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function deleteEntry(userId: string, id: string) {
    try {
        const [result] = await pool.query<ResultSetHeader>(
            "DELETE FROM entries WHERE id = UUID_TO_BIN(?) AND user_id = ?",
            [id, userId]
        )

        if (result.affectedRows !== 1) {
            throw new Error("Error al encontrar el entrie con esa id")
        }

    } catch (error) {
        console.error(error)
        throw error
    }
}