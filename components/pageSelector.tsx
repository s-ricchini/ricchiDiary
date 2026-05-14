'use client'

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/16/solid"
import { useRouter } from "next/navigation"

export default function PageSelector({actual,url,maxPages} : {actual : number,url:string,maxPages:number}){
    
    const router = useRouter()

    function handleChange(newPage:number) {
        
        if(newPage >= 1){
            router.push(`${url}${newPage}`)
        }
    }

    return(
        <div className=" flex gap-2" >
            {actual > 1 && <ChevronLeftIcon className=" h-7 w-7 cursor-pointer" onClick={() => {handleChange(actual - 1)}}></ChevronLeftIcon>}
            <p>{actual}</p>
            {actual < maxPages && <ChevronRightIcon className=" h-7 w-7  cursor-pointer" onClick={() => {handleChange(actual + 1)}}></ChevronRightIcon> }
        </div>

    )


}