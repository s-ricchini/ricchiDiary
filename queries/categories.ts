import { Category } from "@/types/types";
import pool from "@/db/connection";
import { RowDataPacket } from "mysql2";

export async function getCategories() : Promise<Category[]> {
    try {        
        const [rows] = await pool.query<(RowDataPacket & Category)[]>("SELECT BIN_TO_UUID(id) as id, name,color,created_at from categories;")
        return rows

    } catch (error) {
        console.error(error)
        return []
    }

}

export async function searchCategoryById(id:string){
    try {    
        const [rows] = await pool.query<(RowDataPacket & Category)[]>("SELECT BIN_TO_UUID(id) as id, name,color from categories WHERE id = UUID_TO_BIN(?);",[id])
        return rows[0]
    
    } catch (error) {
        console.error(error)
        return null
    }    

}