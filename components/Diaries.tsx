import { getDiaries,getDiariesByCategory } from "@/queries/diaries"
import DiaryCard from "./DiaryCard"

export default async function Diaries( {userId,categoryId = ''} : {userId: string,categoryId?:string}){
    
    let diaries = []
    
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