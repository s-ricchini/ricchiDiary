import { Diary } from "@/types/types"
import Link from "next/link"
import { getContrastColor } from "@/utils/utils"
import FavButton from "./Fav"

export default async function DiaryCard({ diary }: { diary: Diary }){
    
    let catColor = diary.category_color
    
    if(!catColor){
        catColor = '#000000'
    }

    let textColor = ''

    if(diary.category_color){
        textColor = getContrastColor(diary.category_color!)
    } else{
        textColor = 'white'
    }

    //dependiendo si tiene categoria o no cambio url
    let url = `/dashboard/diary?id=${diary.id}&name${diary.title}`

    if(diary.category_name){
        url = url + `&category=${diary.category_name}&color=${diary.category_color}`    
    }

    return(
            <div className="flex w-full hover:shadow justify-between items-center p-5 bg-white gap-30 border border-gray-200 rounded">
                <Link href={url}>
                    <p className="text-xl">{diary.title}</p>
                </Link>
                <div className="flex gap-3">
                    <p style={{ backgroundColor: catColor, color:textColor}}  className="px-4 py-2 rounded">{diary.category_name ? diary.category_name : 'No category'}</p>
                    <FavButton id={diary.id} initialState={diary.isFav}></FavButton>
                    
                </div>
            </div>
        
    )

}