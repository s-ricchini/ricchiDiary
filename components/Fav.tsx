'use client'

import { StarIcon as StarOutline } from "@heroicons/react/24/outline"
import { StarIcon as StarSolid } from "@heroicons/react/16/solid"
import { useState } from "react"
import { toast } from "sonner"

import { toggleFavAction } from "@/actions/diaryForm"

export default function FavButton({ id,initialState }: { id:string ,initialState: boolean }) {
    const [isFav, setIsFav] = useState(initialState)

    async function handleSwitch(){
        const newState = !isFav

        //actualizacion optimista
        setIsFav(newState)       
        const result = await toggleFavAction(id, newState)

    if (!result.success) {
        setIsFav(!newState) 
        toast(result.error)
    }

    }

    return (
        <button onClick={handleSwitch} className="cursor-pointer">
            {isFav 
                ? <StarSolid className="w-6 h-6 text-yellow-400" />
                : <StarOutline className="w-6 h-6 text-gray-400 hover:text-yellow-400" />
            }
        </button>
    )
}

