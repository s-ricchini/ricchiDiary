import { getDiaries } from "@/queries/diaries"
import DiaryCard from "./DiaryCard"
import { getUserId } from "@/utils/userId"
import { getNumberOfDiaries } from "@/queries/diaries"
import PageSelector from "./pageSelector"

export default async function Diaries( {categoryId = '',page,url} : {categoryId?:string, page:number,url:string}){

    const userId = await getUserId()
    let diaries = []

    const limit = 4
    //calculo el offset  si pagina = 1 offset = 0
    const offset = (page * limit) - (limit)
    const totalRecords = await getNumberOfDiaries(userId,categoryId)
    const maxPages = Math.ceil(totalRecords / limit)

    diaries = await getDiaries(userId,categoryId,limit,offset)

    return(
        <div className="flex flex-col justify-between h-full">
            <div className="w-full flex flex-col gap-3">
                {<h1>PAGINA: {page}</h1>}
                {diaries.length > 0 ? diaries.map(diary => <DiaryCard key={diary.id} diary={diary}></DiaryCard>) : "No hay diarios todavia"}
            </div>
            <div className="mb-10 mx-auto">
                <PageSelector actual={page} url={url} maxPages={maxPages}></PageSelector>
            </div>
            
        </div>
    )
}