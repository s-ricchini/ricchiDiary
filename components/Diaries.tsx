import { getDiaries,getDiariesByCategory } from "@/queries/diaries"
import DiaryCard from "./DiaryCard"
import { getUserId } from "@/utils/userId"
import { redirect } from "next/navigation"


export default async function Diaries( {categoryId = ''} : {categoryId?:string}){

    
    let diaries = []
    let userId = ''

    try {
        userId = await getUserId()
    } catch (e) {
        redirect('/login')
    }


    if(categoryId !== ''){
        diaries = await getDiariesByCategory(userId,categoryId)
    } else{
        diaries = await getDiaries(userId)
    }

    return(
        <div className="w-full flex flex-col gap-3">
            {diaries.length > 0 ? diaries.map(diary => <DiaryCard key={diary.id} diary={diary}></DiaryCard>) : "No hay diarios todavia"}
        </div>
    )
}