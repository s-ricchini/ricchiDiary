import { Category,hex } from "@/types/types";
import pool from "@/db/connection";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function getCategories(userId:string) : Promise<Category[]> {
    try {        
        const [rows] = await pool.query<(RowDataPacket & Category)[]>("SELECT BIN_TO_UUID(id) as id, name,color,created_at from categories WHERE user_id = ?;",[userId])
        return rows

    } catch (error) {
        console.error(error)
        return []
    }

}

export async function searchCategoryById(userId:string,id:string){
    try {    
        const [rows] = await pool.query<(RowDataPacket & Category)[]>("SELECT BIN_TO_UUID(id) as id, name,color from categories WHERE id = UUID_TO_BIN(?) and user_id = ?;",[id,userId])
        return rows[0]
    
    } catch (error) {
        console.error(error)
        return null
    }    

}

export async function newCategory(userId:string,name:string,color:hex) {
    try {
        const [result] = await pool.query<ResultSetHeader>("INSERT INTO categories (user_id,name,color) VALUES (?,?,?)",[userId,name,color])
        
        if(result.affectedRows !== 1) {
            throw new Error("Error creando categoria")           
        }

    } catch (error) {
        console.error(error)
        throw error
    }

}