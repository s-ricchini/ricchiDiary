import { Diary } from "@/types/types"
import Link from "next/link"
import { getContrastColor } from "@/utils/utils"


export default async function DiaryCard({ diary }: { diary: Diary }){
    
    let textColor = ''

    if(diary.category_color){
        textColor = getContrastColor(diary.category_color!)
    }

    //dependiendo si tiene categoria o no cambio url
    let url = `/dashboard/diary?id=${diary.id}&name${diary.title}`

    if(diary.category_name){
        url = url + `&category=${diary.category_name}&color=${diary.category_color}`
    }

    return(
        <Link href={url}>
            <div className="flex w-full hover:cursor-pointer hover:shadow justify-between items-center p-5 bg-white gap-30 border border-gray-200 rounded">
                <p className="text-xl">{diary.title}</p>
                <p style={{ backgroundColor: diary.category_color!, color:textColor}}  className="px-4 py-2 rounded">{diary.category_name}</p>
            </div>
        </Link>
    )

}